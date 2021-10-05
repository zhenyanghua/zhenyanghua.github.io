import{y as n,m as a}from"../index.9ec869e6.js";import"./time.daaab1ba.js";import{P as s}from"./index.a45df760.js";const t=[];export default function(){return n(()=>{t.forEach(n=>new Function(n)())},[]),a`<${s} ...${{title:"Spring Data Substitutes ObjectMapper",date:"2018-04-27 17:00:00"}} summary=${"<p>Most times when we need a DTO mapping from our persistent entity, we would think of using an ObjectMapper. However, with the help of the Spring Data, you might not need an ObjectMapper. This lesson presents a solution to use Spring Data to replace simple ObjectMapper use case.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="story" class="anchor" aria-hidden="true" href="#story">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Story</h2><p>Given a <code>Book</code> class and one of it&#39;s DTO class <code>BookMeta</code> as shown below, create a repository method that retrieve all <code>BookMeta</code> by category.</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token annotation punctuation">@Entity</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> category<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> intro<span class="token punctuation">;</span>\n\n    <span class="token comment">// getter and setters are ommitted for brevity</span>\n<span class="token punctuation">}</span>\n\n<span class="token annotation punctuation">@Entity</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookMeta</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">BookMeta</span><span class="token punctuation">(</span><span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token class-name">String</span> author<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>title <span class="token operator">=</span> title<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>author <span class="token operator">=</span> author<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// getter and setters are ommitted for brevity</span>\n<span class="token punctuation">}</span></pre>  \n</div><h2>\n  <a id="solution" class="anchor" aria-hidden="true" href="#solution">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Solution</h2><p>As part of JPA, JPQL now supports <strong>constructor expressions</strong>. What we could do is to <code>new</code> a full-classpath-constructor in the named query.</p>\n<div class="codeblock">\n  <pre class="language-java">\n<span class="token annotation punctuation">@Repository</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BookRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span><span class="token string">"SELECT new com.leafyjava.domains.dtos.BookMeta(b.title, b.author) FROM Book b WHERE b.category = :category"</span><span class="token punctuation">)</span>\n    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BookMeta</span><span class="token punctuation">></span></span> <span class="token function">findAllMetaByCategory</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"category"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> category<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></pre>  \n</div><h2>\n  <a id="lesson-learnt" class="anchor" aria-hidden="true" href="#lesson-learnt">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Lesson Learnt</h2><ul>\n<li>DTO class full classpath must be used in the <code>@Query</code> annotation</li>\n<li>Use <code>@Param</code> to set query parameters.</li>\n</ul>\n'}}/>
    </${s}>`}