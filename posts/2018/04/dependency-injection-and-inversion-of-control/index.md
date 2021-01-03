---
title: 'Dependency Injection and Inversion of Control'
date: 2018-04-29 17:00:00
---
We often mix the Dependency Injection (DI) with the Inversion of Control (IoC). In fact, DI is one form of IoC. This article clarifies the terms.
<!-- Excerpt End -->

## Dependency Injection (DI)

Classes that employ dependency injection specify the objects that they interact with through constructor, interface, or setters.

## Inversion of Control (IoC)

Object location or instantiation is removed as a responsibility for a caller class and instead left to a container that manages this tier of logic. The control of objects instantiation is inverted from the object caller class to the container.

## Relationship

Dependency Injection is one form of the broader technique of Inversion of Control. The client delegates the responsibility of providing its dependencies to external code (the injector). The client is not allowed to call the injector code. It is the injecting code that constructs the services and calls the client to inject them.

The client does not need to know:

- about injecting code.
- how to construct the services.
- which actual services it is using.

The client only needs to know about the intrinsic interfaces of the services because these define how the client may use the services. This separates the responsibilities of use and construction.

## Lesson Learnt
- Dependency Injection is one form of Inversion of Control. 

