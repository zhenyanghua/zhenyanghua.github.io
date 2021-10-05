import{y as n,m as s}from"../index.6f4abcf7.js";import"./time.daaab1ba.js";import{P as a}from"./index.59436597.js";const t=[];export default function(){return n(()=>{t.forEach(n=>new Function(n)())},[]),s`<${a} ...${{title:"Java Servlet CORS Filter with  Preflight  Options",date:"2018-04-26T17:00:00.000Z"}} summary=${"<p>A CORS filter determines what types of access control header will be set for the server response to the client&#39;s request.  However, when the resource being accessed is behind a security layer, in order to send the payload to the security filters, an optional request by browsers is sent to the server before the actual request. This lesson presents one implementation of a CORS filter that supports preflight options request.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="story" class="anchor" aria-hidden="true" href="#story">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Story</h2><p>The following code is an implementation of a CORS filter that just works fine without a security layer.</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SimpleCorsFilter</span> <span class="token keyword">implements</span> <span class="token class-name">Filter</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">FilterConfig</span> filterConfig<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doFilter</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">ServletRequest</span> request<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">ServletResponse</span> response<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">FilterChain</span> chain<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>\n        <span class="token class-name">HttpServletResponse</span> resp <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">)</span> response<span class="token punctuation">;</span>\n        <span class="token class-name">HttpServletRequest</span> req <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span><span class="token punctuation">)</span> request<span class="token punctuation">;</span>\n        resp<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"Access-Control-Allow-Origin"</span><span class="token punctuation">,</span> <span class="token string">"*"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        resp<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"Access-Control-Allow-Methods"</span><span class="token punctuation">,</span> <span class="token string">"*"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        resp<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"Access-Control-Max-Age"</span><span class="token punctuation">,</span> <span class="token string">"3600"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        resp<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"Access-Control-Allow-Headers"</span><span class="token punctuation">,</span> <span class="token string">"x-requested-with, authorization, Content-Type, Authorization, credential, X-XSRF-TOKEN"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></pre>  \n</div><p>However, to use this filter with secured resources, the preflight check will raise a <strong>401 Unauthorized</strong> error in the browser. That is because the prelight <code>OPTIONS</code> request doesn&#39;t have any authorization header with it to be sent to the server.</p>\n<h2>\n  <a id="solution" class="anchor" aria-hidden="true" href="#solution">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Solution</h2><p>Intercept the preflight <code>OPTIONS</code> response and set the response as a 2XX status code.</p>\n<div class="codeblock">\n  <pre class="language-java">    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doFilter</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">ServletRequest</span> request<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">ServletResponse</span> response<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">FilterChain</span> chain<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>\n      <span class="token comment">// set headers.. omitted for brevity</span>\n\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"OPTIONS"</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            resp<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">.</span>SC_OK<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n            chain<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span></pre>  \n</div><h2>\n  <a id="lesson-learnt" class="anchor" aria-hidden="true" href="#lesson-learnt">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Lesson Learnt</h2><ul>\n<li><code>OPTIONS</code> preflight check could be intercepted and set a success status code back to the client to proceed with the actual request.</li>\n</ul>\n'}}/>
    </${a}>`}