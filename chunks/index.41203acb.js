import{y as n,m as a}from"../index.64a0bda3.js";import"./time.daaab1ba.js";import{P as s}from"./index.5794fc23.js";const t=[];export default function(){return n(()=>{t.forEach(n=>new Function(n)())},[]),a`<${s} ...${{title:"Batch Patterns in WebMethods",date:"2018-10-10T17:00:00.000Z"}} summary=${"<p>Having been working with WebMethods Integration Platform from Software AG for about a year now on a large integration project with many vendor components such as SAP, CityWorks, ArcGIS Server, from knowing nothing about WebMethods to building reliable and robust integration services, following established patterns is inescapable. However, the access to the proprietary software WebMethods and its documentation is limited to the public, we found a hard time to find the best practice for our batch operations. This article shows some patterns we learnt and tested with confidence that you might find helpful in your development with WebMethods.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="case-study" class="anchor" aria-hidden="true" href="#case-study">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Case Study</h2><p>Our client has some flat files that need to be load into the database of a vendor application nightly. Every day the data in the flat files are updated so the next day the vendor application must reflect the latest changes. The Vendor application will not have any data updates during the night the batch operation is running.</p>\n<h2>\n  <a id="key-points" class="anchor" aria-hidden="true" href="#key-points">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Key points</h2><ul>\n<li>The integration runs nightly.</li>\n<li>The vendor application&#39;s database may involve complex schema that we may hard to identify to load the data directly through any stored procedures.</li>\n<li>The vendor application comes with limited REST API that works with some of the data columns in the flat file which we could use for persistence.</li>\n<li>Any failed operations need to be automatically retried up to a given times after a delay.</li>\n<li>The entire batch operation needs to be done in an efficient way so that server cluster has enough time left to run other batch operations on the same night.</li>\n<li>No messages should be lost.</li>\n</ul>\n<h2>\n  <a id="challenges" class="anchor" aria-hidden="true" href="#challenges">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Challenges</h2><ol>\n<li>Knowing the flat file contains thousands of records, and the list is guaranteed to grow every day, we might experience a bottleneck when the server resource is limited.</li>\n<li>When a single HTTP request failed, and the main thread is going to be retried. We don&#39;t want the previously persisted records to be retried.</li>\n<li>The vendor application&#39;s API doesn&#39;t provide any pagination in the request. This becomes a major network io problem when we request thousands of records from the database using their API.</li>\n</ol>\n<h2>\n  <a id="our-solution" class="anchor" aria-hidden="true" href="#our-solution">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Our solution</h2><h3>\n  <a id="challenge-1-2" class="anchor" aria-hidden="true" href="#challenge-1-2">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Challenge 1, 2</h3><p>There are two steps of this batch operation -</p>\n<ol>\n<li>read nightly data from the database and compare with the flat file to find out the records to be updated and added.</li>\n<li>persist the found records.</li>\n</ol>\n<p>When there are transient errors happening in step 1, we have to retry the entire batch operation because everything else depends on the result of this step. WebMethods provides <strong>Top Level Service Retry</strong> feature through the properties view of a top level service and triggers. We could tune that setting to meet our tolerated retry times and interval. In addition, a resource monitoring service could be added to support additional behavior for the top level service.</p>\n<p>After step 1 gathers the updated records, we iterate through the collection and for each of the record, we send the records data through JMS to our JMS server. Triggers are used to register our handlers to our JMS destinations. However, when a top-level service or its sub-services failed from any exceptions, a trigger failure will be raised which causes the message to be lost if selecting the auto-acknowledgment setting. There are two options here to avoid a message loss. If leaving the default auto-acknowledgment on, the exceptions must be caught and rethrown as an <code>ISRuntimeException</code> or call the <code>throwExceptionForRetry</code> service. The other option is to cooperate with the code to use client-acknowledgment. In our case, we&#39;d like it to be retried when there are any transient errors happening, so we rethrow exceptions to the <code>ISRuntimeException</code>, which guarantee the message persist in the pipeline and provides the way to retry single records independently instead of retry all records.</p>\n<h3>\n  <a id="challenge-3" class="anchor" aria-hidden="true" href="#challenge-3">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Challenge 3</h3><p>We investigated the vendor database&#39;s schema to find all the related tables that the out-of-box querying endpoint does and we created our own paginated endpoint that query records from the database.</p>\n<p>It may not be straightforward to do it in WebMethods, a custom java service <code>getAll()</code> needs to be wrapped a single <code>getPage()</code> service. We created a flow service that calls our API endpoint to get a single page and then a java service to recursively call our paginated endpoint for the rest of the data.</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">getAll</span><span class="token punctuation">(</span><span class="token class-name">IData</span> pipeline<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServiceException</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token class-name">IDataMap</span> in <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IDataMap</span><span class="token punctuation">(</span>pipeline<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">int</span> pageSize <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>in<span class="token punctuation">.</span><span class="token function">getAsString</span><span class="token punctuation">(</span><span class="token string">"pageSize"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">String</span> retryCount <span class="token operator">=</span> in<span class="token punctuation">.</span><span class="token function">getAsString</span><span class="token punctuation">(</span><span class="token string">"retryCount"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">String</span> maxRetryCount <span class="token operator">=</span> in<span class="token punctuation">.</span><span class="token function">getAsString</span><span class="token punctuation">(</span><span class="token string">"maxRetryCount"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        \n        <span class="token comment">// create hashtable</span>\n        <span class="token class-name">Object</span> hashtable <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IDataMap</span><span class="token punctuation">(</span><span class="token class-name">Service</span><span class="token punctuation">.</span><span class="token function">doInvoke</span><span class="token punctuation">(</span> <span class="token string">"pub.hashtable"</span><span class="token punctuation">,</span> <span class="token string">"createHashtable"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">IDataMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getIData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"hashtable"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        \n        <span class="token function">getPage</span><span class="token punctuation">(</span>pageSize<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> hashtable<span class="token punctuation">,</span> retryCount<span class="token punctuation">,</span> maxRetryCount<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        \n        in<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"hashtable"</span><span class="token punctuation">,</span> hashtable<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        \n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ISRuntimeException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>    \n<span class="token punctuation">}</span>\n    \n<span class="token comment">// --- &lt;&lt;IS-BEGIN-SHARED-SOURCE-AREA>> ---</span>\n\n<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">getPage</span><span class="token punctuation">(</span><span class="token keyword">int</span> pageSize<span class="token punctuation">,</span> <span class="token keyword">int</span> pageNumber<span class="token punctuation">,</span> <span class="token class-name">Object</span> hashtableForAll<span class="token punctuation">,</span> <span class="token class-name">String</span> retryCount<span class="token punctuation">,</span> <span class="token class-name">String</span> maxRetryCount<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    <span class="token class-name">IDataMap</span> in <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IDataMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    in<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"pageSize"</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>pageSize<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    in<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"pageNumber"</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>pageNumber<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    in<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"retryCount"</span><span class="token punctuation">,</span> retryCount<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    in<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"maxRetryCount"</span><span class="token punctuation">,</span> maxRetryCount<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    \n    <span class="token class-name">IDataMap</span> out <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IDataMap</span><span class="token punctuation">(</span>\n            <span class="token class-name">Service</span><span class="token punctuation">.</span><span class="token function">doInvoke</span><span class="token punctuation">(</span><span class="token string">"record.repositories"</span><span class="token punctuation">,</span> <span class="token string">"getPage"</span><span class="token punctuation">,</span> in<span class="token punctuation">.</span><span class="token function">getIData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    \n    <span class="token class-name">Object</span> hashtable <span class="token operator">=</span> out<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"hashtable"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    \n    <span class="token comment">// size - if 0, return;</span>\n    <span class="token class-name">IDataMap</span> hashtableIn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IDataMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    hashtableIn<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"hashtable"</span><span class="token punctuation">,</span> hashtable<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">int</span> size <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">IDataMap</span><span class="token punctuation">(</span>\n            <span class="token class-name">Service</span><span class="token punctuation">.</span><span class="token function">doInvoke</span><span class="token punctuation">(</span> <span class="token string">"pub.hashtable"</span><span class="token punctuation">,</span> <span class="token string">"size"</span><span class="token punctuation">,</span> hashtableIn<span class="token punctuation">.</span><span class="token function">getIData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">getAsString</span><span class="token punctuation">(</span><span class="token string">"size"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>size <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// listKeys</span>\n    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keys <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IDataMap</span><span class="token punctuation">(</span><span class="token class-name">Service</span><span class="token punctuation">.</span><span class="token function">doInvoke</span><span class="token punctuation">(</span> <span class="token string">"pub.hashtable"</span><span class="token punctuation">,</span> <span class="token string">"listKeys"</span><span class="token punctuation">,</span> hashtableIn<span class="token punctuation">.</span><span class="token function">getIData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">getAsStringArray</span><span class="token punctuation">(</span><span class="token string">"keys"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    \n    <span class="token comment">// loop keys</span>\n    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token operator">:</span> keys<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// put key/value</span>\n        <span class="token class-name">IDataMap</span> getIn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IDataMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        getIn<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"key"</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        getIn<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"hashtable"</span><span class="token punctuation">,</span> hashtable<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Object</span> value <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IDataMap</span><span class="token punctuation">(</span><span class="token class-name">Service</span><span class="token punctuation">.</span><span class="token function">doInvoke</span><span class="token punctuation">(</span> <span class="token string">"pub.hashtable"</span><span class="token punctuation">,</span> <span class="token string">"get"</span><span class="token punctuation">,</span> getIn<span class="token punctuation">.</span><span class="token function">getIData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"value"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        \n        <span class="token class-name">IDataMap</span> putIn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IDataMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        putIn<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"key"</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        putIn<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"hashtable"</span><span class="token punctuation">,</span> hashtableForAll<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        putIn<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"value"</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Service</span><span class="token punctuation">.</span><span class="token function">doInvoke</span><span class="token punctuation">(</span><span class="token string">"pub.hashtable"</span><span class="token punctuation">,</span> <span class="token string">"put"</span><span class="token punctuation">,</span> putIn<span class="token punctuation">.</span><span class="token function">getIData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    \n    <span class="token comment">// do next page</span>\n    <span class="token function">getPage</span><span class="token punctuation">(</span>pageSize<span class="token punctuation">,</span> <span class="token operator">++</span>pageNumber<span class="token punctuation">,</span> hashtableForAll<span class="token punctuation">,</span> retryCount<span class="token punctuation">,</span> maxRetryCount<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    \n<span class="token punctuation">}</span></pre>  \n</div><h2>\n  <a id="other-thoughts" class="anchor" aria-hidden="true" href="#other-thoughts">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Other thoughts</h2><ul>\n<li><p>WebMethods provides a list of the common clients could be used to talk to another component in a certain protocol, but these clients are not safe by itself. A <a href="/articles/exception-handling-in-webmethods">Try-Catch</a> style flow service need to be wrapped around the out-of-box clients to make them robust and reliable in enterprise integrations.</p>\n</li>\n<li><p>We still couldn&#39;t find a way to externally configure the properties view through the global variables, this could be very useful to match the configuration settings for retries on <code>Repeat</code> and <code>Retry</code>. </p>\n</li>\n</ul>\n'}}/>
    </${s}>`}