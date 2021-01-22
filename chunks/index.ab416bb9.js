import{y as n,m as s}from"../index.6ab6836d.js";import"./time.daaab1ba.js";import{P as a}from"./index.90d55320.js";const t=[];export default function(){return n(()=>{t.forEach(n=>new Function(n)())},[]),s`<${a} ...${{title:"Create a Scope limited Codeblock Web Component",date:"2020-12-30T17:00:00.000Z"}} summary=${"<p>Modern web platform allows us to write custom elements and with the assistance of shadow DOM,\nwe are able to ensure the style and behavior of the custom elements are consistent and no external styles\nor behaviors are propagated in or leaked out. This post walks through some keypoints by creating a scope\nlimited codeblock element.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="table-of-content" class="anchor" aria-hidden="true" href="#table-of-content">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Table of Content</h2><ul>\n<li><a href="#create-a-custom-element">Create a custom element</a></li>\n<li><a href="#lazy-loading-the-script">Lazy loading the script</a></li>\n<li><a href="#prism-manual-mode">Prism manual mode</a></li>\n<li><a href="#one-way-data-flow-and-mutation-observer">One way data flow and mutation observer</a></li>\n<li><a href="#conclusion">Conclusion</a></li>\n<li><a href="#known-limitations">Known limitations</a></li>\n</ul>\n<p>Recently I started with a personal <a href="https://zhenyanghua.github.io/">project portfolio website</a> and one of the challenges I had is to allow code highlighting. There are tools like Prism.js, Highlight.js that does the job if my goal is only to have one theme shown at the same time. On the page that needs syntax highlighting, the design is to have two different themes applied for different sections on the same page. With Prism.js, there isn&#39;t an out-of-box method loading two different theme stylesheet without style clashing. The problem could be abstracted to allow each loaded stylesheet has their own scope so they don&#39;t affect each other when shown on the same page.</p>\n<p>There are a few key points in this challenge:</p>\n<ul>\n<li>Each theming stylesheet share exactly the same name space and selector names.</li>\n<li>We should avoid intercepting the stylesheet source code and mutate it. They should be considered as black boxed code.</li>\n<li>We should reset the styles set by the theming sheets outside of the codeblock where the syntax highlighting logic is applied.</li>\n<li>Whenever code changes, we want the syntax highlight logic reapplied.</li>\n</ul>\n<p>With the above given key points, it seems creating a custom codeblock component may be able to allow us to attach some of the key points in the desired lifecycle, such as injecting the stylesheet. At this point, we may have <code>codeblock-a</code> with theme <code>a</code> stylesheet injected, and <code>codeblock-b</code> with theme <code>b</code> stylesheet injected, but it is not enough to keep the scope of each stylesheet within their container component. Hence, the latter loaded stylesheet will take the precedence of the styling. As a result, if the theme <code>b</code> stylesheet is done with loading after <code>a</code>, the <code>codeblock-a</code> will be painted with the styles defined in theme <code>b</code> stylesheet. Custom element allows us to attach additional behaviors and properties, but by itself, it doesn&#39;t provide any scope constraints. We need one more thing.</p>\n<p>Thanks to the matured web technology, we are able to use Shadow DOM to achieve something amazing natively on the web platform without writing any custom code. MDN defines the shadow DOM as:</p>\n<blockquote>\n<p>An important aspect of web components is encapsulation — being able to keep the <em>markup structure</em>, <em>style</em>, and <em>behavior</em> <strong>hidden</strong> and separate from other code on the page so that different parts do not clash, and the code can be kept nice and clean.</p>\n</blockquote>\n<p>This is exactly what we needed to make different theme stylesheet applied only within its container. Nothing comes in and nothing goes out.</p>\n<h2>\n  <a id="create-a-custom-element" class="anchor" aria-hidden="true" href="#create-a-custom-element">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Create a custom element</h2><p>The following code block defines a basic template where we start off defining a custom element called <code>&lt;codeblock-a&gt;</code> for theme <code>a</code>.  With shadow DOM, we are able to define any markup including <code>&lt;link&gt;</code> and <code>&lt;style&gt;</code> in the <code>template</code>. As seen, the external stylesheet <code>prism-a.css</code> is part of the template and the styles loaded within the shadow DOM will only apply to the markup that is defined in it, and it will not leak out of it. The <code>&lt;slot&gt;</code> element is used as a placeholder for  any light DOM to be attached to. Light DOM are not affected by the styles defined within the shadow DOM, because they don&#39;t exist in the shadow root, they are referenced by the <code>&lt;slot&gt;</code> element but existing only in the DOM. You may wonder how we could apply the theming style we just injected here in the shadow DOM to the light DOM, please read on, and a technique will be introduced :).</p>\n<div class="codeblock">\n  <pre class="language-js"><span class="token keyword">const</span> template <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">\'template\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  \ntemplate<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">\n    &lt;link rel="stylesheet" href="/prism-a.css" />\n    &lt;slot>&lt;/slot>\n</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span></pre>  \n</div><p>Then we create a shadow root by calling <code>attachShadow</code> method and assign the template to the shadow root. Finally we define the custom element with the name <code>codeblock-a</code> which could be used as <code>&lt;codeblock-a&gt;custom code&lt;/codeblock-a&gt;</code> in the DOM.</p>\n<div class="codeblock">\n  <pre class="language-js">customElements<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">\'codeblock-a\'</span><span class="token punctuation">,</span> <span class="token keyword">class</span> <span class="token class-name">extends</span> HTMLElement <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  \n    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  \n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">attachShadow</span><span class="token punctuation">(</span><span class="token punctuation">{</span> mode<span class="token operator">:</span> <span class="token string">\'open\'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span>content<span class="token punctuation">.</span><span class="token function">cloneNode</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  \n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></pre>  \n</div><h2>\n  <a id="lazy-loading-the-script" class="anchor" aria-hidden="true" href="#lazy-loading-the-script">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Lazy loading the script</h2><p>There are different ways we could lazy load the <code>Prism.js</code>. Assuming we have the <code>Prism.js</code> existing in the root directory for demonstration purpose. The following code injected a <code>&lt;script&gt;</code> tag to the document head and return a promise when the <code>src</code> is loaded.</p>\n<div class="codeblock">\n  <pre class="language-js"><span class="token keyword">function</span> <span class="token function">injectScript</span><span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span> async <span class="token operator">=</span> <span class="token boolean">true</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  \n  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>  \n    <span class="token keyword">const</span> script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">\'script\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  \n    script<span class="token punctuation">.</span>async <span class="token operator">=</span> async<span class="token punctuation">;</span>  \n    script<span class="token punctuation">.</span>src <span class="token operator">=</span> url<span class="token punctuation">;</span>  \n    script<span class="token punctuation">.</span>onload <span class="token operator">=</span> resolve<span class="token punctuation">;</span>  \n    script<span class="token punctuation">.</span>onerror <span class="token operator">=</span> reject<span class="token punctuation">;</span>  \n    document<span class="token punctuation">.</span>head<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span><span class="token punctuation">;</span>  \n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  \n<span class="token punctuation">}</span></pre>  \n</div><h2>\n  <a id="prism-manual-mode" class="anchor" aria-hidden="true" href="#prism-manual-mode">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Prism manual mode</h2><p>In our custom element, as we lazy load the <code>Prism.js</code> to the global scope and the script once loaded will be immediately invoked by its IIFE (Immediately Invoked Function Expression) format. we do not want it to automatically transform any code wherever it finds them. We must set it to be manual before we inject the global script.</p>\n<div class="codeblock">\n  <pre class="language-js"><span class="token comment">// enter manual mode, it must be called before loading prism script  </span>\nwindow<span class="token punctuation">.</span>Prism <span class="token operator">=</span> window<span class="token punctuation">.</span>Prism <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>  \nPrism<span class="token punctuation">.</span>manual <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>  \n\n<span class="token function">injectScript</span><span class="token punctuation">(</span><span class="token string">\'/prism.js\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token comment">// define templates and register the custom element here</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></pre>  \n</div><h2>\n  <a id="one-way-data-flow-and-mutation-observer" class="anchor" aria-hidden="true" href="#one-way-data-flow-and-mutation-observer">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>One way data flow and mutation observer</h2><p>Earlier we mentioned any styles injected in the shadow DOM don&#39;t apply to the light DOM referenced by the <code>&lt;slot&gt;</code> element. The approach I used here is to visually hide the light DOM referenced by the <code>&lt;slot&gt;</code> element and copy what&#39;s in there to a placeholder in the shadow DOM, so the styles defined in the shadow DOM could be applied to them. Another benefit of implementing this one way data flow is to allow us to subscribe to any changes from the light DOM and reapply the syntax highlighting logic to the copy in the shadow DOM.  Here we add a <code>&lt;div&gt;</code> as a placeholder for the light DOM copy in the shadow DOM template:</p>\n<div class="codeblock">\n  <pre class="language-js">template<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">\n    &lt;link rel="stylesheet" href="/prism-a.css" />\n    &lt;div class="codeblock">&lt;/div>\n    &lt;slot>&lt;/slot>\n</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span></pre>  \n</div><p>Users must follow the rules defined by <code>Prism.js</code>,  this is an example how a user may use this custom element:</p>\n<div class="codeblock">\n  <pre class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>codeblock-a</span><span class="token punctuation">></span></span>\n  <span class="token comment">&lt;!-- additional overriding styles goes in the &lt;style> tag --\x3e</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pre</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>lang-html<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>custom HTML code<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>lang-css<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>custom CSS code<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pre</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>codeblock-a</span><span class="token punctuation">></span></span></pre>  \n</div><p>To make sure when light DOM changes, our copy in the shadow DOM gets synced, we need to create a mutation observer and observe the changes to the what&#39;s referenced by the <code>&lt;slot&gt;</code> element.</p>\n<p>We could add another member method which governs syntax highlighting logics to the custom element class:</p>\n<div class="codeblock">\n  <pre class="language-js"><span class="token function">highlight</span><span class="token punctuation">(</span><span class="token parameter">slot</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  \n  <span class="token comment">// scoped stylesheet doesn\'t apply to the light dom, so we need to copy them back  </span>\n  <span class="token comment">// to the shadow dom before prism generates them.  </span>\n  <span class="token keyword">const</span> codeblock <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>shadowRoot<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">\'.codeblock\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  \n  <span class="token comment">// Clearing the child nodes</span>\n  codeblock<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">\'\'</span><span class="token punctuation">;</span>  \n  <span class="token comment">// copy from the light DOM</span>\n  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> node <span class="token keyword">of</span> slot<span class="token punctuation">.</span><span class="token function">assignedNodes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  \n    codeblock<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span><span class="token function">cloneNode</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  \n  <span class="token punctuation">}</span>  \n  <span class="token comment">// apply the syntax highlighting logic.</span>\n  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> node <span class="token keyword">of</span> codeblock<span class="token punctuation">.</span>childNodes<span class="token punctuation">)</span> <span class="token punctuation">{</span>  \n    <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>nodeName <span class="token operator">===</span> <span class="token string">\'PRE\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  \n      Prism<span class="token punctuation">.</span><span class="token function">highlightAllUnder</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>  \n    <span class="token punctuation">}</span>  \n  <span class="token punctuation">}</span>  \n<span class="token punctuation">}</span></pre>  \n</div><p>To observe the changes to the light DOM, we need to overwrite the lifecycle method <code>connectedCallback</code> in our custom element:</p>\n<div class="codeblock">\n  <pre class="language-js"><span class="token function">connectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  \n  <span class="token comment">// select the slot from the shadow root</span>\n  <span class="token keyword">const</span> slot <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>shadowRoot<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">\'slot\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token comment">// slotchange event is triggered for the first time when it is registered.</span>\n  slot<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">\'slotchange\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>  \n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">highlight</span><span class="token punctuation">(</span>slot<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>obs<span class="token punctuation">)</span> <span class="token punctuation">{</span>  \n      <span class="token keyword">this</span><span class="token punctuation">.</span>obs<span class="token punctuation">.</span><span class="token function">disconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  \n    <span class="token punctuation">}</span>  \n    <span class="token comment">// Define the observer</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>obs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">mutations</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>  \n      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> mutation <span class="token keyword">of</span> mutations<span class="token punctuation">)</span> <span class="token punctuation">{</span>  \n        <span class="token keyword">if</span> <span class="token punctuation">(</span>mutation<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">\'characterData\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  \n          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">highlight</span><span class="token punctuation">(</span>slot<span class="token punctuation">)</span><span class="token punctuation">;</span>  \n        <span class="token punctuation">}</span>  \n      <span class="token punctuation">}</span>  \n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  \n    <span class="token comment">// Observe every node referenced by the slot</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> node <span class="token keyword">of</span> slot<span class="token punctuation">.</span><span class="token function">assignedNodes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  \n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'CODE\'</span><span class="token punctuation">,</span> <span class="token string">\'PRE\'</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>nodeName<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  \n        <span class="token keyword">this</span><span class="token punctuation">.</span>obs<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token punctuation">{</span>  \n          subtree<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>  \n          characterData<span class="token operator">:</span> <span class="token boolean">true</span>  \n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  \n      <span class="token punctuation">}</span>  \n    <span class="token punctuation">}</span>  \n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></pre>  \n</div><p>To make sure no memory leaks when the custom element is removed from the DOM, we need to disconnect our observer in another lifecycle method <code>disconnectedCallback</code>:</p>\n<div class="codeblock">\n  <pre class="language-js"><span class="token function">disconnectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// house keeping to prevent memory leaks.</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>obs<span class="token punctuation">)</span> <span class="token punctuation">{</span>  \n    <span class="token keyword">this</span><span class="token punctuation">.</span>obs<span class="token punctuation">.</span><span class="token function">disconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  \n  <span class="token punctuation">}</span>  \n<span class="token punctuation">}</span></pre>  \n</div><h2>\n  <a id="conclusion" class="anchor" aria-hidden="true" href="#conclusion">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Conclusion</h2><p>This <code>codeblock</code> implementation uses a one way data flow, which hides the original user provided code from light DOM and build a scoped style codeblock in the shadow dom. It observes the changes from the light DOM and rebuild the shadow DOM copy. All styles logic is limited within the custom element.</p>\n<h2>\n  <a id="known-limitations" class="anchor" aria-hidden="true" href="#known-limitations">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Known limitations</h2><p>Currently implementation is naive -- it clears the shadow DOM placeholder and replace the entire content. One better approach could be to make a copy of the light DOM first in memory  and highlight the clone, then diff it with the one in the shadow DOM and swap only the part that is different. This may reduce the flash between render, even though currently it is hard to observe the flash.</p>\n'}}/>
    </${a}>`}