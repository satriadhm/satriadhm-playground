// src/constants/blogData.ts

import { BlogPostData, BlogPost } from "@/types";

// Define types locally to avoid import issues


// Utility functions
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

const blogPostsData: BlogPostData[] = [
  {
    title: 'Building Scalable Microservices with Go and PostgreSQL',
    excerpt: 'Learn how to design and implement microservices architecture that can handle thousands of concurrent users while maintaining data consistency.',
    date: '2024-12-15',
    category: 'Backend Development',
    featured: true,
    author: 'Glorious Satria',
    tags: ['Go', 'PostgreSQL', 'Microservices', 'Architecture', 'Scalability'],
    image: '/images/blog/microservices-go.jpg',
    content: `# Building Scalable Microservices with Go and PostgreSQL

Microservices architecture has revolutionized how we build and deploy applications at scale. During my time at various companies, I've learned that the key to successful microservices isn't just about breaking down monoliths—it's about creating systems that can grow, adapt, and maintain reliability under pressure.

## Why Go for Microservices?

Go has become my language of choice for microservices development for several compelling reasons:

- **Excellent concurrency support**: Go's goroutines make it perfect for handling thousands of concurrent requests
- **Fast compilation and deployment**: Critical for CI/CD pipelines
- **Strong standard library**: Reduces external dependencies
- **Memory efficiency**: Lower resource consumption compared to Java or Node.js

## Database Design Patterns

When working with PostgreSQL in a microservices environment, I've found these patterns essential:

### 1. Database Per Service
Each microservice should own its data. This means:
- Independent scaling
- Technology diversity
- Fault isolation

### 2. Event Sourcing for Consistency
For maintaining data consistency across services:

\`\`\`go
type Event struct {
    ID        uuid.UUID \`json:"id"\`
    Type      string    \`json:"type"\`
    Payload   json.RawMessage \`json:"payload"\`
    Timestamp time.Time \`json:"timestamp"\`
}
\`\`\`

### 3. Connection Pooling
PostgreSQL connection management is crucial:

\`\`\`go
config := &pgxpool.Config{
    MaxConns:        30,
    MinConns:        5,
    MaxConnLifetime: time.Hour,
    MaxConnIdleTime: time.Minute * 30,
}
\`\`\`

## Real-World Implementation

At **Bank Rakyat Indonesia**, I implemented a microservices architecture that served millions of users:

- **5 microservices** handling different business domains
- **100% uptime** during peak transaction periods
- **40% improvement** in query performance through proper indexing

### Service Communication

I used **GraphQL** as the API gateway, which provided:
- Single endpoint for frontend
- Efficient data fetching
- Strong typing system

## Challenges and Solutions

### Challenge 1: Distributed Transactions
**Solution**: Implemented the Saga pattern for long-running transactions

### Challenge 2: Service Discovery
**Solution**: Used Docker Compose with service names for local development, Kubernetes for production

### Challenge 3: Monitoring
**Solution**: Implemented structured logging and distributed tracing

## Performance Optimization Tips

1. **Use prepared statements** for repeated queries
2. **Implement caching layers** with Redis
3. **Monitor database connections** continuously
4. **Use database migrations** for schema changes

## Conclusion

Building scalable microservices requires careful planning, proper tooling, and continuous monitoring. Go and PostgreSQL make an excellent combination for high-performance, reliable systems.

The key is to start simple, measure everything, and scale incrementally based on actual usage patterns rather than anticipated load.`
  },
  {
    title: 'My Journey from Intern to Full-Stack Engineer',
    excerpt: 'Sharing insights and lessons learned during my career progression in software engineering, from internships to leading development teams.',
    date: '2024-11-20',
    category: 'Career',
    featured: true,
    author: 'Glorious Satria',
    tags: ['Career', 'Software Engineering', 'Internship', 'Growth', 'Experience'],
    image: '/images/blog/career-journey.jpg',
    content: `# My Journey from Intern to Full-Stack Engineer

Looking back at my journey in software engineering, I realize how much I've grown since my first internship. Each role taught me valuable lessons that shaped not just my technical skills, but also my approach to problem-solving and teamwork.

## The Beginning: First Internship at Sagara Technology

My journey started in December 2022 when I joined **Sagara Technology** as a Software Engineer Intern. I was nervous, excited, and honestly, a bit overwhelmed.

### What I Learned:
- **Python Django** fundamentals
- **Database design** and migrations
- **Team collaboration** in a professional environment
- **Code reviews** and their importance

The **AteEat** project I worked on taught me that software engineering isn't just about writing code—it's about solving real problems for real people.

## Expanding Horizons: KamarPelajar.id (Remote)

Working remotely with a **Stockholm-based startup** was a game-changer. For six months, I collaborated across time zones and cultures.

### Key Achievements:
- Built a **monolithic architecture** serving 5,000+ users
- Developed **responsive web applications**
- Learned **remote collaboration** best practices
- Gained experience with **international business practices**

**Lesson learned**: Communication is everything in remote work. Over-communication is better than under-communication.

## International Experience: FPT Software, Vietnam

Being selected for FPT's Global Internship Program (2% acceptance rate from 8,000+ applicants) was a pivotal moment.

### Living in Hanoi taught me:
- **Cross-cultural collaboration**
- **Enterprise-level development** practices
- **System scalability** (supporting 25,000+ users)
- **International work standards**

\`\`\`javascript
// The PEAR API architecture I implemented
const express = require('express');
const app = express();

// Controller-Service-Repository pattern
app.get('/api/users', userController.getUsers);
app.post('/api/users', userController.createUser);
\`\`\`

## Quality Focus: Dinotis Official

My internship at **Dinotis** shifted my perspective on software quality. As a QA intern, I learned:

- **Manual testing** methodologies
- **Bug reporting** and documentation
- **Quality assurance** processes
- **Attention to detail**

**Impact**: 30% reduction in critical bugs, 100% feature coverage

This role taught me that great software isn't just about features—it's about reliability and user experience.

## Banking Sector: Bank Rakyat Indonesia

Working with **Indonesia's largest bank** brought new challenges:

### Technical Achievements:
- **5 microservices** with 100% quality compliance
- **GraphQL and NestJS** implementation
- **MongoDB Aggregation Pipelines**
- **Third-party API integrations**

### What I Learned About Enterprise Development:
- **Security is paramount** in financial systems
- **Code quality standards** must be non-negotiable
- **Documentation** is as important as code
- **Scalability** must be planned from day one

## Current Role: R&D at Formulatrix

Now as an **R&D Software Engineer**, I'm working on laboratory automation systems that impact scientific research globally.

### Current Focus:
- **Migration projects** from legacy systems
- **Scientific software development**
- **Hardware-software integration**
- **Global impact** through scientific tools

## Key Lessons Learned

### 1. Technology is Just a Tool
Every company taught me different technologies, but the real skill is **problem-solving**. Whether it's Go, Java, Python, or TypeScript, the principles remain the same.

### 2. Communication Matters More Than Code
The best engineers I've worked with weren't necessarily the most technically brilliant—they were the ones who could:
- **Explain complex concepts** simply
- **Collaborate effectively** with diverse teams
- **Document their work** clearly
- **Mentor others** generously

### 3. Quality Over Speed
Early in my career, I focused on shipping features quickly. Experience taught me that:
- **Technical debt** compounds over time
- **Testing** saves more time than it costs
- **Code reviews** prevent more bugs than they catch
- **Refactoring** is maintenance, not waste

### 4. Global Perspective is Invaluable
Working with teams in **Vietnam**, **Sweden**, and **Spain** broadened my understanding of:
- **Cultural differences** in work styles
- **International business practices**
- **Global software standards**
- **Cross-timezone collaboration**

## Advice for Aspiring Engineers

### For Beginners:
1. **Focus on fundamentals** over frameworks
2. **Build projects** that solve real problems
3. **Read other people's code** extensively
4. **Join communities** and ask questions

### For Intermediate Developers:
1. **Learn system design** principles
2. **Contribute to open source** projects
3. **Mentor junior developers**
4. **Understand business requirements**

### For Everyone:
- **Never stop learning**—technology evolves rapidly
- **Build relationships**—your network is your net worth
- **Document your journey**—it helps others and yourself
- **Take calculated risks**—growth happens outside comfort zones

## What's Next?

My journey continues as I work on **laboratory automation systems** that enable scientific discoveries. Each day brings new challenges and opportunities to make a meaningful impact.

The path from intern to full-stack engineer isn't linear. It's filled with learning opportunities, setbacks, victories, and continuous growth. Embrace the journey—every step teaches you something valuable.

**Remember**: Your next opportunity might come from an unexpected place. Stay open, stay curious, and keep building.`
  },
  {
    title: 'Implementing Real-time Features with GraphQL Subscriptions',
    excerpt: 'A deep dive into building real-time applications using GraphQL subscriptions, WebSockets, and modern frontend frameworks.',
    date: '2024-10-10',
    category: 'Frontend Development',
    featured: false,
    author: 'Glorious Satria',
    tags: ['GraphQL', 'WebSockets', 'React', 'Real-time', 'Subscriptions'],
    image: '/images/blog/graphql-realtime.jpg',
    content: `# Implementing Real-time Features with GraphQL Subscriptions

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

\`\`\`javascript
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
\`\`\`

## Implementation Details

### 1. Server Setup with Apollo Server

\`\`\`javascript
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
\`\`\`

### 2. TypeDefs for Subscriptions

\`\`\`graphql
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
\`\`\`

### 3. Frontend Implementation with React

\`\`\`typescript
import { useSubscription } from '@apollo/client';
import { gql } from '@apollo/client';

const MESSAGE_SUBSCRIPTION = gql\`
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
\`;

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
\`\`\`

## Advanced Patterns

### 1. Subscription Filtering

Sometimes you need to filter subscriptions based on user permissions:

\`\`\`javascript
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
\`\`\`

### 2. Connection Management

\`\`\`javascript
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
\`\`\`

## Performance Optimization

### 1. Connection Pooling

\`\`\`javascript
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
\`\`\`

### 2. Batching Updates

\`\`\`javascript
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
\`\`\`

## Real-World Use Cases

### 1. Live Dashboard Updates
At BRI, I implemented real-time transaction monitoring:

\`\`\`javascript
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
\`\`\`

### 2. Collaborative Features

\`\`\`javascript
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
\`\`\`

## Error Handling and Resilience

### 1. Connection Recovery

\`\`\`javascript
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
\`\`\`

### 2. Graceful Degradation

\`\`\`javascript
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
\`\`\`

## Security Considerations

### 1. Authentication
\`\`\`javascript
const validateSubscription = (params, connection) => {
  const token = params.authorization;
  if (!token) {
    throw new Error('Unauthorized');
  }
  
  const user = verifyToken(token);
  return { user };
};
\`\`\`

### 2. Rate Limiting
\`\`\`javascript
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
\`\`\`

## Monitoring and Debugging

### 1. Subscription Metrics
\`\`\`javascript
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
\`\`\`

### 2. Debug Tools
\`\`\`javascript
// Development-only subscription logger
if (process.env.NODE_ENV === 'development') {
  pubsub.subscribe('*', (message) => {
    console.log('Subscription message:', message);
  });
}
\`\`\`

## Conclusion

GraphQL subscriptions provide a powerful way to build real-time features that scale. Key takeaways:

1. **Design for scale**: Use connection pooling and batching
2. **Handle errors gracefully**: Implement reconnection and fallback strategies
3. **Secure your subscriptions**: Validate permissions and implement rate limiting
4. **Monitor performance**: Track connection counts and message throughput
5. **Test thoroughly**: Real-time features are complex to debug in production

Real-time features can dramatically improve user experience when implemented correctly. Start with simple use cases and gradually add complexity as you learn the patterns and challenges specific to your application.`
  }
];

// Transform blog posts data into the required format
export const blogPosts: BlogPost[] = blogPostsData.map(post => ({
  id: generateSlug(post.title),
  title: post.title,
  excerpt: post.excerpt,
  date: post.date,
  category: post.category,
  readTime: calculateReadingTime(post.content),
  slug: generateSlug(post.title),
  featured: post.featured,
  content: post.content,
  author: post.author,
  tags: post.tags,
  image: post.image
}));

// Helper functions to get blog posts
export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(blogPosts.map(post => post.category)));
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => post.tags.includes(tag));
};

export const getAllTags = (): string[] => {
  return Array.from(new Set(blogPosts.flatMap(post => post.tags)));
};