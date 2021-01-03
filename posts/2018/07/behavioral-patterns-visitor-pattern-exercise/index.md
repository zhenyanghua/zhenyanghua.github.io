---
title: 'Behavioral Patterns - Visitor Pattern Exercise'
date: 2018-07-17 17:00:00
---
The Visitor Pattern represents an operation to be performed on elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates. In this exercise, we will create a bookstore inventory structure that collects books, movies, and music. We will add shared behaviors across this hierarchical structure by using the Visitor Pattern.
<!-- Excerpt End -->

## Reading Materials
1. <a target="_blank" href="https://en.wikipedia.org/wiki/Visitor_pattern"><i class="external alternate icon"></i> https://en.wikipedia.org/wiki/Visitor_pattern</a> (15 minutes reading)

## Practice Materials
1. Use the **Visitor Pattern** to create a bookstore inventory that meets the following requirements:
- the bookstore inventory collects **books**, **movies**, and **music**.
- all these three media types have their own members and one common member - **title**
- add one behavior to the media so that the operation can print out all the titles.
- add second behavior to the media so that the operation can print out details of all media and the total count of media while the media is traversed.

### Components:
1. Visitor Interface (The operation that is shared across visited elements) - `MediaVisitor`
2. Element Interface (The hierarchical structure that accepts the operation from a visitor) - `Media`
3. Concrete Elements (The elements in the hierarchical structure that will be visited) - `Book`, `Movie`, `Music`
4. Concrete Visitors (Each visitor will define one type of operation) - `TitlePrintingVisitor`, `DetailPrintingVisitor`
5. Iterator for traversal (The root structure that holds the references to all the sub-elements) - `Inventory`

### Tips
- Visitors can have their own internal state to keep track of the elements they visit.

### Solution
<a target="_blank" href="https://github.com/zhenyanghua/design-patterns/tree/master/VisitorPatternExample/src/main/java"><i class="external alternate icon"></i> Bookstore Inventory Example</a>

## Questions to discuss
1. What are the common use cases to apply the **Template Method Pattern**?
2. What are the two major disadvantages of the **Visitor Pattern**?
- Break Encapsulation
- Difficult to add more subclasses to the hierarchical structure
 
