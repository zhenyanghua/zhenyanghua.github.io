import{y as e,m as a}from"../index.ce75b6c8.js";import"./time.daaab1ba.js";import{P as i}from"./index.c4bffac6.js";const t=[];export default function(){return e(()=>{t.forEach(e=>new Function(e)())},[]),a`<${i} ...${{title:"Behavioral Patterns - Chain of Responsibility Pattern Exercise",date:"2018-05-18T17:00:00.000Z"}} summary=${"<p>The Chain of Responsibility Pattern is very useful to avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. Chain the receiving objects and pass the request along with the chain until an object handles it. We will implement a naïve security filter chain using this pattern in our practice exercise. You will certainly enjoy this exercise as it is a great way to get you totally master this pattern.</p>"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="reading-materials" class="anchor" aria-hidden="true" href="#reading-materials">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Reading Materials</h2><ol>\n<li><a target="_blank" href="https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern"><i class="external alternate icon"></i> https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern</a> (15 minutes reading)</li>\n</ol>\n<h2>\n  <a id="practice-materials" class="anchor" aria-hidden="true" href="#practice-materials">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Practice Materials</h2><ol>\n<li>Use chain of responsibility pattern to create a naive security filter chain that will check the following responsibilities in order:<blockquote>\n<ol>\n<li>If any endpoint matches the request</li>\n</ol>\n<ul>\n<li><em>False</em> - return <em>Not Found</em></li>\n</ul>\n<ol start="2">\n<li>If the endpoint has any security rules</li>\n</ol>\n<ul>\n<li><em>False</em> - return <em>Resource</em></li>\n</ul>\n<ol start="3">\n<li>If the request contains any authorization header</li>\n</ol>\n<ul>\n<li><em>False</em> - return <em>Unauthorized request</em></li>\n</ul>\n<ol start="4">\n<li>If the authorization is approved</li>\n</ol>\n<ul>\n<li><em>False</em> - return <em>Invalid authorization</em></li>\n</ul>\n<ol start="5">\n<li>return <em>Resource</em></li>\n</ol>\n</blockquote>\n</li>\n</ol>\n<h3>\n  <a id="components" class="anchor" aria-hidden="true" href="#components">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Components</h3><ul>\n<li>Handler (Interface for handling requests)</li>\n<li>ConcreteHandler (Handle the request it is the responsibility for or forwards it to its successor)</li>\n<li>Client (Initiate the request to a ConcreteHandler object on any part of the chain, in this example, it should start from the the first filter)</li>\n</ul>\n<h3>\n  <a id="tips" class="anchor" aria-hidden="true" href="#tips">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Tips</h3><ul>\n<li>you may create a Helper class to handle some conditional logic</li>\n</ul>\n<h3>\n  <a id="solution" class="anchor" aria-hidden="true" href="#solution">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Solution</h3><p><a target="_blank" href="https://github.com/zhenyanghua/design-patterns/tree/master/ChainOfResponsibilityPatternExample/src/main/java"><i class="external alternate icon"></i> Naive Security Chain Example</a></p>\n<h2>\n  <a id="questions-to-discuss" class="anchor" aria-hidden="true" href="#questions-to-discuss">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Questions to discuss</h2><ol>\n<li>What are the common use cases to apply a <strong>Chain of Responsibility</strong>?</li>\n<li>What features are there in the application when you see that you should apply the <strong>Chain of Responsibility</strong> pattern?</li>\n</ol>\n'}}/>
    </${i}>`}