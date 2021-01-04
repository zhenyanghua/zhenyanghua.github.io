---
title: 'Behavioral Patterns - Iterator Pattern Exercise'
date: 2018-05-18 17:00:00
---
The iterator pattern is widely used in collections, it simplifies the way a collection could be iterated as well as provides a mutable capability to the collection during the iteration.
<!-- Excerpt End -->

Most languages provide an interface to the iterator pattern. We will implement the interface to create an iterable polyline data type. This exercise is fun enough that challenges your fundamental programming skills on the data structures and algorithms.

## Reading Materials
1. <a target="_blank" href="https://en.wikipedia.org/wiki/Iterator_pattern"><i class="external alternate icon"></i> https://en.wikipedia.org/wiki/Iterator_pattern</a> (10 minutes reading)

## Practice Materials
1. Create a class called `Polyline` that implements the iterator pattern.

- The `Polyline` class could be used inside of a `foreach` loop to retrieve each point without exposing the index of them.
- The `Polyline` class should provide methods to extend polyline.
- The `Polyline` class should provide methods to remove points from polyline over the iteration.
- The `Polyline` class can only use the array as underlining data structure.

### Tips
- each language has their own interface to the iterator pattern, take advantage of that to implement the `Polyline` class.
- array has fixed size. When there is no space in the array, we could create a new array that doubles the size of the current one, and copy items over. On the other hand, after enough items are removed from the array, we could compress the array to utilize the current space to avoid unnecessary space expansion.

### Solution
<a target="_blank" href="https://github.com/zhenyanghua/design-patterns/blob/master/IteratorPatternExample/src/main/java/Polyline.java"><i class="external alternate icon"></i> Polyline Example</a>

## Questions to discuss
1. What are the benefits using the iterator pattern?
2. When could we use the iterator pattern?