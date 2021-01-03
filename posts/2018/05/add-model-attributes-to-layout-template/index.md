---
title: 'Add Model Attributes to Layout Template'
date: 2018-05-11 17:00:00
---
`@ControllerAdvice` is widely used to create exception handlers in a cross-cutting way when writing a Spring MVC or REST application. It could also be used to solve adding model attributes to any groups of controllers so that the model could be shared in some specific views such as a layout template. This lesson teaches the strategy to use `@ControllerAdvice` annotation to solve this problem.
<!-- Excerpt End -->

## Story

When we have a component that is used in multiple views - such as a navigation menu with a menu service that retrieves the menu items from a repository, we need to add this data to the model. However, the navigation menu always appear in many views, it is unwise to write the code to call the menu service and bind to the model in all related controllers.

## Solution

#### Solution 1

One solution is to create a abstract controller that implements this logic and ask all other controllers in whose views the navigation menu appears to extend this abstract controller. The downside of this approach is that one class can only extend only one super class without using the Java 8 default Interface implementation. When there are different model attributes that needs to be added to different controllers, this method will create chaos in managing these models.

#### Solution 2

Another solution is to apply Spring AOP. The aspect that gets applied is the model attributes bind, and the cross-cutting points are the controllers that need this model. To use this approach, AspectJ syntax knowledge is needed.

#### Solution 3

The simples solution is to use the `@ControllerAdvice` annotation which could be applied to all controllers or selected controllers by `annotation` or `basePackages` or `basePackageClasses`.

For instance, to bind menu item model attribute to all controller classes, we could just write this:
```java
@ControllerAdvice
public class MenuItemController {
    private MenuItemService menuItemService;

    public MenuItemController(final MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    @ModelAttribute("menuItems")
    public List<MenuItem> getMenuItems () {
        return menuItemService.findAll();
    }
}
```

## Lesson Learned
- `@ControllerAdvice` is a specialized `@Component` that could be used to do not just exception handling, but also model attributes binding in a cross-cutting way.