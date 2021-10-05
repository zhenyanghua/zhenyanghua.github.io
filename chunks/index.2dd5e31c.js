import{y as e,m as n}from"../index.b73720be.js";import"./time.daaab1ba.js";import{P as t}from"./index.61b923c9.js";const s=[];export default function(){return e(()=>{s.forEach(e=>new Function(e)())},[]),n`<${t} ...${{title:"Serialize Timestamp To EpochSecond with Jackson",date:"2018-11-09 17:00:00"}} summary=${"<p>Some REST API only takes a <code>long</code> as its Date field, such as <code>esriFieldTypeDate</code> from ArcGIS Server Rest API. But with the rich functionality, the Java 8 time API provides, it would be silly to use <code>long</code> as the type for our object modeling. This tip shows how to solve this problem.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<p>I started with using <code>LocalDateTime</code> as the type of the timestamp field I want to use`, but Jackson simply serialize it as it does with any other fields, but what I really want is to serialize it to the epoch second.</p>\n<p>Jackson does provide a new library that supports the JSR 310 which is the date and time API. to use that dependency, we need to add the following to maven:</p>\n<div class="codeblock">\n  <pre>&lt;dependency&gt;\n    &lt;groupId&gt;com.fasterxml.jackson.datatype&lt;/groupId&gt;\n    &lt;artifactId&gt;jackson-datatype-jsr310&lt;/artifactId&gt;\n&lt;/dependency&gt;</pre>\n</div><p>At this point, the job is not done yet. The <code>LocalDateTime</code> is not an option because it takes a timezone information to convert to the epoch second, unless we provide it, otherwise, we should use the <code>Instant</code> type instead. The <code>Instant</code> class provides the epoch second and the nanosecond of that second. We need to disable the nanosecond from the serialization process so we could get the epoch second.</p>\n<p>The following will do the job by using the new Jackson jsr310 dependency we added and disabling the nanosecond in the serialization process.</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token class-name">ObjectMapper</span> mapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">registerModule</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">JavaTimeModule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token class-name">SerializationFeature</span><span class="token punctuation">.</span>WRITE_DATE_TIMESTAMPS_AS_NANOSECONDS<span class="token punctuation">)</span><span class="token punctuation">;</span></pre>  \n</div>'}}/>
    </${t}>`}