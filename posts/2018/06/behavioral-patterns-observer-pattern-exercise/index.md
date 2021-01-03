---
title: 'Behavioral Patterns - Observer Pattern Exercise'
date: 2018-06-20 17:00:00
---
The Observer Pattern is widely used to solve one-to-many object state changes notification problems. The pub/sub model uses the Observer Pattern as the base pattern. It is also used in the event-driven systems. In this exercise, we will create a naive implementation of the pub/sub model to understand the components of the Observer Pattern.
<!-- Excerpt End -->

## Reading Materials
1. <a target="_blank" href="https://en.wikipedia.org/wiki/Observer_pattern"><i class="external alternate icon"></i> https://en.wikipedia.org/wiki/Observer_pattern</a> (10 minutes reading)

## Practice Materials
1. Use the **Observer Pattern** to create a naive implementation of the pub/sub model.

### Components:
1. Observer (The interface that defines the callback method signature or the update method when it is notified.) - `Observer`
2. Subject (The interface that observers listen to) - `Subject`
3. AbstractSubscriber (The abstract class that attach the observer to a subject) - `AbstractSubscriber`
4. AbstractTopic (The abstract class that keep track of a list of observers and provides observer registration implementations) - `AbstractTopic`
5. TextMessageSubscriber (The concrete class that represents a subscriber that will print out the message that is published) - `TextMessageSubscriber`
6. TextMessageTopic (The concrete class that represents a topic that defines the message publishing implementation) - `TextMessageTopic`
7. Client (The class that creates topics and subscribers, registers and unregisters them, and publishes messages to topics) - `App`

### Tip
- A Queue could be used to keep track of published message to the Topic. After notifying all subscribers about the head message of the queue, the message should be dequeued.

### Solution
<a target="_blank" href="https://github.com/zhenyanghua/design-patterns/tree/master/ObserverPatternExample/src/main/java"><i class="external alternate icon"></i> Pub/Sub Example</a>

## Questions to discuss
1. What are the common use cases to apply an **Observer Pattern**?
