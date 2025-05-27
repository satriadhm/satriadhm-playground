---
title: How to Insert NULL to SQLite3 with Go
excerpt: Learn the simple way to handle NULL timestamp values in SQLite3 when working with Go - no more zero dates!
date: 2024-12-15
category: Backend Development
featured: false
author: Developer Guide
tags: [Go, SQLite3, Database, NULL Handling, Timestamps]
image: /images/blog/sqlite-go-null.jpg
---

# How to Insert NULL to SQLite3 with Go

Have you ever faced the problem of wanting to store `NULL` values for timestamps in a database? I often encounter this when building Go applications with SQLite3.

## The Problem

I have an `orders` table like this:

```sql
CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    paid_at DATETIME
);
```

When I try to update with Go code like this:

```go
var paidAt time.Time // empty, not set
query := "UPDATE orders SET paid_at = ? WHERE order_id = ?"
db.Exec(query, paidAt, 1)
```

What gets stored in the database isn't `NULL`, but `0001-01-01 00:00:00`. But I want a `NULL` value because the order hasn't been paid yet.

## Simple Solutions

### 1. Use Pointers

The easiest way is to use pointers:

```go
func updatePayment(db *sql.DB, orderID int, paidAt *time.Time) {
    query := "UPDATE orders SET paid_at = ? WHERE order_id = ?"
    db.Exec(query, paidAt, orderID)
}

// How to use:
// Already paid
now := time.Now()
updatePayment(db, 1, &now)

// Not paid yet (NULL)
updatePayment(db, 2, nil)
```

### 2. Use sql.NullTime

```go
import "database/sql"

var paidAt sql.NullTime

// Already paid
paidAt = sql.NullTime{Time: time.Now(), Valid: true}

// Not paid yet
paidAt = sql.NullTime{Valid: false}

query := "UPDATE orders SET paid_at = ? WHERE order_id = ?"
db.Exec(query, paidAt, 1)
```

## Complete Example

```go
package main

import (
    "database/sql"
    "fmt"
    "time"
    _ "github.com/mattn/go-sqlite3"
)

type Order struct {
    ID     int        `json:"id"`
    PaidAt *time.Time `json:"paid_at"`
}

func main() {
    db, _ := sql.Open("sqlite3", "test.db")
    defer db.Close()
    
    // Create table
    db.Exec(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY,
        paid_at DATETIME
    )`)
    
    // Insert new order (not paid yet)
    db.Exec("INSERT INTO orders (paid_at) VALUES (?)", nil)
    
    // Update to paid
    now := time.Now()
    db.Exec("UPDATE orders SET paid_at = ? WHERE id = 1", &now)
    
    // Fetch data
    var order Order
    var paidAt sql.NullTime
    
    db.QueryRow("SELECT id, paid_at FROM orders WHERE id = 1").Scan(
        &order.ID, &paidAt)
    
    if paidAt.Valid {
        order.PaidAt = &paidAt.Time
        fmt.Printf("Order %d is paid: %v\n", order.ID, *order.PaidAt)
    } else {
        fmt.Printf("Order %d is not paid yet\n", order.ID)
    }
}
```

## Conclusion

- Use **pointers** (`*time.Time`) for fields that can be NULL
- Use **sql.NullTime** when scanning from database
- Send **nil** to insert NULL values

With this approach, you can easily handle NULL values for timestamps in SQLite3!