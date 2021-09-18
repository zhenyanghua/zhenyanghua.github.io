import{y as e,m as n}from"../index.724c24a9.js";import"./time.daaab1ba.js";import{P as t}from"./index.7a27df18.js";const i=[];export default function(){return e(()=>{i.forEach(e=>new Function(e)())},[]),n`<${t} ...${{title:"Dependency Injection and Inversion of Control",date:"2018-04-29T17:00:00.000Z"}} summary=${"<p>We often mix the Dependency Injection (DI) with the Inversion of Control (IoC). In fact, DI is one form of IoC. This article clarifies the terms.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="dependency-injection-di-" class="anchor" aria-hidden="true" href="#dependency-injection-di-">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Dependency Injection (DI)</h2><p>Classes that employ dependency injection specify the objects that they interact with through constructor, interface, or setters.</p>\n<h2>\n  <a id="inversion-of-control-ioc-" class="anchor" aria-hidden="true" href="#inversion-of-control-ioc-">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Inversion of Control (IoC)</h2><p>Object location or instantiation is removed as a responsibility for a caller class and instead left to a container that manages this tier of logic. The control of objects instantiation is inverted from the object caller class to the container.</p>\n<h2>\n  <a id="relationship" class="anchor" aria-hidden="true" href="#relationship">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Relationship</h2><p>Dependency Injection is one form of the broader technique of Inversion of Control. The client delegates the responsibility of providing its dependencies to external code (the injector). The client is not allowed to call the injector code. It is the injecting code that constructs the services and calls the client to inject them.</p>\n<p>The client does not need to know:</p>\n<ul>\n<li>about injecting code.</li>\n<li>how to construct the services.</li>\n<li>which actual services it is using.</li>\n</ul>\n<p>The client only needs to know about the intrinsic interfaces of the services because these define how the client may use the services. This separates the responsibilities of use and construction.</p>\n<h2>\n  <a id="lesson-learnt" class="anchor" aria-hidden="true" href="#lesson-learnt">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Lesson Learnt</h2><ul>\n<li>Dependency Injection is one form of Inversion of Control.</li>\n</ul>\n'}}/>
    </${t}>`}