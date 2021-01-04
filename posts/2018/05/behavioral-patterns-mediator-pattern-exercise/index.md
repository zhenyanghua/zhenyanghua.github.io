---
title: 'Behavioral Patterns - Mediator Pattern Exercise'
date: 2018-05-18 17:00:00
---
The Mediator Pattern defines an object that encapsulates how a set of objects interact. In this exercise, we will create a mediator that helps us handle the cross-cutting business logic in the Command Pattern Exercise.
<!-- Excerpt End -->

## Reading Materials
1. <a target="_blank" href="https://en.wikipedia.org/wiki/Mediator_pattern"><i class="external alternate icon"></i> https://en.wikipedia.org/wiki/Mediator_pattern</a> (15 minutes reading)

## Practice Materials
1. Extend the **Command Pattern** exercise by applying the **Mediator Pattern** to a new `SignAllCommand` class, which delegate the request to a mediator that does the actual business logic.

*If you haven't done the [Command Pattern Exercise](https://leafyjava.com/articles/behavioral-patterns-command-pattern-exercise) but you are already familiar with the Command Pattern, you can go straight to this exercise.*

### Components:
1. Command (The common interface that has the `execute` and `undo` methods) or Colleague - `Command`
2. ConcreteCommand (The actual command that implements the `Command` interface, and takes a receiver and calls its member methods.) - `SignAllCommand` and `WriteCommand`
3. Client (The entry class that creates the command and its receiver) - `App`
4. Receiver (The class that will be used in a command) - `Document`
5. Invoker (The class that invokes a command) - `DocumentRunner`
6. Stack (The object that keeps track of most recent executed commands. To undo, the stack just pops the last commands and executes its `undo` method.) - `FixedStack`
7. Mediator (The component where all cross-cutting logic happens) - `Mediator`


### Tip
- Without using a mediator in this exercise, the **SignAllCommand** will have to hold the state of all the documents passed in. As the DocumentWriter application grows, more commands are introduced to the application, among which there may be similar group commands similar to the **SignAllCommand** that will have to hold other references of all the documents, which add unnecessary duplicated references across all group commands. A mediator could be a hub that holds the references to all documents and related operations. There could be more discussions on how to submodularize the mediator so that it doesn't grow into a super long class with all different kind of tasks.

### Solution
<a target="_blank" href="https://github.com/zhenyanghua/design-patterns/tree/master/MediatorPatternExample/src/main/java"><i class="external alternate icon"></i> Extended Operation Manager Example -- A Document Writer</a>

## Questions to discuss
1. What are the common use cases to apply a **Mediator Pattern**?
2. How do we submodularize a mediator so that it doesn't grow into a class has too many responsibilities?