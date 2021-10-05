import{y as e,m as a}from"../index.40878c7b.js";import"./time.daaab1ba.js";import{P as t}from"./index.5ada62b8.js";const n=[];export default function(){return e(()=>{n.forEach(e=>new Function(e)())},[]),a`<${t} ...${{title:"Behavioral Patterns - Command Pattern Exercise",date:"2018-05-18T17:00:00.000Z"}} summary=${"<p>The Command Pattern is almost the second most popular pattern after the Singleton Pattern. It can be used to encapsulate each request to an object and turn the client application to a stateless application while the delegated object who receives the invocation persists its own state. In this exercise, we will create an operation manager which basically can change some state and undo the changes. The example I created is a Document Writer, which can write lines and undo the lines are written. For more challenge, there is also a bonus point – a custom data structure that you will need to implement --  to mimic preventing the system crashing from not-enough-memory.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="reading-materials" class="anchor" aria-hidden="true" href="#reading-materials">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Reading Materials</h2><ol>\n<li><a target="_blank" href="https://en.wikipedia.org/wiki/Command_pattern"><i class="external alternate icon"></i> https://en.wikipedia.org/wiki/Command_pattern</a> (20 minutes reading)</li>\n</ol>\n<h2>\n  <a id="practice-materials" class="anchor" aria-hidden="true" href="#practice-materials">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Practice Materials</h2><ol>\n<li>Use the <strong>Command Pattern</strong> to create a naive operation manager that can execute a sequence of operations and undo the last <strong>3</strong> operations. (For beginner player, you may skip the requirement that only undo the last <strong>3</strong> operations, instead, you should undo all of the operations. For the advanced player, you are expected to restrict the manager to only undo the last <strong>3</strong> operations.)</li>\n</ol>\n<h3>\n  <a id="components-" class="anchor" aria-hidden="true" href="#components-">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Components:</h3><ol>\n<li>Command (The common interface that has the <code>execute</code> and <code>undo</code> methods) - <code>Command</code></li>\n<li>ConcreteCommand (The actual command that implements the <code>Command</code> interface, and takes a receiver and calls its member methods.) - <code>WriteCommand</code></li>\n<li>Client (The entry class that creates the command and its receiver) - <code>App</code></li>\n<li>Receiver (The class that will be used in a command) - <code>Document</code></li>\n<li>Invoker (The class that invokes a command) - <code>CommandRunner</code></li>\n<li>Stack (The object that keeps track of most recent executed commands. To undo, the stack just pops the last commands and executes its <code>undo</code> method.) - <code>FixedStack</code></li>\n</ol>\n<h3>\n  <a id="tip" class="anchor" aria-hidden="true" href="#tip">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Tip</h3><ul>\n<li>Stack is a useful data structure to keep track of operations. However, to create a fixed size stack, you may consider implementing a custom data structure that uses a double-ended queue.</li>\n</ul>\n<h3>\n  <a id="solution" class="anchor" aria-hidden="true" href="#solution">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Solution</h3><p><a target="_blank" href="https://github.com/zhenyanghua/design-patterns/tree/master/CommandPatternExample/src/main/java"><i class="external alternate icon"></i> Naive Operation Manager Example -- A Document Writer</a></p>\n<h2>\n  <a id="questions-to-discuss" class="anchor" aria-hidden="true" href="#questions-to-discuss">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Questions to discuss</h2><ol>\n<li>What are the common use cases to apply a <strong>Command Pattern</strong>?</li>\n<li>What features are there in the application when you see that you should apply the <strong>Command Pattern</strong>?</li>\n<li>What are the similarities and differences of the <strong>Command Pattern</strong> and the <a href="https://www.leafyjava.com/articles/behavioral-patterns-memento-pattern-exercise"><strong>Memento Pattern</strong></a>?</li>\n</ol>\n'}}/>
    </${t}>`}