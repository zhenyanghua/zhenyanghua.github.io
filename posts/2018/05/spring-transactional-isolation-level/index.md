---
title: 'Spring @Transactional - Isolation Level'
date: '2018-05-04 17:00:00'
---
Spring `@Transactional` annotation is concise and powerful. To understand what's the best property setting for your use case in this annotation could be confusing if you don't clearly understand what transaction management key concepts are. In this series, we will talk about the key concepts in transaction management that could be configured through the `@Transactional` annotation. This article focuses on the isolation level and its side effects.
<!-- Excerpt End -->

## What is Isolation

Isolation defines the rules how one running transaction interacts with other concurrently running transactions. The higher the isolation level, the lower the concurrency is. In other words, the higher isolation level, the slower performance is. On the other hand, the lower isolation, the more side effects it comes with. To understand each isolation level and its side effects helps to find the right isolation for your specific use case.

## Isolation Levels and Its Side Effects

There are four isolation levels that are implemented by Spring, and they also represent the common isolation levels are needed for most application use cases.  From the most isolated to the least isolated, they are `SERIALIZABLE`, `REPEATABLE_READ`, `READ_COMMITTED`, `READ_UNCOMMITTED`.

|Concurrency|Isolcation Level|SideEffects|Consistency|
|---|---|---|---|
|Lowest|`SERIALIZABLE`|None|Highest|
|Low|`REPEATABLE_READ`|Phantom Reads|High|
|High|`READ_COMMITTED`|Non-repeatable Reads, Phantom Reads|Low|
|Highest|`READ_UNCOMMITTED`|Dirty Reads, Non-repeatable Reads, Phantom Reads|Lowest|

## Terms Explained

|Term|Definition|
|---|---|
|`SERIALIZABLE`|Complete Isolation - a transaction that is completely unaware of other concurrent transactions changes.|
|`REPEATABLE_READ`|A transaction is aware of any new rows that are inserted from other concurrent transactions. Reading such newly inserted row from other transactions in the current transaction is called a *phantom read*. By allowing reading only new reads guarantees any records can be repeatably read with consistency.|
|`READ_COMMITTED`|A transaction is aware of any changes that are committed in the database from other concurrent transactions. Reading the same row might return different data within the same transaction is called a *non-repeatable read*.|
|`READ_UNCOMMITTED`|No isolation at all - A transaction is aware of all changes that happen in other concurrent transactions. Reading records that could be rolled back from other concurrent transactions is called a *dirty read*. In other words, reading any tentative data is a form of *dirty read*.|

## The Syntax

```java
@Transactional (isolation = Isolation.READ_COMMITTED)
public void someServiceFacade() {
    // calling the repository layer.
}
```
If the isolation property is not specified, the default isolation level of the underlying datastore will be used.

