import{m as e}from"../index.6bf80101.js";export default function(){return e`<div dangerouslySetInnerHTML=${{__html:'<h1 id="create-a-scope-limited-codeblock-web-component">Create a Scope limited Codeblock Web Component</h1>\n<h2 id="table-of-content">Table of Content</h2>\n<ul>\n<li><a href="#create-a-custom-element">Create a custom element</a></li>\n<li><a href="#lazy-loading-the-script">Lazy loading the script</a></li>\n<li><a href="#prism-manual-mode">Prism manual mode</a></li>\n<li><a href="#one-way-data-flow-and-mutation-observer">One way data flow and mutation observer</a></li>\n<li><a href="#conclusion">Conclusion</a></li>\n<li><a href="#known-limitations">Known limitations</a></li>\n</ul>\n<p>Recently I started with a personal <a href="https://zhenyanghua.github.io/">project portfolio website</a> and one of the challenges I had is to allow code highlighting. There are tools like Prism.js, Highlight.js that does the job if my goal is only to have one theme shown at the same time. On the page that needs syntax highlighting, the design is to have two different themes applied for different sections on the same page. With Prism.js, there isn&#39;t an out-of-box method loading two different theme stylesheet without style clashing. The problem could be abstracted to allow each loaded stylesheet has their own scope so they don&#39;t affect each other when shown on the same page.</p>\n<p>There are a few key points in this challenge:</p>\n<ul>\n<li>Each theming stylesheet share exactly the same name space and selector names.</li>\n<li>We should avoid intercepting the stylesheet source code and mutate it. They should be considered as black boxed code.</li>\n<li>We should reset the styles set by the theming sheets outside of the codeblock where the syntax highlighting logic is applied.</li>\n<li>Whenever code changes, we want the syntax highlight logic reapplied.</li>\n</ul>\n<p>With the above given key points, it seems creating a custom codeblock component may be able to allow us to attach some of the key points in the desired lifecycle, such as injecting the stylesheet. At this point, we may have <code>codeblock-a</code> with theme <code>a</code> stylesheet injected, and <code>codeblock-b</code> with theme <code>b</code> stylesheet injected, but it is not enough to keep the scope of each stylesheet within their container component. Hence, the latter loaded stylesheet will take the precedence of the styling. As a result, if the theme <code>b</code> stylesheet is done with loading after <code>a</code>, the <code>codeblock-a</code> will be painted with the styles defined in theme <code>b</code> stylesheet. Custom element allows us to attach additional behaviors and properties, but by itself, it doesn&#39;t provide any scope constraints. We need one more thing.</p>\n<p>Thanks to the matured web technology, we are able to use Shadow DOM to achieve something amazing natively on the web platform without writing any custom code. MDN defines the shadow DOM as:</p>\n<blockquote>\n<p>An important aspect of web components is encapsulation — being able to keep the <em>markup structure</em>, <em>style</em>, and <em>behavior</em> <strong>hidden</strong> and separate from other code on the page so that different parts do not clash, and the code can be kept nice and clean.</p>\n</blockquote>\n<p>This is exactly what we needed to make different theme stylesheet applied only within its container. Nothing comes in and nothing goes out.</p>\n<h2 id="create-a-custom-element">Create a custom element</h2>\n<p>The following code block defines a basic template where we start off defining a custom element called <code>&lt;codeblock-a&gt;</code> for theme <code>a</code>.  With shadow DOM, we are able to define any markup including <code>&lt;link&gt;</code> and <code>&lt;style&gt;</code> in the <code>template</code>. As seen, the external stylesheet <code>prism-a.css</code> is part of the template and the styles loaded within the shadow DOM will only apply to the markup that is defined in it, and it will not leak out of it. The <code>&lt;slot&gt;</code> element is used as a placeholder for  any light DOM to be attached to. Light DOM are not affected by the styles defined within the shadow DOM, because they don&#39;t exist in the shadow root, they are referenced by the <code>&lt;slot&gt;</code> element but existing only in the DOM. You may wonder how we could apply the theming style we just injected here in the shadow DOM to the light DOM, please read on, and a technique will be introduced :).</p>\n<pre><code class="language-js">const template = document.createElement(&#39;template&#39;);  \ntemplate.innerHTML = `\n    &lt;link rel=&quot;stylesheet&quot; href=&quot;/prism-a.css&quot; /&gt;\n    &lt;slot&gt;&lt;/slot&gt;\n`;</code></pre>\n<p>Then we create a shadow root by calling <code>attachShadow</code> method and assign the template to the shadow root. Finally we define the custom element with the name <code>codeblock-a</code> which could be used as <code>&lt;codeblock-a&gt;custom code&lt;/codeblock-a&gt;</code> in the DOM.</p>\n<pre><code class="language-js">customElements.define(&#39;codeblock-a&#39;, class extends HTMLElement {\n  constructor() {  \n    super();  \n    this.attachShadow({ mode: &#39;open&#39; })\n      .appendChild(template.content.cloneNode(true));  \n  }\n});</code></pre>\n<h2 id="lazy-loading-the-script">Lazy loading the script</h2>\n<p>There are different ways we could lazy load the <code>Prism.js</code>. Assuming we have the <code>Prism.js</code> existing in the root directory for demonstration purpose. The following code injected a <code>&lt;script&gt;</code> tag to the document head and return a promise when the <code>src</code> is loaded.</p>\n<pre><code class="language-js">function injectScript(url, async = true) {  \n  return new Promise((resolve, reject) =&gt; {  \n    const script = document.createElement(&#39;script&#39;);  \n    script.async = async;  \n    script.src = url;  \n    script.onload = resolve;  \n    script.onerror = reject;  \n    document.head.appendChild(script);  \n  });  \n}</code></pre>\n<h2 id="prism-manual-mode">Prism manual mode</h2>\n<p>In our custom element, as we lazy load the <code>Prism.js</code> to the global scope and the script once loaded will be immediately invoked by its IIFE (Immediately Invoked Function Expression) format. we do not want it to automatically transform any code wherever it finds them. We must set it to be manual before we inject the global script.</p>\n<pre><code class="language-js">// enter manual mode, it must be called before loading prism script  \nwindow.Prism = window.Prism || {};  \nPrism.manual = true;  \n\ninjectScript(&#39;/prism.js&#39;).then(() =&gt; {\n  // define templates and register the custom element here\n});</code></pre>\n<h2 id="one-way-data-flow-and-mutation-observer">One way data flow and mutation observer</h2>\n<p>Earlier we mentioned any styles injected in the shadow DOM don&#39;t apply to the light DOM referenced by the <code>&lt;slot&gt;</code> element. The approach I used here is to visually hide the light DOM referenced by the <code>&lt;slot&gt;</code> element and copy what&#39;s in there to a placeholder in the shadow DOM, so the styles defined in the shadow DOM could be applied to them. Another benefit of implementing this one way data flow is to allow us to subscribe to any changes from the light DOM and reapply the syntax highlighting logic to the copy in the shadow DOM.  Here we add a <code>&lt;div&gt;</code> as a placeholder for the light DOM copy in the shadow DOM template:</p>\n<pre><code class="language-js">template.innerHTML = `\n    &lt;link rel=&quot;stylesheet&quot; href=&quot;/prism-a.css&quot; /&gt;\n    &lt;div class=&quot;codeblock&quot;&gt;&lt;/div&gt;\n    &lt;slot&gt;&lt;/slot&gt;\n`;</code></pre>\n<p>Users must follow the rules defined by <code>Prism.js</code>,  this is an example how a user may use this custom element:</p>\n<pre><code class="language-html">&lt;codeblock-a&gt;\n  &lt;!-- additional overriding styles goes in the &lt;style&gt; tag --&gt;\n  &lt;style&gt;&lt;/style&gt;\n  &lt;pre&gt;\n    &lt;code class=&quot;lang-html&quot;&gt;custom HTML code&lt;/code&gt;\n    &lt;code class=&quot;lang-css&quot;&gt;custom CSS code&lt;/code&gt;\n  &lt;/pre&gt;\n&lt;/codeblock-a&gt;</code></pre>\n<p>To make sure when light DOM changes, our copy in the shadow DOM gets synced, we need to create a mutation observer and observe the changes to the what&#39;s referenced by the <code>&lt;slot&gt;</code> element.</p>\n<p>We could add another member method which governs syntax highlighting logics to the custom element class:</p>\n<pre><code class="language-js">highlight(slot) {  \n  // scoped stylesheet doesn&#39;t apply to the light dom, so we need to copy them back  \n  // to the shadow dom before prism generates them.  \n  const codeblock = this.shadowRoot.querySelector(&#39;.codeblock&#39;);  \n  // Clearing the child nodes\n  codeblock.innerHTML = &#39;&#39;;  \n  // copy from the light DOM\n  for(const node of slot.assignedNodes()) {  \n    codeblock.appendChild(node.cloneNode(true));  \n  }  \n  // apply the syntax highlighting logic.\n  for(const node of codeblock.childNodes) {  \n    if (node.nodeName === &#39;PRE&#39;) {  \n      Prism.highlightAllUnder(node);  \n    }  \n  }  \n}</code></pre>\n<p>To observe the changes to the light DOM, we need to overwrite the lifecycle method <code>connectedCallback</code> in our custom element:</p>\n<pre><code class="language-js">connectedCallback() {  \n  // select the slot from the shadow root\n  const slot = this.shadowRoot.querySelector(&#39;slot&#39;);\n  // slotchange event is triggered for the first time when it is registered.\n  slot.addEventListener(&#39;slotchange&#39;, () =&gt; {  \n    this.highlight(slot);\n    if (this.obs) {  \n      this.obs.disconnect();  \n    }  \n    // Define the observer\n    this.obs = new MutationObserver(((mutations) =&gt; {  \n      for (const mutation of mutations) {  \n        if (mutation.type === &#39;characterData&#39;) {  \n          this.highlight(slot);  \n        }  \n      }  \n    }));  \n    // Observe every node referenced by the slot\n    for (const node of slot.assignedNodes()) {  \n      if ([&#39;CODE&#39;, &#39;PRE&#39;].includes(node.nodeName.toUpperCase())) {  \n        this.obs.observe(node, {  \n          subtree: true,  \n          characterData: true  \n        });  \n      }  \n    }  \n  });\n}</code></pre>\n<p>To make sure no memory leaks when the custom element is removed from the DOM, we need to disconnect our observer in another lifecycle method <code>disconnectedCallback</code>:</p>\n<pre><code class="language-js">disconnectedCallback() {\n  // house keeping to prevent memory leaks.\n  if (this.obs) {  \n    this.obs.disconnect();  \n  }  \n}</code></pre>\n<h2 id="conclusion">Conclusion</h2>\n<p>This <code>codeblock</code> implementation uses a one way data flow, which hides the original user provided code from light DOM and build a scoped style codeblock in the shadow dom. It observes the changes from the light DOM and rebuild the shadow DOM copy. All styles logic is limited within the custom element.</p>\n<h2 id="known-limitations">Known limitations</h2>\n<p>Currently implementation is very naive -- it clears the shadow DOM placeholder and replace the entire content. One better approach could be to make a copy of the light DOM first in memory  and highlight the clone, then diff it with the one in the shadow DOM and swap only the part that is different. This may reduce the flash between render, even though currently it is hard to observe the flash.</p>\n'}}/>`}