import{y as n,m as a}from"../index.688002ef.js";import"./time.daaab1ba.js";import{P as s}from"./index.eeec6ed7.js";const e=[];export default function(){return n(()=>{e.forEach(n=>new Function(n)())},[]),a`<${s} ...${{title:"Entity Mapping with Inheritance in Hibernate",date:"2018-10-10T17:00:00.000Z"}} summary=${"<p>Inheritance could be enabled in Hibernate with the <code>@MappedSuperclass</code> annotation. This annotation could greatly reduce the boilerplate in our entity mapping.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="story" class="anchor" aria-hidden="true" href="#story">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Story</h2><p>Using inheritance to map a <strong>paper-book</strong> and <strong>audio-book</strong> type of data.</p>\n<h2>\n  <a id="solution" class="anchor" aria-hidden="true" href="#solution">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Solution</h2><p>The following Resource class uses <code>@MappedSuperclass</code> annotation to abstract the shared properties into a superclass that represents a resource that could be extended by all concrete resources. In this case, we also make the resource generic so that each the primary key property <code>id</code> could be flexible with the type of its subclass.</p>\n<p>By using the <code>@MappedSuperclass</code> instead of the <code>@Entity</code> annotation on the superclass, it tells Hibernate to create these superclass properties in each of the respective subclass tables in the database.</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token annotation punctuation">@MappedSuperclass</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Resource</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> AUTO<span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">T</span> id<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>length<span class="token operator">=</span><span class="token number">255</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>\n\n    <span class="token comment">// getters and setters are omitted for brevity</span>\n<span class="token punctuation">}</span>\n\n<span class="token annotation punctuation">@Entity</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PaperBook</span> <span class="token keyword">extends</span> <span class="token class-name">Resource</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>\n        \n    <span class="token comment">// getters and setters are omitted for brevity</span>\n<span class="token punctuation">}</span>\n\n<span class="token annotation punctuation">@Entity</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AudioBook</span> <span class="token keyword">extends</span> <span class="token class-name">Resource</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> toldBy<span class="token punctuation">;</span>\n\n    <span class="token comment">// getters and setters are omitted for brevity</span>\n<span class="token punctuation">}</span>\n\n<span class="token annotation punctuation">@Entity</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Dvd</span> <span class="token keyword">extends</span> <span class="token class-name">Resource</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> director<span class="token punctuation">;</span>\n\n    <span class="token comment">// getters and setters are omitted for brevity</span>\n<span class="token punctuation">}</span></pre>  \n</div><h2>\n  <a id="lesson-learnt" class="anchor" aria-hidden="true" href="#lesson-learnt">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Lesson Learnt</h2><ul>\n<li><code>@MappedSuperclass</code> annotation could be used on superclass to enable inheritance in entity mapping.</li>\n</ul>\n'}}/>
    </${s}>`}