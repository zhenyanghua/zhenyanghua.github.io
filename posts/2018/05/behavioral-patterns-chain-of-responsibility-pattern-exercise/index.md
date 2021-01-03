---
title: 'Behavioral Patterns - Chain of Responsibility Pattern Exercise'
date: 2018-05-18 17:00:00
---
The Chain of Responsibility Pattern is very useful to avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. Chain the receiving objects and pass the request along with the chain until an object handles it. We will implement a naïve security filter chain using this pattern in our practice exercise. You will certainly enjoy this exercise as it is a great way to get you totally master this pattern.
<!-- Excerpt End -->

## Reading Materials
1. <a target="_blank" href="https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern"><i class="external alternate icon"></i> https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern</a> (15 minutes reading)

## Practice Materials
1. Use chain of responsibility pattern to create a naive security filter chain that will check the following responsibilities in order:
> 1. If any endpoint matches the request
>  - *False* - return *Not Found*
> 2. If the endpoint has any security rules
>  - *False* - return *Resource*
> 3. If the request contains any authorization header
>  - *False* - return *Unauthorized request*
> 4. If the authorization is approved
>  - *False* - return *Invalid authorization*
> 5. return *Resource*

### Components
- Handler (Interface for handling requests)
- ConcreteHandler (Handle the request it is the responsibility for or forwards it to its successor)
- Client (Initiate the request to a ConcreteHandler object on any part of the chain, in this example, it should start from the the first filter)

### Tips
- you may create a Helper class to handle some conditional logic

### Solution
<a target="_blank" href="https://github.com/zhenyanghua/design-patterns/tree/master/ChainOfResponsibilityPatternExample/src/main/java"><i class="external alternate icon"></i> Naive Security Chain Example</a>


## Questions to discuss
1. What are the common use cases to apply a **Chain of Responsibility**?
2. What features are there in the application when you see that you should apply the **Chain of Responsibility** pattern?