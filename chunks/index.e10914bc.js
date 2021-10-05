import{y as e,m as a}from"../index.6293eeed.js";import"./time.daaab1ba.js";import{P as n}from"./index.d13a98df.js";const t=[];export default function(){return e(()=>{t.forEach(e=>new Function(e)())},[]),a`<${n} ...${{title:"Pass Parameters to the ExecutiveService Adapter",date:"2018-11-06 17:00:00"}} summary=${"<p>This tip shows how to pass pipeline input variables to an <code>ExecutiveService</code> adapter in webMethods.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<p>The <code>ExecutiveService</code> adapter is used to execute a java service which utilizes the connection from the Integration Server managed connection pool to execute custom SQL statements. The adapter service input include an <code>Object</code> type <code>targetServiceInput</code>. This actually is a IS <code>document</code> type based on my experiment.</p>\n<p>To properly send pipeline variables to the wrapped java service, a wrapper document type needs to be created in a map service to map to the <code>targetServiceInput</code> object in the adapter service and then any properties under this document, will be available to access from the wrapper java service by doing the following:</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token class-name">IDataMap</span> idm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IDataMap</span><span class="token punctuation">(</span>pipeline<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">String</span> foo <span class="token operator">=</span> idm<span class="token punctuation">.</span><span class="token function">getAsString</span><span class="token punctuation">(</span><span class="token string">"bar"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></pre>  \n</div><p>This java service has an input of <code>bar</code> defined in its <em>Input</em> tab.</p>\n'}}/>
    </${n}>`}