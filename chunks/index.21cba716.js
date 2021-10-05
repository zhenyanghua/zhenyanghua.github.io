import{y as n,m as s}from"../index.f703b492.js";import"./time.daaab1ba.js";import{P as a}from"./index.49d5fc1a.js";const t=[];export default function(){return n(()=>{t.forEach(n=>new Function(n)())},[]),s`<${a} ...${{title:"Load and Store Properties File",date:"2018-08-26T17:00:00.000Z"}} summary=${"<p>Properties files are usually used to externalize configuration from applications to text files. This article introduces the syntax and usage of properties files.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<p><code>java.util.Properties</code> class allows developers to load, change, store properties easily while providing a way to optionally save it in a filesystem.</p>\n<h1>\n  <a id="syntax-rules" class="anchor" aria-hidden="true" href="#syntax-rules">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Syntax Rules</h1><ol>\n<li>Since a property file is just a text file and read as an input stream, it could have any name and any extension.</li>\n<li>it could have two styles of commenting: <code>! comments...</code> or <code># comments...</code> (space after the initial character is optional).</li>\n<li>A backslash could be used to break up a single line into multiple lines.</li>\n<li>Properties files contain key-value pairs. Key-value pair could be defined as <code>key=value</code>, <code>key:value</code>, <code>key value</code>.</li>\n<li>space around the value is ignored when reading the file.</li>\n</ol>\n<h1>\n  <a id="usage" class="anchor" aria-hidden="true" href="#usage">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Usage</h1><h2>\n  <a id="system-properties" class="anchor" aria-hidden="true" href="#system-properties">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>System Properties</h2><div class="codeblock">\n  <pre class="language-java"><span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Properties</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">SysProps</span> <span class="token punctuation">{</span>\n  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Properties</span> sysProps <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    sysProps<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">"foo"</span><span class="token punctuation">,</span> <span class="token string">"bar"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    sysProps<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></pre>  \n</div><p>This outputs:</p>\n<div class="codeblock">\n  <pre>...\njava.vm.info=mixed mode\njava.version=1.8.0_181\nfoo=bar\njava.ext.dirs=/Users/hua/Library/Java/Extensions:/L...\n...</pre>\n</div><h2>\n  <a id="store-as-a-properties-file" class="anchor" aria-hidden="true" href="#store-as-a-properties-file">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Store as a Properties File</h2><div class="codeblock">\n  <pre class="language-java"><span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Properties</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">FileOutputStream</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Props1</span> <span class="token punctuation">{</span>\n  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Properties</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    p<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">"k1"</span><span class="token punctuation">,</span> <span class="token string">"v1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    p<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">"k2"</span><span class="token punctuation">,</span> <span class="token string">"v2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    p<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">try</span><span class="token punctuation">(</span><span class="token class-name">FileOutputStream</span> out <span class="token operator">=</span>\n        <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span><span class="token string">"myProps1.properties"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      p<span class="token punctuation">.</span><span class="token function">store</span><span class="token punctuation">(</span>out<span class="token punctuation">,</span> <span class="token string">"The header comment"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></pre>  \n</div><p>This outputs:</p>\n<div class="codeblock">\n  <pre>-- listing properties --\nk2=v2\nk1=v1</pre>\n</div><p>and the <code>myProps1.properties</code> looks like:</p>\n<div class="codeblock">\n  <pre>#The header comment\n#Sun Aug 26 16:06:31 EDT 2018\nk2=v2\nk1=v1\n</pre>\n</div><h2>\n  <a id="reading-the-saved-properties-file" class="anchor" aria-hidden="true" href="#reading-the-saved-properties-file">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Reading the Saved Properties File</h2><div class="codeblock">\n  <pre class="language-java"><span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Properties</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">FileOutputStream</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">FileInputStream</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Props2</span> <span class="token punctuation">{</span>\n  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Properties</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">try</span><span class="token punctuation">(</span><span class="token class-name">FileInputStream</span> in <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">"myProps1.properties"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token class-name">FileOutputStream</span> out <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span><span class="token string">"myProps2.properties"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      p<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      p<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      p<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">"k3"</span><span class="token punctuation">,</span> <span class="token string">"v3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      p<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      p<span class="token punctuation">.</span><span class="token function">store</span><span class="token punctuation">(</span>out<span class="token punctuation">,</span> <span class="token string">"A different header comment"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></pre>  \n</div><p>This outputs:</p>\n<div class="codeblock">\n  <pre>-- listing properties --\nk2=v2\nk1=v1\n-- listing properties --\nk3=v3\nk2=v2\nk1=v1</pre>\n</div><p>and the <code>myProps2.properties</code> file looks like:</p>\n<div class="codeblock">\n  <pre>#A different header comment\n#Sun Aug 26 16:07:34 EDT 2018\nk3=v3\nk2=v2\nk1=v1\n</pre>\n</div><h1>\n  <a id="useful-methods" class="anchor" aria-hidden="true" href="#useful-methods">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Useful methods</h1><div class="codeblock">\n  <pre class="language-java"><span class="token class-name">String</span> <span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span>\n\n<span class="token keyword">void</span> <span class="token function">list</span><span class="token punctuation">(</span><span class="token class-name">PrintStream</span> out<span class="token punctuation">)</span>\n\n<span class="token keyword">void</span> <span class="token function">load</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span> inStream<span class="token punctuation">)</span>\n\n<span class="token class-name">Object</span> <span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> value<span class="token punctuation">)</span>\n\n<span class="token keyword">void</span> <span class="token function">store</span><span class="token punctuation">(</span><span class="token class-name">OutputStream</span> outStream<span class="token punctuation">,</span> <span class="token class-name">String</span> headerComment<span class="token punctuation">)</span></pre>  \n</div>'}}/>
    </${a}>`}