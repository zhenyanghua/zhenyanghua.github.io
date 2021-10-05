import{y as n,m as s}from"../index.18ce2ea7.js";import"./time.daaab1ba.js";import{P as a}from"./index.1cb917ba.js";const e=[];export default function(){return n(()=>{e.forEach(n=>new Function(n)())},[]),s`<${a} ...${{title:"Locale and Resource Bundles",date:"2018-08-26T17:00:00.000Z"}} summary=${"<p>Resource bundles allow you to move locale-specific information out from your main source code to a properties file or a java class. In this article, we will introduce the usage of both implementations of the <code>ResourceBundle</code> interface -- <code>PropertyResourceBundle</code> and <code>ListResourceBundle</code> class.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h1>\n  <a id="using-a-properties-file" class="anchor" aria-hidden="true" href="#using-a-properties-file">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Using a Properties File</h1><p><code>PropertyResourceBundle</code> takes an <code>InputStream</code>, so you could point it to a properties file for where the locale-specific information is.</p>\n<p>A locale properties file must have the extension of <strong>.properties</strong>, and optionally suffixed with <strong>_language</strong> or <strong>_language_COUNTRY</strong>. e.g. <strong>Labels_zh.properties</strong>, <strong>Labels_zh_CN.properties</strong>, <strong>Foo_fr_CA.properties</strong>, <strong>Foo_de.properties</strong>, <strong>Foo.properties</strong> are all legal locale properties files. The <code>ResourceBundle</code> always searches from the most specific properties first and will stop search when there is a match.</p>\n<p>A locale properties file just looks like a normal properties file, e.g. <strong>Labels_en_US.properties</strong></p>\n<div class="codeblock">\n  <pre>greetings=How you doing?</pre>\n</div><p>while <strong>Labels_en_UK.properties</strong> might be:</p>\n<div class="codeblock">\n  <pre>greetings=How do you do?</pre>\n</div><h1>\n  <a id="using-a-java-class" class="anchor" aria-hidden="true" href="#using-a-java-class">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Using a Java Class</h1><p>You could extend the <code>ListResourceBundle</code> abstract class and override the abstract method <code>Object[][] getContents()</code> to returns an array of key-value pairs.  Because the return type is an array of array objects, that means the value in the key-value pair could be of any type. The class name is similar to the locale properties file name other than instead of <code>.properties</code> it uses <code>.java</code> as the extension. e.g. <code>Labels_fr_CA.java</code> is a legal name for this use, and the class might look like this:</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ListResourceBundle</span><span class="token punctuation">;</span>\n\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Labels_en_CA</span> <span class="token keyword">extends</span> <span class="token class-name">ListResourceBundle</span> <span class="token punctuation">{</span>\n  <span class="token annotation punctuation">@Override</span>\n  <span class="token keyword">protected</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getContents</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>\n      <span class="token punctuation">{</span><span class="token string">"hello"</span><span class="token punctuation">,</span> <span class="token string">"Bonjour"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span><span class="token string">"thank"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">"merci"</span><span class="token punctuation">)</span><span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></pre>  \n</div><h1>\n  <a id="using-the-code-resourcebundle-code-" class="anchor" aria-hidden="true" href="#using-the-code-resourcebundle-code-">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Using the <code>ResourceBundle</code></h1><p>There are three steps to follow to use the <code>ResourceBundle</code> with <code>Locale</code>.</p>\n<ol>\n<li>Create/get a <code>Locale</code> object;</li>\n<li>Calling a static method to get the resource bundle with the locale object.</li>\n<li>get locale-specific information from the bundle.</li>\n</ol>\n<h2>\n  <a id="example" class="anchor" aria-hidden="true" href="#example">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Example</h2><p>Labels_en.properties</p>\n<div class="codeblock">\n  <pre>thank=Thank you</pre>\n</div><p>Labels_en_UK.properties</p>\n<div class="codeblock">\n  <pre>greeting=How do you do</pre>\n</div><p>Labels_en_UK.java</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ListResourceBundle</span><span class="token punctuation">;</span>\n\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Labels_en_UK</span> <span class="token keyword">extends</span> <span class="token class-name">ListResourceBundle</span> <span class="token punctuation">{</span>\n  <span class="token annotation punctuation">@Override</span>\n  <span class="token keyword">protected</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getContents</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>\n      <span class="token punctuation">{</span><span class="token string">"elevator"</span><span class="token punctuation">,</span> <span class="token string">"lift"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span><span class="token string">"apartment"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">"flat"</span><span class="token punctuation">)</span><span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></pre>  \n</div><p>LocaleLanguge.java</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Locale</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ResourceBundle</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">LocaleLanguage</span> <span class="token punctuation">{</span>\n  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\n    <span class="token class-name">Locale</span> loc <span class="token operator">=</span> args<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">?</span> \n      <span class="token keyword">new</span> <span class="token class-name">Locale</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Locale</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">ResourceBundle</span> rb <span class="token operator">=</span> <span class="token class-name">ResourceBundle</span><span class="token punctuation">.</span><span class="token function">getBundle</span><span class="token punctuation">(</span><span class="token string">"Labels"</span><span class="token punctuation">,</span> loc<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>rb<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token string">"apartment"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>rb<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">"elevator"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>rb<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">"greeting"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>rb<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">"thank"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</pre>  \n</div><p>When invoked with <code>java LocaleLanguage</code>, the output follows:</p>\n<div class="codeblock">\n  <pre>flat\nlift\nHow do you do\nThank you</pre>\n</div><p>The key things here are:</p>\n<ol>\n<li>The <code>ResourceBundle</code> will search resources by their hierarchy. Begins with the most specific locale. The rules give an inheritance of the locale information from its less specific ones within its hierarchy.</li>\n<li>The <code>ResourceBundle</code> will prefer <code>.java</code> over <code>.properties</code> resources within the same hierarchy.</li>\n<li>When the key searched could not return any resources, a <code>java.util.MissingResourceException</code> is thrown.</li>\n</ol>\n'}}/>
    </${a}>`}