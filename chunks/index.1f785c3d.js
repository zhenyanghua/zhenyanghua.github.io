import{y as n,m as s}from"../index.a6541b7c.js";import"./time.daaab1ba.js";import{P as a}from"./index.a36887ef.js";const t=[];export default function(){return n(()=>{t.forEach(n=>new Function(n)())},[]),s`<${a} ...${{title:"Useful File java.io Mini API",date:"2018-08-29 17:00:00"}} summary=${"<p>Java io is a very extensive library. There are numerous ways and combinations to write/read data on a file. This article summaries some very useful classes in <code>java.io</code> package.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<p>Here is a table from <a href="https://www.amazon.com/Java-Programmer-Exam-Guide-1Z0-809-ebook/dp/B07C8BJ9TG" target="_blank">OCP Java SE 8 Programmer II Exam Guide (Exam 1Z0-809)</a> that summarizes the basic classes in file io.</p>\n<table>\n<thead>\n<tr>\n<th>java.io Class</th>\n<th>Extends From</th>\n<th>Key Constructor(s)</th>\n<th>Key Methods</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><code>File</code></td>\n<td><code>Object</code></td>\n<td><code>File, String</code><br/> <code>String</code><br/> <code>String, String</code></td>\n<td><code>createNewFile()</code><br/> <code>delete()</code><br/> <code>exists()</code><br/> <code>isDirectory()</code><br/> <code>isFile()</code><br/><code>list()</code><br/><code>mkdir()</code><br/><code>renameTo()</code></td>\n</tr>\n<tr>\n<td><code>FileWriter</code></td>\n<td><code>Writer</code></td>\n<td><code>File</code><br/><code>String</code></td>\n<td><code>close()</code><br/><code>flush()</code><br/><code>write()</code></td>\n</tr>\n<tr>\n<td><code>BufferedWriter</code></td>\n<td><code>Writer</code></td>\n<td><code>Writer</code></td>\n<td><code>close()</code><br/><code>flush()</code><br/><code>newLine()</code><br/><code>write()</code></td>\n</tr>\n<tr>\n<td><code>PrintWriter</code></td>\n<td><code>Writer</code></td>\n<td><code>File</code><br/><code>String</code><br/><code>OuputStream</code><br/><code>Writer</code></td>\n<td><code>close()</code><br/><code>flush()</code><br/><code>format()</code><br/><code>printf()</code><br/><code>print()</code><br/><code>println()</code><br/><code>write()</code></td>\n</tr>\n<tr>\n<td><code>FileOutputStream</code></td>\n<td><code>OutputStream</code></td>\n<td><code>File</code><br/><code>String</code></td>\n<td><code>close()</code><br/><code>write()</code></td>\n</tr>\n<tr>\n<td><code>FileReader</code></td>\n<td><code>Reader</code></td>\n<td><code>File</code><br/><code>String</code></td>\n<td><code>read()</code></td>\n</tr>\n<tr>\n<td><code>BufferedReader</code></td>\n<td><code>Reader</code></td>\n<td><code>Reader</code></td>\n<td><code>read()</code><br/><code>readLine()</code></td>\n</tr>\n<tr>\n<td><code>FileInputStream</code></td>\n<td><code>InputStream</code></td>\n<td><code>File</code><br/><code>String</code></td>\n<td><code>read()</code><br/><code>close()</code></td>\n</tr>\n</tbody></table>\n<h1>\n  <a id="examples" class="anchor" aria-hidden="true" href="#examples">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Examples</h1><div class="codeblock">\n  <pre class="language-java"><span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token operator">*</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Writer1</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            <span class="token keyword">boolean</span> newFile <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n            <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"fileWrite1.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            newFile <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">createNewFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>newFile<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Writer2</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> in <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token number">50</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n        <span class="token keyword">int</span> size <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"fileWrite2.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">FileWriter</span> fw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            fw<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">"howdy\nfolks\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            fw<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            fw<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">FileReader</span> fr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            size <span class="token operator">=</span> fr<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>size <span class="token operator">+</span> <span class="token string">" "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">char</span> c<span class="token operator">:</span> in<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n            fr<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Writer3</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> in <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">50</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n        <span class="token keyword">int</span> size <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n        <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"fileWrite3.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">try</span><span class="token punctuation">(</span><span class="token class-name">FileOutputStream</span> outStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">FileInputStream</span> inStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token string">"howdy\nfolks\n"</span><span class="token punctuation">;</span>\n            outStream<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            outStream<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            size <span class="token operator">=</span> inStream<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>size <span class="token operator">+</span> <span class="token string">" "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">byte</span> b<span class="token operator">:</span> in<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Writer4</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"fileWrite4.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">try</span><span class="token punctuation">(</span><span class="token class-name">PrintWriter</span> pw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">BufferedReader</span> br <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            pw<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"howdy"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            pw<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"folks"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            pw<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            \n            <span class="token class-name">String</span> line <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n            <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                line <span class="token operator">=</span> br<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token keyword">if</span> <span class="token punctuation">(</span>line <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">break</span><span class="token punctuation">;</span>\n                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>    \n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></pre>  \n</div>'}}/>
    </${a}>`}