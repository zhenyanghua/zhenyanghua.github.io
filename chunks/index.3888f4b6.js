import{y as n,m as s}from"../index.f6270dfa.js";import"./time.daaab1ba.js";import{P as a}from"./index.c0a132ba.js";const t=[];export default function(){return n(()=>{t.forEach(n=>new Function(n)())},[]),s`<${a} ...${{title:"Handle Non-encoded Request URL",date:"2018-10-14T17:00:00.000Z"}} summary=${"<p>Normally we need to encode the request URL from the client before sending a request to the server, but there may be just one time that you really can&#39;t enforce the client to encode their request URL and sometimes it contains special characters that will make the server mark them as illegal characters in the request. This article shows an example of how to use a filter to preprocess the request on the server side.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="bad-url" class="anchor" aria-hidden="true" href="#bad-url">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Bad URL</h2><p>If you copy and paste the following URL that takes an query parameter as <code>input</code> and the value as <code>{&quot;inputInfo&quot;:{&quot;inputText&quot;:&quot;5.00%&quot;}} </code> - a JSON literal that contains a special character <code>%</code>. Your server will most likely complain and throw an exception on this illegal character.</p>\n<div class="codeblock">\n  <pre> http://localhost:8090/extract?input={&quot;inputInfo&quot;:{&quot;inputText&quot;:&quot;5.00%&quot;}} </pre>\n</div><h2>\n  <a id="what-could-be-done-to-solve-this-problem-from-the-server-side-" class="anchor" aria-hidden="true" href="#what-could-be-done-to-solve-this-problem-from-the-server-side-">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>What could be done to solve this problem from the server side?</h2><ul>\n<li>use Spring preprocessor bean to preprocess the request</li>\n<li>use Spring AspectJ to preprocess the request</li>\n<li>use Spring servlet filter to preprocess the request</li>\n</ul>\n<p>With any of the above cross-cutting strategies, you could encode the request URL and pass back to the endpoint.</p>\n<h2>\n  <a id="example" class="anchor" aria-hidden="true" href="#example">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Example</h2><p>Below is one implementation using Filter. You could possibly do some caching there if you need better performance.</p>\n<p>The key points are:</p>\n<ol>\n<li><code>HttpServletRequest</code> is immutable, we must use the wrapper type <code>HttpServletRequestWrapper</code> to create a <code>HttpServletRequest</code> object and pass down to the filter chain.</li>\n<li>The special characters need to be manually escaped in the new <code>HttpServletRequest</code> object.</li>\n<li>Apply proper caching strategies to reduce the heavy computations (this is not implemented here).</li>\n</ol>\n<div class="codeblock">\n  <pre class="language-java"><span class="token annotation punctuation">@Component</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SomeFilter</span> <span class="token keyword">implements</span> <span class="token class-name">Filter</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> LOGGER <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">SomeFilter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">FilterConfig</span> filterConfig<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>\n\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doFilter</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">ServletRequest</span> servletRequest<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">ServletResponse</span> servletResponse<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">FilterChain</span> filterChain<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>\n        <span class="token class-name">HttpServletRequest</span> request <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span><span class="token punctuation">)</span> servletRequest<span class="token punctuation">;</span>\n        <span class="token class-name">HttpServletRequest</span> modifiedRequest <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SomeHttpServletRequest</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        filterChain<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>modifiedRequest<span class="token punctuation">,</span> servletResponse<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">class</span> <span class="token class-name">SomeHttpServletRequest</span> <span class="token keyword">extends</span> <span class="token class-name">HttpServletRequestWrapper</span> <span class="token punctuation">{</span>\n        <span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">;</span>\n\n        <span class="token class-name">SomeHttpServletRequest</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">super</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>request <span class="token operator">=</span> request<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token annotation punctuation">@Override</span>\n        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getQueryString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">String</span> queryString <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getQueryString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            LOGGER<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"Original query string: "</span> <span class="token operator">+</span> queryString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            <span class="token keyword">try</span> <span class="token punctuation">{</span>\n                <span class="token comment">// You need to escape all your non encoded special characters here</span>\n                <span class="token class-name">String</span> specialChar <span class="token operator">=</span> <span class="token class-name">URLEncoder</span><span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span><span class="token string">"%"</span><span class="token punctuation">,</span> <span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                queryString <span class="token operator">=</span> queryString<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">"\\%\\%"</span><span class="token punctuation">,</span> specialChar <span class="token operator">+</span> <span class="token string">"%"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n                <span class="token class-name">String</span> decoded <span class="token operator">=</span> <span class="token class-name">URLDecoder</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>queryString<span class="token punctuation">,</span> <span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                LOGGER<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"Modified query string: "</span>  <span class="token operator">+</span> decoded<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">UnsupportedEncodingException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n\n            <span class="token keyword">return</span> queryString<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token annotation punctuation">@Override</span>\n        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> params <span class="token operator">=</span> <span class="token function">getParameterMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">return</span> params<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">?</span> params<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token annotation punctuation">@Override</span>\n        <span class="token keyword">public</span> <span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span> <span class="token function">getParameterMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">String</span> queryString <span class="token operator">=</span> <span class="token function">getQueryString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token function">getParamsFromQueryString</span><span class="token punctuation">(</span>queryString<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token annotation punctuation">@Override</span>\n        <span class="token keyword">public</span> <span class="token class-name">Enumeration</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">getParameterNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">enumeration</span><span class="token punctuation">(</span><span class="token function">getParameterMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token annotation punctuation">@Override</span>\n        <span class="token keyword">public</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getParameterValues</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token function">getParameterMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">private</span> <span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span> <span class="token function">getParamsFromQueryString</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> queryString<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">String</span> decoded <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>\n            <span class="token keyword">try</span> <span class="token punctuation">{</span>\n                decoded <span class="token operator">=</span> <span class="token class-name">URLDecoder</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>queryString<span class="token punctuation">,</span> <span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">UnsupportedEncodingException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n            <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> params <span class="token operator">=</span> decoded<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">"&amp;"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span><span class="token punctuation">></span></span> collect <span class="token operator">=</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>x <span class="token operator">-></span> x<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">"="</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">groupingBy</span><span class="token punctuation">(</span>\n                    x <span class="token operator">-></span> x<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n                    <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">mapping</span><span class="token punctuation">(</span>\n                        x <span class="token operator">-></span> x<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">1</span> <span class="token operator">?</span> x<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>\n                        <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            <span class="token class-name">Map</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span> result <span class="token operator">=</span> collect<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toMap</span><span class="token punctuation">(</span>\n                    x <span class="token operator">-></span> x<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n                    x <span class="token operator">-></span> x<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n                        <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n                        <span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></pre>  \n</div>'}}/>
    </${a}>`}