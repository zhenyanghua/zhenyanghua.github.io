import{y as e,m as a}from"../index.9aae7637.js";import"./time.daaab1ba.js";import{P as t}from"./index.db11e85a.js";const n=[];export default function(){return e(()=>{n.forEach(e=>new Function(e)())},[]),a`<${t} ...${{title:"Behavioral Patterns - Memento Pattern Exercise",date:"2018-06-20T17:00:00.000Z"}} summary=${"<p>The Memento Pattern is used to record the internal state of an object. It is used to create a state machine and also makes undo or redo operation very easy with this pattern. In this exercise, we will use a scenario of account and account manager to understand the components of this pattern.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="reading-materials" class="anchor" aria-hidden="true" href="#reading-materials">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Reading Materials</h2><ol>\n<li><a target="_blank" href="https://en.wikipedia.org/wiki/Memento_pattern"><i class="external alternate icon"></i> https://en.wikipedia.org/wiki/Memento_pattern</a> (15 minutes reading)</li>\n</ol>\n<h2>\n  <a id="practice-materials" class="anchor" aria-hidden="true" href="#practice-materials">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Practice Materials</h2><ol>\n<li>Use the <strong>Memento Pattern</strong> to support an account manager to do save and roll back operations for his managed accounts.</li>\n</ol>\n<h3>\n  <a id="components-" class="anchor" aria-hidden="true" href="#components-">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Components:</h3><ol>\n<li>Originator (The object whose state will be saved as a memento) - <code>Account</code></li>\n<li>Memento (The object that represent the saved state from its originator) - <code>AccountMemento</code></li>\n<li>Caretaker (The object that keep the immutable state of mementos) - <code>AccountManager</code></li>\n<li>Client (The entry point of the application that will run the given scenario) - <code>App</code></li>\n</ol>\n<h3>\n  <a id="tip" class="anchor" aria-hidden="true" href="#tip">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Tip</h3><ul>\n<li>Not all states of the originator have to be saved to a memento object.</li>\n<li>To implement rollback or revert in the <code>AccountManager</code>, a <em>stack</em> could be used to keep track of the entire memento history.</li>\n<li><code>Account.deposit</code> or <code>Account.withdraw</code> could be created to change the <code>Account.balance</code></li>\n</ul>\n<h3>\n  <a id="solution" class="anchor" aria-hidden="true" href="#solution">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Solution</h3><p><a target="_blank" href="https://github.com/zhenyanghua/design-patterns/tree/master/MementoPatternExample/src/main/java"><i class="external alternate icon"></i> Account Manager Example</a></p>\n<h2>\n  <a id="questions-to-discuss" class="anchor" aria-hidden="true" href="#questions-to-discuss">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Questions to discuss</h2><ol>\n<li>What are the common use cases to apply a <strong>Memento Pattern</strong>?</li>\n<li>What are the similarities and differences of the <strong>Memento Pattern</strong> and the <a href="https://www.leafyjava.com/articles/behavioral-patterns-command-pattern-exercise"><strong>Command Pattern</strong></a>?</li>\n</ol>\n'}}/>
    </${t}>`}