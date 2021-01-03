---
title: 'Behavioral Patterns - Command Pattern Exercise'
date: 2018-05-18 17:00:00
---
The Command Pattern is almost the second most popular pattern after the Singleton Pattern. It can be used to encapsulate each request to an object and turn the client application to a stateless application while the delegated object who receives the invocation persists its own state. In this exercise, we will create an operation manager which basically can change some state and undo the changes. The example I created is a Document Writer, which can write lines and undo the lines are written. For more challenge, there is also a bonus point – a custom data structure that you will need to implement --  to mimic preventing the system crashing from not-enough-memory.
<!-- Excerpt End -->

## Reading Materials
1. <a target="_blank" href="https://en.wikipedia.org/wiki/Command_pattern"><i class="external alternate icon"></i> https://en.wikipedia.org/wiki/Command_pattern</a> (20 minutes reading)

## Practice Materials
1. Use the **Command Pattern** to create a naive operation manager that can execute a sequence of operations and undo the last **3** operations. (For beginner player, you may skip the requirement that only undo the last **3** operations, instead, you should undo all of the operations. For the advanced player, you are expected to restrict the manager to only undo the last **3** operations.)

### Components:
1. Command (The common interface that has the `execute` and `undo` methods) - `Command`
2. ConcreteCommand (The actual command that implements the `Command` interface, and takes a receiver and calls its member methods.) - `WriteCommand`
3. Client (The entry class that creates the command and its receiver) - `App`
4. Receiver (The class that will be used in a command) - `Document`
5. Invoker (The class that invokes a command) - `CommandRunner`
6. Stack (The object that keeps track of most recent executed commands. To undo, the stack just pops the last commands and executes its `undo` method.) - `FixedStack`

### Tip
- Stack is a useful data structure to keep track of operations. However, to create a fixed size stack, you may consider implementing a custom data structure that uses a double-ended queue.

### Solution
<a target="_blank" href="https://github.com/zhenyanghua/design-patterns/tree/master/CommandPatternExample/src/main/java"><i class="external alternate icon"></i> Naive Operation Manager Example -- A Document Writer</a>

## Questions to discuss
1. What are the common use cases to apply a **Command Pattern**?
2. What features are there in the application when you see that you should apply the **Command Pattern**?
3. What are the similarities and differences of the **Command Pattern** and the [**Memento Pattern**](https://www.leafyjava.com/articles/behavioral-patterns-memento-pattern-exercise)?