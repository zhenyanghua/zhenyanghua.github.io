import{y as n,m as a}from"../index.e3c2eb62.js";import"./time.daaab1ba.js";import{P as s}from"./index.20501ca3.js";const t=[];export default function(){return n(()=>{t.forEach(n=>new Function(n)())},[]),a`<${s} ...${{title:"IE Won't Set Cookie",date:"2018-11-13T17:00:00.000Z"}} summary=${"<p>This article shares a different behavior in IE than Chrome when expecting to set a cookie.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<p>I have a client app that using javascript to set the cookie for URL: <a href="http://localhost/login">http://localhost/login</a></p>\n<p>The code looks like this:</p>\n<div class="codeblock">\n  <pre class="language-javascript"><span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token string">"_s="</span> <span class="token operator">+</span> sessionId <span class="token operator">+</span> <span class="token string">";path=\'/\';max-age=36000"</span><span class="token punctuation">;</span>\ndocument<span class="token punctuation">.</span>cookie <span class="token operator">=</span> c<span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"c"</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Cookie"</span><span class="token punctuation">,</span> document<span class="token punctuation">.</span>cookie<span class="token punctuation">)</span><span class="token punctuation">;</span></pre>  \n</div><p>In chrome, it prints out:</p>\n<div class="codeblock">\n  <pre>c _s=1b022d51-00c3-4a40-a105-35c638986354;path=&#39;/&#39;;max-age=36000\nCookie _s=1b022d51-00c3-4a40-a105-35c638986354</pre>\n</div><p>But in IE (11 or edge 17)</p>\n<p>It prints out:</p>\n<div class="codeblock">\n  <pre>c _s=1b022d51-00c3-4a40-a105-35c638986354;path=&#39;/&#39;;max-age=36000\nCookie </pre>\n</div><p>I have enabled setting cookie option in the internet option, but still got nothing back after setting the cookie.</p>\n<p>It turns out IE doesn&#39;t like the quotes around the <code>path</code> option, while other browsers aren&#39;t that picky.</p>\n<p>Remove the quote resolves the problem.</p>\n'}}/>
    </${s}>`}