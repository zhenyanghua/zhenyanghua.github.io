---
title: 'Behavioral Patterns - Strategy Pattern Exercise'
date: 2018-07-03 17:00:00
---
The Strategy Pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it. In this exercise, we will use the Strategy Pattern to create a simplified <a target="_blank" href="https://worldofwarcraft.com/en-us/game/races"><i class="external alternate icon"></i> Race</a>  model from the popular game **World of Warcraft**.
<!-- Excerpt End -->

## Reading Materials
1. <a target="_blank" href="https://en.wikipedia.org/wiki/Strategy_pattern"><i class="external alternate icon"></i> https://en.wikipedia.org/wiki/Strategy_pattern</a> (15 minutes reading)

## Practice Materials
1. Use the **Strategy Pattern** to create a Race Model that meets the following requirements:
- It defines the race traits which varies by each race
- It has the following two behaviors that could be considered strategies.
    - Dance
    - Fight
- Implement at least 2 races with different behaviors

### Components:
1. Context (The abstract class that defines the base of all races) - `Race`
2. Concrete Context (The implementations of the Race) - `Human`, `Orc`, `Tauren`
3. Strategy (Different behavior interfaces) - `DanceBehavior`, `FightBehavior`.
4. Concrete Strategy (The interchangeable strategies that could be passed in runtime) - `SwingDance`, `IrishDance`, `SpellFight`, `TaichiFight`, `BoxFight`.

### Tips
- If you have never played the World of Warcraft and if you have time and interest in the mid-earth world, it is worth your time.
- You could find races from the game on the <a target="_blank" href="https://worldofwarcraft.com/en-us/game/races"><i class="external alternate icon"></i> official site</a>

### Solution
<a target="_blank" href="https://github.com/zhenyanghua/design-patterns/tree/master/StrategyPatternExample/src/main/java"><i class="external alternate icon"></i> World of Warcraft Race Model Example</a>

## Questions to discuss
1. What are the common use cases to apply a **Strategy Pattern**?
2. What are the OOP design principles used in this exercise?
- Encapsulate what varies
- Favor composition over inheritance
- Program to interfaces, not implementations.
