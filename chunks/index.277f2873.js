import{y as e,m as a}from"../index.fba53743.js";import"./time.daaab1ba.js";import{P as t}from"./index.7cb26072.js";const i=[];export default function(){return e(()=>{i.forEach(e=>new Function(e)())},[]),a`<${t} ...${{title:"Behavioral Patterns - State Pattern Exercise",date:"2018-06-26T17:00:00.000Z"}} summary=${"<p>The State Pattern allows an object to alter its behavior when its internal state changes. It tremendously reduces the complexity when introducing more states later to the object. In this exercise, we will use the State Pattern to create a modern vending machine to understand the components of the State Pattern.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="reading-materials" class="anchor" aria-hidden="true" href="#reading-materials">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Reading Materials</h2><ol>\n<li><a target="_blank" href="https://en.wikipedia.org/wiki/State_pattern"><i class="external alternate icon"></i> https://en.wikipedia.org/wiki/State_pattern</a> (10 minutes reading)</li>\n</ol>\n<h2>\n  <a id="practice-materials" class="anchor" aria-hidden="true" href="#practice-materials">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Practice Materials</h2><ol>\n<li>Use the <strong>State Pattern</strong> to create a modern vending machine that does the following things:</li>\n</ol>\n<ul>\n<li>It sells different kinds of fruit</li>\n<li>It has the following states:<ul>\n<li>card swiped accepted</li>\n<li>card swiped rejected</li>\n<li>item selected</li>\n<li>sold</li>\n<li>sold out</li>\n</ul>\n</li>\n<li>each state has the following operations<ul>\n<li>swipe card</li>\n<li>select item</li>\n<li>confirm</li>\n<li>cancel</li>\n<li>dispense</li>\n</ul>\n</li>\n</ul>\n<h3>\n  <a id="components-" class="anchor" aria-hidden="true" href="#components-">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Components:</h3><ol>\n<li>Vending Machine (The state machine that has multiple states) - <code>VendingMachine</code></li>\n<li>State (The interface that defines all operations that each state should have) - <code>State</code></li>\n<li>Concrete States (All possible states of the vending machine) - <code>CardSwipedAcceptedState</code>, <code>CardSwipedRejectedState</code>, <code>ItemSelectedState</code>, <code>SoldState</code>, <code>SoldOutState</code>.</li>\n<li>Client (The user who uses the vending machine) - <code>App</code></li>\n</ol>\n<h3>\n  <a id="tips" class="anchor" aria-hidden="true" href="#tips">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Tips</h3><ul>\n<li>A key-value pair like data structure could be used to keep track of the inventory of the vending machine.</li>\n<li>The state machine needs to keep its internal state.</li>\n<li>some mock helper methods could be used to print out generic invalid operation errors and validate cards.</li>\n</ul>\n<h3>\n  <a id="solution" class="anchor" aria-hidden="true" href="#solution">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Solution</h3><p><a target="_blank" href="https://github.com/zhenyanghua/design-patterns/tree/master/StatePatternExample/src/main/java"><i class="external alternate icon"></i> Vending Machine Example</a></p>\n<h2>\n  <a id="questions-to-discuss" class="anchor" aria-hidden="true" href="#questions-to-discuss">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Questions to discuss</h2><ol>\n<li>What are the common use cases to apply a <strong>State Pattern</strong>?</li>\n<li>What needs to be done if multiple instances of the vending machine are instantiated?<ul>\n<li>move concrete state instances to shared static instances.</li>\n<li>instead of passing in an instance of vending machine from the state constructor, passing the reference when each state operation is called.</li>\n</ul>\n</li>\n</ol>\n'}}/>
    </${t}>`}