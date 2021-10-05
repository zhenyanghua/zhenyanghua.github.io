import{y as t,m as e}from"../index.c4fa008e.js";import"./time.daaab1ba.js";import{P as n}from"./index.ce1f99a2.js";const a=[];export default function(){return t(()=>{a.forEach(t=>new Function(t)())},[]),e`<${n} ...${{title:"Spring @Transactional - Isolation Level",date:"2018-05-04 17:00:00"}} summary=${"<p>Spring <code>@Transactional</code> annotation is concise and powerful. To understand what&#39;s the best property setting for your use case in this annotation could be confusing if you don&#39;t clearly understand what transaction management key concepts are. In this series, we will talk about the key concepts in transaction management that could be configured through the <code>@Transactional</code> annotation. This article focuses on the isolation level and its side effects.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="what-is-isolation" class="anchor" aria-hidden="true" href="#what-is-isolation">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>What is Isolation</h2><p>Isolation defines the rules how one running transaction interacts with other concurrently running transactions. The higher the isolation level, the lower the concurrency is. In other words, the higher isolation level, the slower performance is. On the other hand, the lower isolation, the more side effects it comes with. To understand each isolation level and its side effects helps to find the right isolation for your specific use case.</p>\n<h2>\n  <a id="isolation-levels-and-its-side-effects" class="anchor" aria-hidden="true" href="#isolation-levels-and-its-side-effects">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Isolation Levels and Its Side Effects</h2><p>There are four isolation levels that are implemented by Spring, and they also represent the common isolation levels are needed for most application use cases.  From the most isolated to the least isolated, they are <code>SERIALIZABLE</code>, <code>REPEATABLE_READ</code>, <code>READ_COMMITTED</code>, <code>READ_UNCOMMITTED</code>.</p>\n<table>\n<thead>\n<tr>\n<th>Concurrency</th>\n<th>Isolcation Level</th>\n<th>SideEffects</th>\n<th>Consistency</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Lowest</td>\n<td><code>SERIALIZABLE</code></td>\n<td>None</td>\n<td>Highest</td>\n</tr>\n<tr>\n<td>Low</td>\n<td><code>REPEATABLE_READ</code></td>\n<td>Phantom Reads</td>\n<td>High</td>\n</tr>\n<tr>\n<td>High</td>\n<td><code>READ_COMMITTED</code></td>\n<td>Non-repeatable Reads, Phantom Reads</td>\n<td>Low</td>\n</tr>\n<tr>\n<td>Highest</td>\n<td><code>READ_UNCOMMITTED</code></td>\n<td>Dirty Reads, Non-repeatable Reads, Phantom Reads</td>\n<td>Lowest</td>\n</tr>\n</tbody></table>\n<h2>\n  <a id="terms-explained" class="anchor" aria-hidden="true" href="#terms-explained">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Terms Explained</h2><table>\n<thead>\n<tr>\n<th>Term</th>\n<th>Definition</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><code>SERIALIZABLE</code></td>\n<td>Complete Isolation - a transaction that is completely unaware of other concurrent transactions changes.</td>\n</tr>\n<tr>\n<td><code>REPEATABLE_READ</code></td>\n<td>A transaction is aware of any new rows that are inserted from other concurrent transactions. Reading such newly inserted row from other transactions in the current transaction is called a <em>phantom read</em>. By allowing reading only new reads guarantees any records can be repeatably read with consistency.</td>\n</tr>\n<tr>\n<td><code>READ_COMMITTED</code></td>\n<td>A transaction is aware of any changes that are committed in the database from other concurrent transactions. Reading the same row might return different data within the same transaction is called a <em>non-repeatable read</em>.</td>\n</tr>\n<tr>\n<td><code>READ_UNCOMMITTED</code></td>\n<td>No isolation at all - A transaction is aware of all changes that happen in other concurrent transactions. Reading records that could be rolled back from other concurrent transactions is called a <em>dirty read</em>. In other words, reading any tentative data is a form of <em>dirty read</em>.</td>\n</tr>\n</tbody></table>\n<h2>\n  <a id="the-syntax" class="anchor" aria-hidden="true" href="#the-syntax">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>The Syntax</h2><div class="codeblock">\n  <pre class="language-java"><span class="token annotation punctuation">@Transactional</span> <span class="token punctuation">(</span>isolation <span class="token operator">=</span> <span class="token class-name">Isolation</span><span class="token punctuation">.</span>READ_COMMITTED<span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">someServiceFacade</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// calling the repository layer.</span>\n<span class="token punctuation">}</span></pre>  \n</div><p>If the isolation property is not specified, the default isolation level of the underlying datastore will be used.</p>\n'}}/>
    </${n}>`}