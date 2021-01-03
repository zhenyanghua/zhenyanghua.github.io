import{m as e}from"../index.38ef91ca.js";import"./time.daaab1ba.js";import{P as t}from"./index.8a0fdf57.js";export default function(){return e`<${t} ...${{title:"Add Model Attributes to Layout Template",date:"2018-05-11T17:00:00.000Z"}}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="-code-controlleradvice-code-is-widely-used-to-create-exception-handlers-in-a-cross-cutting-way-when-writing-a-spring-mvc-or-rest-application-it-could-also-be-used-to-solve-adding-model-attributes-to-any-groups-of-controllers-so-that-the-model-could-be-shared-in-some-specific-views-such-as-a-layout-template-this-lesson-teaches-the-strategy-to-use-code-controlleradvice-code-annotation-to-solve-this-problem-" class="anchor" aria-hidden="true" href="#-code-controlleradvice-code-is-widely-used-to-create-exception-handlers-in-a-cross-cutting-way-when-writing-a-spring-mvc-or-rest-application-it-could-also-be-used-to-solve-adding-model-attributes-to-any-groups-of-controllers-so-that-the-model-could-be-shared-in-some-specific-views-such-as-a-layout-template-this-lesson-teaches-the-strategy-to-use-code-controlleradvice-code-annotation-to-solve-this-problem-">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a><code>@ControllerAdvice</code> is widely used to create exception handlers in a cross-cutting way when writing a Spring MVC or REST application. It could also be used to solve adding model attributes to any groups of controllers so that the model could be shared in some specific views such as a layout template. This lesson teaches the strategy to use <code>@ControllerAdvice</code> annotation to solve this problem.</h2><h2>\n  <a id="story" class="anchor" aria-hidden="true" href="#story">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Story</h2><p>When we have a component that is used in multiple views - such as a navigation menu with a menu service that retrieves the menu items from a repository, we need to add this data to the model. However, the navigation menu always appear in many views, it is unwise to write the code to call the menu service and bind to the model in all related controllers.</p>\n<h2>\n  <a id="solution" class="anchor" aria-hidden="true" href="#solution">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Solution</h2><h4>\n  <a id="solution-1" class="anchor" aria-hidden="true" href="#solution-1">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Solution 1</h4><p>One solution is to create a abstract controller that implements this logic and ask all other controllers in whose views the navigation menu appears to extend this abstract controller. The downside of this approach is that one class can only extend only one super class without using the Java 8 default Interface implementation. When there are different model attributes that needs to be added to different controllers, this method will create chaos in managing these models.</p>\n<h4>\n  <a id="solution-2" class="anchor" aria-hidden="true" href="#solution-2">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Solution 2</h4><p>Another solution is to apply Spring AOP. The aspect that gets applied is the model attributes bind, and the cross-cutting points are the controllers that need this model. To use this approach, AspectJ syntax knowledge is needed.</p>\n<h4>\n  <a id="solution-3" class="anchor" aria-hidden="true" href="#solution-3">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Solution 3</h4><p>The simples solution is to use the <code>@ControllerAdvice</code> annotation which could be applied to all controllers or selected controllers by <code>annotation</code> or <code>basePackages</code> or <code>basePackageClasses</code>.</p>\n<p>For instance, to bind menu item model attribute to all controller classes, we could just write this:</p>\n<div class="codeblock">\n  <pre>@ControllerAdvice\npublic class MenuItemController {\n    private MenuItemService menuItemService;\n\n    public MenuItemController(final MenuItemService menuItemService) {\n        this.menuItemService = menuItemService;\n    }\n\n    @ModelAttribute(&quot;menuItems&quot;)\n    public List&lt;MenuItem&gt; getMenuItems () {\n        return menuItemService.findAll();\n    }\n}</pre>\n</div><h2>\n  <a id="lesson-learned" class="anchor" aria-hidden="true" href="#lesson-learned">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Lesson Learned</h2><ul>\n<li><code>@ControllerAdvice</code> is a specialized <code>@Component</code> that could be used to do not just exception handling, but also model attributes binding in a cross-cutting way.</li>\n</ul>\n'}}/>
    </${t}>`}