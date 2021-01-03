---
title: 'Spring @Transactional - Propagation Type'
date: '2018-05-08 17:00:00'
---
Spring `@Transactional` annotation is concise and powerful. To understand what's the best property setting for your use case in this annotation could be confusing if you don't clearly understand what transaction management key concepts are. In this series, we will talk about the key concepts in transaction management that could be configured through the `@Transactional` annotation. This article focuses on the propagation type.
<!-- Excerpt End -->

## What is Propagation

Propagation describes the transactional behavior from the client when a transactional method is called. In Spring-managed transactions, there are two types of transactions -- physical and logical transactions. The physical transaction is always the outer transaction while the logical transaction is the inner transaction that is mapped to the physical transaction based on the propagation type as the transaction propagates.

## Propagation Types

There are seven types of propagation that we could use for the propagation property, among which only `REQUIRED`, `REQUIRED_NEW`, and `NESTED` types guarantee a transaction will be started, so the [isolation level](https://leafyjava.com/articles/spring-transactional-isolation-level) property will be ignored if the propagation type is not one of these three types.

|Type|Definition|
|---|---|
|`REQUIRED`|Use the current transaction, create a new transaction and use it if no transaction exists.|
|`REQUIRED_NEW`|Always create a new transaction, and suspend the current transaction if it exists.|
|`NESTED`|Execute the transaction within a current transaction if a current transaction exists, otherwise create a new transaction and use it.|
|`SUPPORTS`| Use the current transaction if it exists, otherwise execute the transaction non-transactionally.|
|`NOT_SUPPORTED`|Execute the transaction non-transactionally, suspend the current transaction if it exists.|
|`MANDATORY`|Use the current transaction, throw an exception if no transaction exists.|
|`NEVER`|Execute the transaction non-transactionally, throw an exception if a transaction exists.|

## The Syntax

```java
@Transactional (propagation = Propagation.SUPPORTS)
public void someServiceFacade() {
    // calling the repository layer.
}
```
If the propagation property is not specified, the default will be `REQUIRED`.

