---
title: 'Behavioral Patterns - State Pattern Exercise'
date: 2018-06-26 17:00:00
---
The State Pattern allows an object to alter its behavior when its internal state changes. It tremendously reduces the complexity when introducing more states later to the object. In this exercise, we will use the State Pattern to create a modern vending machine to understand the components of the State Pattern.
<!-- Excerpt End -->

## Reading Materials
1. <a target="_blank" href="https://en.wikipedia.org/wiki/State_pattern"><i class="external alternate icon"></i> https://en.wikipedia.org/wiki/State_pattern</a> (10 minutes reading)

## Practice Materials
1. Use the **State Pattern** to create a modern vending machine that does the following things:
- It sells different kinds of fruit
- It has the following states:
    - card swiped accepted
    - card swiped rejected
    - item selected
    - sold
    - sold out
- each state has the following operations
    - swipe card
    - select item
    - confirm
    - cancel
    - dispense

### Components:
1. Vending Machine (The state machine that has multiple states) - `VendingMachine`
2. State (The interface that defines all operations that each state should have) - `State`
3. Concrete States (All possible states of the vending machine) - `CardSwipedAcceptedState`, `CardSwipedRejectedState`, `ItemSelectedState`, `SoldState`, `SoldOutState`.
4. Client (The user who uses the vending machine) - `App`

### Tips
- A key-value pair like data structure could be used to keep track of the inventory of the vending machine.
- The state machine needs to keep its internal state.
- some mock helper methods could be used to print out generic invalid operation errors and validate cards.

### Solution
<a target="_blank" href="https://github.com/zhenyanghua/design-patterns/tree/master/StatePatternExample/src/main/java"><i class="external alternate icon"></i> Vending Machine Example</a>

## Questions to discuss
1. What are the common use cases to apply a **State Pattern**?
2. What needs to be done if multiple instances of the vending machine are instantiated?
    - move concrete state instances to shared static instances.
    - instead of passing in an instance of vending machine from the state constructor, passing the reference when each state operation is called.
