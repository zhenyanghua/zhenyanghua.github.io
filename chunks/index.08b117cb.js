import{y as t,m as a}from"../index.47083415.js";import"./time.daaab1ba.js";import{P as n}from"./index.85b18556.js";const e=[];export default function(){return t(()=>{e.forEach(t=>new Function(t)())},[]),a`<${n} ...${{title:"Spring @Transactional - Propagation Type",date:"2018-05-08 17:00:00"}} summary=${"<p>Spring <code>@Transactional</code> annotation is concise and powerful. To understand what&#39;s the best property setting for your use case in this annotation could be confusing if you don&#39;t clearly understand what transaction management key concepts are. In this series, we will talk about the key concepts in transaction management that could be configured through the <code>@Transactional</code> annotation. This article focuses on the propagation type.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="what-is-propagation" class="anchor" aria-hidden="true" href="#what-is-propagation">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>What is Propagation</h2><p>Propagation describes the transactional behavior from the client when a transactional method is called. In Spring-managed transactions, there are two types of transactions -- physical and logical transactions. The physical transaction is always the outer transaction while the logical transaction is the inner transaction that is mapped to the physical transaction based on the propagation type as the transaction propagates.</p>\n<h2>\n  <a id="propagation-types" class="anchor" aria-hidden="true" href="#propagation-types">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Propagation Types</h2><p>There are seven types of propagation that we could use for the propagation property, among which only <code>REQUIRED</code>, <code>REQUIRED_NEW</code>, and <code>NESTED</code> types guarantee a transaction will be started, so the <a href="https://leafyjava.com/articles/spring-transactional-isolation-level">isolation level</a> property will be ignored if the propagation type is not one of these three types.</p>\n<table>\n<thead>\n<tr>\n<th>Type</th>\n<th>Definition</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><code>REQUIRED</code></td>\n<td>Use the current transaction, create a new transaction and use it if no transaction exists.</td>\n</tr>\n<tr>\n<td><code>REQUIRED_NEW</code></td>\n<td>Always create a new transaction, and suspend the current transaction if it exists.</td>\n</tr>\n<tr>\n<td><code>NESTED</code></td>\n<td>Execute the transaction within a current transaction if a current transaction exists, otherwise create a new transaction and use it.</td>\n</tr>\n<tr>\n<td><code>SUPPORTS</code></td>\n<td>Use the current transaction if it exists, otherwise execute the transaction non-transactionally.</td>\n</tr>\n<tr>\n<td><code>NOT_SUPPORTED</code></td>\n<td>Execute the transaction non-transactionally, suspend the current transaction if it exists.</td>\n</tr>\n<tr>\n<td><code>MANDATORY</code></td>\n<td>Use the current transaction, throw an exception if no transaction exists.</td>\n</tr>\n<tr>\n<td><code>NEVER</code></td>\n<td>Execute the transaction non-transactionally, throw an exception if a transaction exists.</td>\n</tr>\n</tbody></table>\n<h2>\n  <a id="the-syntax" class="anchor" aria-hidden="true" href="#the-syntax">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>The Syntax</h2><div class="codeblock">\n  <pre class="language-java"><span class="token annotation punctuation">@Transactional</span> <span class="token punctuation">(</span>propagation <span class="token operator">=</span> <span class="token class-name">Propagation</span><span class="token punctuation">.</span>SUPPORTS<span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">someServiceFacade</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// calling the repository layer.</span>\n<span class="token punctuation">}</span></pre>  \n</div><p>If the propagation property is not specified, the default will be <code>REQUIRED</code>.</p>\n'}}/>
    </${n}>`}