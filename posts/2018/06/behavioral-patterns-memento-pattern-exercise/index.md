---
title: 'Behavioral Patterns - Memento Pattern Exercise'
date: 2018-06-20 17:00:00
---
The Memento Pattern is used to record the internal state of an object. It is used to create a state machine and also makes undo or redo operation very easy with this pattern. In this exercise, we will use a scenario of account and account manager to understand the components of this pattern.
<!-- Excerpt End -->

## Reading Materials
1. <a target="_blank" href="https://en.wikipedia.org/wiki/Memento_pattern"><i class="external alternate icon"></i> https://en.wikipedia.org/wiki/Memento_pattern</a> (15 minutes reading)

## Practice Materials
1. Use the **Memento Pattern** to support an account manager to do save and roll back operations for his managed accounts.

### Components:
1. Originator (The object whose state will be saved as a memento) - `Account`
2. Memento (The object that represent the saved state from its originator) - `AccountMemento`
3. Caretaker (The object that keep the immutable state of mementos) - `AccountManager`
4. Client (The entry point of the application that will run the given scenario) - `App`

### Tip
- Not all states of the originator have to be saved to a memento object.
- To implement rollback or revert in the `AccountManager`, a *stack* could be used to keep track of the entire memento history.
- `Account.deposit` or `Account.withdraw` could be created to change the `Account.balance`

### Solution
<a target="_blank" href="https://github.com/zhenyanghua/design-patterns/tree/master/MementoPatternExample/src/main/java"><i class="external alternate icon"></i> Account Manager Example</a>

## Questions to discuss
1. What are the common use cases to apply a **Memento Pattern**?
2. What are the similarities and differences of the **Memento Pattern** and the [**Command Pattern**](https://www.leafyjava.com/articles/behavioral-patterns-command-pattern-exercise)?