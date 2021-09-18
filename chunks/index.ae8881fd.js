import{y as n,m as a}from"../index.f7d07a73.js";import"./time.daaab1ba.js";import{P as s}from"./index.35fd9aa6.js";const t=[];export default function(){return n(()=>{t.forEach(n=>new Function(n)())},[]),a`<${s} ...${{title:"Spring Data Repository Query Precedence Tricks",date:"2018-10-10 17:00:00"}} summary=${"<p>Spring Data repository method is very handy but it also comes with its limitation, especially when composed with condition precedence. This article shows one way to work with it and its caveats.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="use-case" class="anchor" aria-hidden="true" href="#use-case">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Use Case</h2><p>Given the following type:</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token annotation punctuation">@Entity</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> edition<span class="token punctuation">;</span>\n\n    <span class="token comment">// Getters and Setters ...</span>\n<span class="token punctuation">}</span></pre>  \n</div><h3>\n  <a id="1-check-if-there-is-any-book-whose-title-or-edition-matches-the-specified-" class="anchor" aria-hidden="true" href="#1-check-if-there-is-any-book-whose-title-or-edition-matches-the-specified-">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>1. check if there is any book whose title or edition matches the specified.</h3><p>This one is easy to come up with. We could simply use the keyword <code>Or</code> to compose the query:</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token keyword">boolean</span> <span class="token function">existsByTitleOrEdition</span><span class="token punctuation">(</span><span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token class-name">String</span> edition<span class="token punctuation">)</span><span class="token punctuation">;</span></pre>  \n</div><h3>\n  <a id="2-check-if-there-is-any-book-whose-title-or-edition-matches-the-specified-and-is-not-itself-" class="anchor" aria-hidden="true" href="#2-check-if-there-is-any-book-whose-title-or-edition-matches-the-specified-and-is-not-itself-">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>2. check if there is any book whose title or edition matches the specified and is not itself.</h3><p>This one looks just as easy as the first one, we could have just added another condition and compose with the keyword <code>And</code>:</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token keyword">boolean</span> <span class="token function">existsByTitleOrEditionAndIdIsNot</span><span class="token punctuation">(</span>\n    <span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token class-name">String</span> edition<span class="token punctuation">,</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span></pre>  \n</div><p>Is that so?</p>\n<p>When this method name is translated to SQL, it reads surprisingly as</p>\n<blockquote>\n<p>test if any book whose title matches the specified\n                     or\n(edition matches the specified and is not itself)</p>\n</blockquote>\n<p>What is the problem?</p>\n<p>The problem is Spring data repository methods doesn&#39;t support precedence with parenthesis. That is why it only honors its default precedence when building the query.</p>\n<h4>\n  <a id="solution-1" class="anchor" aria-hidden="true" href="#solution-1">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Solution 1</h4><p>We could just not use the repository method to build the query, but instead using the <code>@Query</code> or <code>@NamedQuery</code> to build the query with <strong>JPQL</strong>:</p>\n<div class="codeblock">\n  <pre class="language-java">    <span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span><span class="token string">"SELECT CASE WHEN (COUNT(b) > 0) then true else false end FROM Book a"</span>\n        <span class="token operator">+</span> <span class="token string">" WHERE b.id &lt;> :id AND (b.title = :title OR b.edition = :edition)"</span><span class="token punctuation">)</span>\n    <span class="token keyword">boolean</span> <span class="token function">existsByTitleOrEditionWithIdIsNot</span><span class="token punctuation">(</span>\n        <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">,</span> \n        <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"title"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> title<span class="token punctuation">,</span> \n        <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"edition"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> edition<span class="token punctuation">)</span><span class="token punctuation">;</span></pre>  \n</div><h4>\n  <a id="solution-2" class="anchor" aria-hidden="true" href="#solution-2">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Solution 2</h4><p>We know that <code>(A or B) and C  &lt;==&gt; (A and C) or (B and C)</code> is true. We could compose the repository method with an extra duplicated or condition to make it work.</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token keyword">boolean</span> <span class="token function">existsByTitleAndIdIsNotOrEditionAndIdIsNot</span><span class="token punctuation">(</span>\n    <span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token class-name">Long</span> id1<span class="token punctuation">,</span> <span class="token class-name">String</span> edition<span class="token punctuation">,</span> <span class="token class-name">Long</span> id2<span class="token punctuation">)</span><span class="token punctuation">;</span></pre>  \n</div><h4>\n  <a id="caveats" class="anchor" aria-hidden="true" href="#caveats">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Caveats</h4><p>This trick can build queries with precedence without writing any JPQL, but it comes at the cost of verbose -- not just in long and hard to read method name, but also in the method arguments -- notice that the same <code>id</code> is expressed twice with two different method local variable names.</p>\n<h3>\n  <a id="source-code" class="anchor" aria-hidden="true" href="#source-code">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Source Code</h3><div class="codeblock">\n  <pre class="language-java"><span class="token annotation punctuation">@Entity</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> edition<span class="token punctuation">;</span>\n\n    <span class="token comment">// Getters and Setters ...</span>\n<span class="token punctuation">}</span>\n\n<span class="token annotation punctuation">@Repository</span>\n<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BookRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>\n    <span class="token comment">// A or B</span>\n    <span class="token comment">// test if any book whose title or edition matches the specified</span>\n    <span class="token keyword">boolean</span> <span class="token function">existsByTitleOrEdition</span><span class="token punctuation">(</span><span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token class-name">String</span> edition<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    \n    <span class="token comment">// A or (B and C)</span>\n    <span class="token comment">// test if any book whose </span>\n    <span class="token comment">//    title matches the specified or </span>\n    <span class="token comment">//    (edition matches the specified and is not itself)</span>\n    <span class="token keyword">boolean</span> <span class="token function">existsByTitleOrEditionAndIdIsNot</span><span class="token punctuation">(</span>\n        <span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token class-name">String</span> edition<span class="token punctuation">,</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// Solution 1</span>\n    <span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span><span class="token string">"SELECT CASE WHEN (COUNT(b) > 0) then true else false end FROM Book a"</span>\n        <span class="token operator">+</span> <span class="token string">" WHERE b.id &lt;> :id AND (b.title = :title OR b.edition = :edition)"</span><span class="token punctuation">)</span>\n    <span class="token keyword">boolean</span> <span class="token function">existsByTitleOrEditionWithIdIsNot</span><span class="token punctuation">(</span>\n        <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">,</span> \n        <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"title"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> title<span class="token punctuation">,</span> \n        <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"edition"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> edition<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// Solution 2</span>\n    <span class="token comment">// (A or B) and C &lt;==> (A and C) or (B and C)</span>\n    <span class="token comment">// test if any book whose </span>\n    <span class="token comment">//     (title matches the specified and is not itself) or </span>\n    <span class="token comment">//     (edition matches the specified and is not itself)</span>\n    <span class="token keyword">boolean</span> <span class="token function">existsByTitleAndIdIsNotOrEditionAndIdIsNot</span><span class="token punctuation">(</span>\n        <span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token class-name">Long</span> id1<span class="token punctuation">,</span> <span class="token class-name">String</span> edition<span class="token punctuation">,</span> <span class="token class-name">Long</span> id2<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></pre>  \n</div><h2>\n  <a id="useful-readings" class="anchor" aria-hidden="true" href="#useful-readings">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Useful Readings</h2><ul>\n<li><a href="https://docs.spring.io/spring-data/jpa/docs/2.1.0.RELEASE/reference/html/#repository-query-keywords" target="_blank">Spring Repository query keywords</a></li>\n<li><a href="https://www.baeldung.com/spring-data-jpa-query" target="_blank">Spring Data JPA @Query</a></li>\n</ul>\n'}}/>
    </${s}>`}