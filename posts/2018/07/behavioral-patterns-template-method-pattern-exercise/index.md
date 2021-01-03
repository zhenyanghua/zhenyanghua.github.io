---
title: 'Behavioral Patterns - Template Method Pattern Exercise'
date: 2018-07-11 17:00:00
---
The Template Method Pattern defines the skeleton of an algorithm in a method, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm’s structure. In this exercise, we will use the Template Method Pattern to create a Three Course Dinner Template for training restaurant staff for preparing the meal.
<!-- Excerpt End -->

## Reading Materials
1. <a target="_blank" href="https://en.wikipedia.org/wiki/Template_method_pattern"><i class="external alternate icon"></i> https://en.wikipedia.org/wiki/Template_method_pattern</a> (10 minutes reading)

## Practice Materials
1. Use the **Template Method Pattern** to create a Three-Course Dinner Template that meets the following requirements:
- It defines a set of steps in the following order:
    - `beforeStart` (hook)
    - `serveBeverage` (optional)
        - `makeBeverage` (only if serveBeverage is true)
    - `makeStarter`
    - `makeEntry`
    - `makeDessert`;
    - `afterFinish` (hook)
- Make two concrete three-course dinners by using the Three-Course Dinner Template.

### Components:
1. Abstract Class (The abstract class that defines the steps of algorithms and abstract method and hooks for subclasses to implement) - `ThreeCourseDinnerTemplate`
2. SubClass (The implementations of the `ThreeCourseDinnerTemplate`) - `SurfNTurfDinner`, `VegetarianDinner`

### Tips
- A hook may provide a way for a subclass to implement an optional part of an algorithm, or if it isn’t important to the subclass’s implementation, it can skip it. Another use is to give the subclass a chance to react to some step in the template method that is about to happen or just happened.

### Solution
<a target="_blank" href="https://github.com/zhenyanghua/design-patterns/tree/master/TemplateMethodPatternExample/src/main/java"><i class="external alternate icon"></i> Three-Course Dinner Example</a>

## Questions to discuss
1. What are the common use cases to apply the **Template Method Pattern**?
2. What are the differences between the **Template Method Pattern** and the [**Strategy Pattern**](https://leafyjava.com/articles/behavioral-patterns-strategy-pattern-exercise)?
 
