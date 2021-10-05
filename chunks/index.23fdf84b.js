import{y as n,m as s}from"../index.74b5ed8d.js";import"./time.daaab1ba.js";import{P as a}from"./index.cdcee1e2.js";const t=[];export default function(){return n(()=>{t.forEach(n=>new Function(n)())},[]),s`<${a} ...${{title:"Recursively Move a Directory",date:"2019-01-09 17:00:00"}} summary=${"<p>This article shows one effective implementation that follows the Visitor Pattern to recursively move a directory using Java NIO library.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<div class="codeblock">\n  <pre class="language-java"><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">move</span><span class="token punctuation">(</span><span class="token class-name">Path</span> source<span class="token punctuation">,</span> <span class="token class-name">Path</span> target<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">class</span> <span class="token class-name">FileMover</span> <span class="token keyword">extends</span> <span class="token class-name">SimpleFileVisitor</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Path</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>\n        <span class="token keyword">private</span> <span class="token class-name">Path</span> source<span class="token punctuation">;</span>\n        <span class="token keyword">private</span> <span class="token class-name">Path</span> target<span class="token punctuation">;</span>\n\n        <span class="token keyword">private</span> <span class="token class-name">FileMover</span><span class="token punctuation">(</span><span class="token class-name">Path</span> source<span class="token punctuation">,</span> <span class="token class-name">Path</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>source <span class="token operator">=</span> source<span class="token punctuation">;</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>target <span class="token operator">=</span> target<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token annotation punctuation">@Override</span>\n        <span class="token keyword">public</span> <span class="token class-name">FileVisitResult</span> <span class="token function">visitFile</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Path</span> file<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">BasicFileAttributes</span> attrs<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n            <span class="token class-name">Path</span> newFile <span class="token operator">=</span> target<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>source<span class="token punctuation">.</span><span class="token function">relativize</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">move</span><span class="token punctuation">(</span>file<span class="token punctuation">,</span> newFile<span class="token punctuation">,</span>\n                <span class="token class-name">StandardCopyOption</span><span class="token punctuation">.</span>REPLACE_EXISTING<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token class-name">FileVisitResult</span><span class="token punctuation">.</span>CONTINUE<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token annotation punctuation">@Override</span>\n        <span class="token keyword">public</span> <span class="token class-name">FileVisitResult</span> <span class="token function">preVisitDirectory</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Path</span> dir<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">BasicFileAttributes</span> attrs<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n            <span class="token class-name">Path</span> newDir <span class="token operator">=</span> target<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>source<span class="token punctuation">.</span><span class="token function">relativize</span><span class="token punctuation">(</span>dir<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">try</span> <span class="token punctuation">{</span>\n                <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">copy</span><span class="token punctuation">(</span>dir<span class="token punctuation">,</span> newDir<span class="token punctuation">,</span>\n                    <span class="token class-name">StandardCopyOption</span><span class="token punctuation">.</span>COPY_ATTRIBUTES<span class="token punctuation">,</span>\n                    <span class="token class-name">StandardCopyOption</span><span class="token punctuation">.</span>REPLACE_EXISTING<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">DirectoryNotEmptyException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token comment">// ignore and skip</span>\n            <span class="token punctuation">}</span>\n            <span class="token keyword">return</span> <span class="token class-name">FileVisitResult</span><span class="token punctuation">.</span>CONTINUE<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token annotation punctuation">@Override</span>\n        <span class="token keyword">public</span> <span class="token class-name">FileVisitResult</span> <span class="token function">postVisitDirectory</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Path</span> dir<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">IOException</span> exc<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n            <span class="token class-name">Path</span> newDir <span class="token operator">=</span> target<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>source<span class="token punctuation">.</span><span class="token function">relativize</span><span class="token punctuation">(</span>dir<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">FileTime</span> time <span class="token operator">=</span> <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">getLastModifiedTime</span><span class="token punctuation">(</span>dir<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">setLastModifiedTime</span><span class="token punctuation">(</span>newDir<span class="token punctuation">,</span> time<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>dir<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token class-name">FileVisitResult</span><span class="token punctuation">.</span>CONTINUE<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token class-name">FileMover</span> fm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileMover</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> target<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">EnumSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FileVisitOption</span><span class="token punctuation">></span></span> opts <span class="token operator">=</span> <span class="token class-name">EnumSet</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">FileVisitOption</span><span class="token punctuation">.</span>FOLLOW_LINKS<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">Files</span><span class="token punctuation">.</span><span class="token function">walkFileTree</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> opts<span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span>MAX_VALUE<span class="token punctuation">,</span> fm<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></pre>  \n</div>'}}/>
    </${a}>`}