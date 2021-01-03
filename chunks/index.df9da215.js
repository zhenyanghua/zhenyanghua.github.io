import{m as n}from"../index.38ef91ca.js";import"./time.daaab1ba.js";import{P as a}from"./index.8a0fdf57.js";export default function(){return n`<${a} ...${{title:"IE Won't Set Cookie",date:"2018-11-13T17:00:00.000Z"}}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="this-article-shares-a-different-behavior-in-ie-than-chrome-when-expecting-to-set-a-cookie-" class="anchor" aria-hidden="true" href="#this-article-shares-a-different-behavior-in-ie-than-chrome-when-expecting-to-set-a-cookie-">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>This article shares a different behavior in IE than Chrome when expecting to set a cookie.</h2><p>I have a client app that using javascript to set the cookie for URL: <a href="http://localhost/login">http://localhost/login</a></p>\n<p>The code looks like this:</p>\n<div class="codeblock">\n  <pre class="language-javascript"><span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token string">"_s="</span> <span class="token operator">+</span> sessionId <span class="token operator">+</span> <span class="token string">";path=\'/\';max-age=36000"</span><span class="token punctuation">;</span>\ndocument<span class="token punctuation">.</span>cookie <span class="token operator">=</span> c<span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"c"</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Cookie"</span><span class="token punctuation">,</span> document<span class="token punctuation">.</span>cookie<span class="token punctuation">)</span><span class="token punctuation">;</span></pre>  \n</pre><p>In chrome, it prints out:</p>\n<div class="codeblock">\n  <pre>c _s=1b022d51-00c3-4a40-a105-35c638986354;path=&#39;/&#39;;max-age=36000\nCookie _s=1b022d51-00c3-4a40-a105-35c638986354</pre>\n</div><p>But in IE (11 or edge 17)</p>\n<p>It prints out:</p>\n<div class="codeblock">\n  <pre>c _s=1b022d51-00c3-4a40-a105-35c638986354;path=&#39;/&#39;;max-age=36000\nCookie </pre>\n</div><p>I have enabled setting cookie option in the internet option, but still got nothing back after setting the cookie.</p>\n<p>It turns out IE doesn&#39;t like the quotes around the <code>path</code> option, while other browsers aren&#39;t that picky.</p>\n<p>Remove the quote resolves the problem.</p>\n'}}/>
    </${a}>`}