---
title: Implementing Real-time Features with GraphQL Subscriptions
excerpt: A deep dive into building real-time applications using GraphQL subscriptions, WebSockets, and modern frontend frameworks.
date: 2024-10-10
category: Frontend Development
featured: false
author: Glorious Satria
tags: [GraphQL, WebSockets, React, Real-time, Subscriptions]
image: /images/blog/graphql-realtime.jpg
---

# Implementing Real-time Features with GraphQL Subscriptions

Real-time features have become essential in modern web applications. From live chat systems to real-time dashboards, users expect instant updates without manual refreshes. During my work at Bank Rakyat Indonesia, I implemented real-time features using GraphQL subscriptions that served thousands of concurrent users.

## Why GraphQL Subscriptions?

Traditional approaches like **REST polling** or **Server-Sent Events** have limitations:

### REST Polling Problems:
- **Inefficient**: Constant requests even when no updates
- **Delayed updates**: Polling interval creates latency
- **Server load**: Unnecessary requests burden the server

### GraphQL Subscriptions Benefits:
- **Efficient**: Updates only when data changes
- **Flexible**: Subscribe to specific data you need
- **Unified API**: Same endpoint for queries, mutations, and subscriptions

## Architecture Overview

Here's how I structured the real-time system:

```javascript
// Server-side subscription resolver
const subscriptions = {
  messageAdded: {
    subscribe: () => pubsub.asyncIterator(['MESSAGE_ADDED']),
  },
  userStatusChanged: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(['USER_STATUS_CHANGED']),
      (payload, variables) => {
        return payload.userStatusChanged.userId === variables.userId;
      }
    ),
  },
};
```

## Implementation Details

### 1. Server Setup with Apollo Server

```javascript
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, connection }) => {
    if (connection) {
      // WebSocket connection context
      return connection.context;
    }
    // HTTP request context
    return { user: req.user };
  },
});

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);
```

### 2. TypeDefs for Subscriptions

```graphql
type Subscription {
  messageAdded(chatId: ID!): Message
  orderStatusUpdated(orderId: ID!): Order
  notificationReceived(userId: ID!): Notification
}

type Message {
  id: ID!
  content: String!
  author: User!
  timestamp: DateTime!
  chatId: ID!
}
```

### 3. Frontend Implementation with React

```typescript
import { useSubscription } from '@apollo/client';
import { gql } from '@apollo/client';

const MESSAGE_SUBSCRIPTION = gql`
  subscription MessageAdded($chatId: ID!) {
    messageAdded(chatId: $chatId) {
      id
      content
      author {
        id
        name
        avatar
      }
      timestamp
    }
  }
`;

function ChatComponent({ chatId }: { chatId: string }) {
  const { data, loading, error } = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { chatId },
  });

  useEffect(() => {
    if (data?.messageAdded) {
      // Handle new message
      setMessages(prev => [...prev, data.messageAdded]);
      // Play notification sound
      playNotificationSound();
    }
  }, [data]);

  return <div>{/* Chat UI */}</div>;
}
```

## Advanced Patterns

### 1. Subscription Filtering

Sometimes you need to filter subscriptions based on user permissions:

```javascript
const resolvers = {
  Subscription: {
    orderUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['ORDER_UPDATED']),
        (payload, variables, context) => {
          // Only send updates for orders user can access
          return payload.orderUpdated.userId === context.user.id;
        }
      ),
    },
  },
};
```

### 2. Connection Management

```javascript
class SubscriptionManager {
  constructor() {
    this.connections = new Map();
  }

  addConnection(userId, connection) {
    if (!this.connections.has(userId)) {
      this.connections.set(userId, new Set());
    }
    this.connections.get(userId).add(connection);
  }

  removeConnection(userId, connection) {
    const userConnections = this.connections.get(userId);
    if (userConnections) {
      userConnections.delete(connection);
      if (userConnections.size === 0) {
        this.connections.delete(userId);
      }
    }
  }

  broadcastToUser(userId, data) {
    const connections = this.connections.get(userId);
    if (connections) {
      connections.forEach(connection => {
        connection.send(JSON.stringify(data));
      });
    }
  }
}
```

## Performance Optimization

### 1. Connection Pooling

```javascript
// Limit concurrent connections per user
const MAX_CONNECTIONS_PER_USER = 5;

const connectionLimiter = {
  onConnect: (connectionParams, webSocket, context) => {
    const userId = getUserFromToken(connectionParams.authorization);
    const userConnections = getUserConnections(userId);
    
    if (userConnections.length >= MAX_CONNECTIONS_PER_USER) {
      throw new Error('Too many connections');
    }
    
    return { userId };
  },
};
```

### 2. Batching Updates

```javascript
class UpdateBatcher {
  constructor(delay = 100) {
    this.delay = delay;
    this.pendingUpdates = new Map();
    this.timeouts = new Map();
  }

  scheduleUpdate(key, data) {
    this.pendingUpdates.set(key, data);
    
    if (this.timeouts.has(key)) {
      clearTimeout(this.timeouts.get(key));
    }
    
    const timeout = setTimeout(() => {
      this.flushUpdates(key);
    }, this.delay);
    
    this.timeouts.set(key, timeout);
  }

  flushUpdates(key) {
    const data = this.pendingUpdates.get(key);
    if (data) {
      pubsub.publish(key, data);
      this.pendingUpdates.delete(key);
      this.timeouts.delete(key);
    }
  }
}
```

## Real-World Use Cases

### 1. Live Dashboard Updates
At BRI, I implemented real-time transaction monitoring:

```javascript
// Publishing transaction updates
const publishTransactionUpdate = async (transaction) => {
  pubsub.publish('TRANSACTION_UPDATED', {
    transactionUpdated: transaction,
  });
};

// Frontend dashboard component
const TransactionDashboard = () => {
  const { data } = useSubscription(TRANSACTION_SUBSCRIPTION);
  
  return (
    <div className="grid grid-cols-3 gap-4">
      <MetricCard 
        title="Total Transactions" 
        value={data?.stats?.total} 
      />
      <MetricCard 
        title="Success Rate" 
        value={data?.stats?.successRate} 
      />
      <MetricCard 
        title="Revenue" 
        value={data?.stats?.revenue} 
      />
    </div>
  );
};
```

### 2. Collaborative Features

```javascript
// Real-time document collaboration
const DocumentEditor = ({ documentId }) => {
  const { data } = useSubscription(DOCUMENT_CHANGES_SUBSCRIPTION, {
    variables: { documentId },
  });

  useEffect(() => {
    if (data?.documentChanged) {
      // Apply operational transforms
      applyChange(data.documentChanged);
    }
  }, [data]);

  const handleTextChange = (change) => {
    // Send change to server
    sendDocumentChange({ documentId, change });
  };

  return <TextEditor onChange={handleTextChange} />;
};
```

## Error Handling and Resilience

### 1. Connection Recovery

```javascript
const useResilientSubscription = (subscription, options) => {
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  
  const subscriptionResult = useSubscription(subscription, {
    ...options,
    onSubscriptionData: (data) => {
      setConnectionStatus('connected');
      options.onSubscriptionData?.(data);
    },
    onSubscriptionComplete: () => {
      setConnectionStatus('disconnected');
      // Attempt reconnection
      setTimeout(() => {
        setConnectionStatus('connecting');
      }, 5000);
    },
  });

  return { ...subscriptionResult, connectionStatus };
};
```

### 2. Graceful Degradation

```javascript
const ChatWithFallback = ({ chatId }) => {
  const { data, error, connectionStatus } = useResilientSubscription(
    MESSAGE_SUBSCRIPTION,
    { variables: { chatId } }
  );

  // Fall back to polling if subscription fails
  const { data: polledData } = useQuery(GET_MESSAGES, {
    variables: { chatId },
    pollInterval: connectionStatus === 'disconnected' ? 5000 : 0,
  });

  const messages = data?.messageAdded ? [data.messageAdded] : polledData?.messages;

  return (
    <div>
      {connectionStatus !== 'connected' && (
        <div className="bg-yellow-100 p-2 text-sm">
          Connection issues detected. Falling back to periodic updates.
        </div>
      )}
      <MessageList messages={messages} />
    </div>
  );
};
```

## Security Considerations

### 1. Authentication
```javascript
const validateSubscription = (params, connection) => {
  const token = params.authorization;
  if (!token) {
    throw new Error('Unauthorized');
  }
  
  const user = verifyToken(token);
  return { user };
};
```

### 2. Rate Limiting
```javascript
const subscriptionRateLimit = new Map();

const checkRateLimit = (userId) => {
  const now = Date.now();
  const userLimit = subscriptionRateLimit.get(userId) || { count: 0, resetTime: now + 60000 };
  
  if (now > userLimit.resetTime) {
    userLimit.count = 0;
    userLimit.resetTime = now + 60000;
  }
  
  if (userLimit.count >= 100) {
    throw new Error('Rate limit exceeded');
  }
  
  userLimit.count++;
  subscriptionRateLimit.set(userId, userLimit);
};
```

## Monitoring and Debugging

### 1. Subscription Metrics
```javascript
const subscriptionMetrics = {
  activeConnections: 0,
  messagesPublished: 0,
  errorsCount: 0,
  
  trackConnection: () => {
    subscriptionMetrics.activeConnections++;
  },
  
  trackDisconnection: () => {
    subscriptionMetrics.activeConnections--;
  },
  
  trackMessage: () => {
    subscriptionMetrics.messagesPublished++;
  },
};
```

### 2. Debug Tools
```javascript
// Development-only subscription logger
if (process.env.NODE_ENV === 'development') {
  pubsub.subscribe('*', (message) => {
    console.log('Subscription message:', message);
  });
}
```

## Conclusion

GraphQL subscriptions provide a powerful way to build real-time features that scale. Key takeaways:

1. **Design for scale**: Use connection pooling and batching
2. **Handle errors gracefully**: Implement reconnection and fallback strategies
3. **Secure your subscriptions**: Validate permissions and implement rate limiting
4. **Monitor performance**: Track connection counts and message throughput
5. **Test thoroughly**: Real-time features are complex to debug in production

Real-time features can dramatically improve user experience when implemented correctly. Start with simple use cases and gradually add complexity as you learn the patterns and challenges specific to your application.