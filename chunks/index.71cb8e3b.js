import{y as a,m as n}from"../index.b94c98ba.js";import"./time.daaab1ba.js";import{P as s}from"./index.c1708670.js";const e=[];export default function(){return a(()=>{e.forEach(a=>new Function(a)())},[]),n`<${s} ...${{title:"Build a markdown notes taking app",date:"2021-04-28 22:46:00"}} summary=${"<p>I really like the experience Azure DevOps provides in a PR description section - it is a markdown editor with instant preview of the input. The feature I really like is the ability to be able to paste in any screenshots from the clipboard just makes it really easy to convey the information. I like it so much that I wish I could use it to take any notes with screenshots that I like whenever I am and also allows me to take them with when I am on a different computer.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="tl-dr" class="anchor" aria-hidden="true" href="#tl-dr">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>TL;DR</h2><p>This article describes the path taken to build a POC of a markdown notes taking app that read images from OS clipboard.</p>\n<ul>\n<li><a href="https://zhenyanghua.github.io/yame/">Demo</a></li>\n<li><a href="https://github.com/zhenyanghua/yame/blob/70ea7b7e134afd62391b2acdac5318081f760057/index.html">Source code</a></li>\n</ul>\n<h2>\n  <a id="step-1-define-requirements" class="anchor" aria-hidden="true" href="#step-1-define-requirements">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Step 1 - define requirements</h2><ol>\n<li>A basic markdown editor that consume standard markdown syntax and output nice structure content</li>\n<li>Users should be able to paste in any images from the standard clipboard from any operating system.</li>\n<li>Users should be able to save their notes and images</li>\n<li>Users should be able to export all their notes to a file</li>\n<li>Users should be able to import the exported file and restore all the notes with any images included.</li>\n</ol>\n<h2>\n  <a id="step-2-identify-technical-challenge-and-possible-dependencies" class="anchor" aria-hidden="true" href="#step-2-identify-technical-challenge-and-possible-dependencies">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Step 2 - identify technical challenge and possible dependencies</h2><blockquote>\n<p>A basic markdown editor that consume standard markdown syntax and output nice structure content</p>\n</blockquote>\n<ul>\n<li>We need a markdown parser that can parse standard markdown string to HTML string (<a href="https://www.npmjs.com/package/marked">marked</a>).</li>\n<li>We may need to define our own styles for the generate HTML string but we may as well explore if there is any existing standard markdown CSS available from NPM (<a href="https://www.npmjs.com/package/github-markdown-css">github-markdown-css</a>).</li>\n</ul>\n<blockquote>\n<p>Users should be able to paste in any images from the standard clipboard from any operating system.</p>\n</blockquote>\n<ul>\n<li>We need to access the data from the clipboard.</li>\n<li>Checking combo keys (<kbd>Ctrl</kbd> + <kbd>v</kbd>, <kbd>Cmd</kbd> + <kbd>v</kbd>, <kbd>Context</kbd>, right click paste, etc.) could be endless when we may not know what custom paste key binding are used in users&#39; operating system.</li>\n<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/onpaste">HTMLElement.onpaste</a> is an <code>EventHandler</code> that signals when a paste event is triggered from the clipboard.</li>\n<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API">Clipboard API</a> comes in handy, where we don&#39;t need to worry about how to obtain the data pasted from the <code>onpaste</code> event as it provides an interface to detect data types and content from the clipboard.</li>\n</ul>\n<blockquote>\n<p>Users should be able to save their notes and images</p>\n</blockquote>\n<ul>\n<li>We need to serialize the users&#39; input in some form and persist it in a store so they will be there after a page is refreshed. Browsers have plenty storages options, e.g. <code>LocalStorage</code>, <code>IndexedDB</code>. However, <code>LocalStorage</code> can only stores up to 5MB per app per browser, which may cap even just one note with many large images pasted in. <a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API"><code>IndexedDB</code> </a> comes in handy.</li>\n<li>Image serialization could be usually done through the <code>canvas</code> API where we could obtain the base64 image string from the Blob and then save it to the store. The deserialization is only a matter of decoding the base64 image back to <code>Blob</code>. However, with the <code>IndexedDB</code>, which supports <code>Blob</code> data type out-of-the-box, we could store the image directly as <code>Blob</code>.</li>\n<li><code>IndexedDB</code> comes with a pretty verbose API and we could use an library that provides a simplified abstract layer. (<a href="https://www.npmjs.com/package/dexie">Dexie</a>)</li>\n</ul>\n<blockquote>\n<p>Users should be able to export all their notes to a file</p>\n</blockquote>\n<blockquote>\n<p>Users should be able to import the exported file and restore all the notes with any images included.</p>\n</blockquote>\n<ul>\n<li>We need to be able to export all notes from the <code>IndexedDB</code> to a file</li>\n<li>We could either export a dump of the current version of the local database or we could create a custom format that only exports the notes and images saved in the database.</li>\n<li>If we use a custom format and exports only the notes and images saved, we need to also import them and bulk load them to their tables. If we use features from <code>Dexie</code>, we could use the addon <a href="https://www.npmjs.com/package/dexie-export-import">dexie-export-import</a> to do the export/import for the entire database.</li>\n<li>Schema  versioning and conflicts resolving could be too complicated in a local database version where it is not possible as the database is distributed and not possible to create a volatile lock among all browsers. We may explore this enhancement in the future. For now, we overwrite any existing schema and data when a new file is imported.</li>\n<li>To restore any images associations, we need to define the relationship between the notes and images. We could save notes and images in two separate tables where the notes keep a foreign key to the image unique id.</li>\n<li>If the image is pasted from the same source in the clipboard, we treat them as two different image and store as separate records in the table, this way we could save our brain from some more squeezing.</li>\n</ul>\n<h2>\n  <a id="step-3-bill-of-materials-list-dependencies-and-apis" class="anchor" aria-hidden="true" href="#step-3-bill-of-materials-list-dependencies-and-apis">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Step 3 - bill of materials: list dependencies and APIs</h2><ul>\n<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/onpaste">Web API - HTMLElement.onpaste</a></li>\n<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API">Web API - Clipboard API</a></li>\n<li><a href="https://www.npmjs.com/package/marked">NPM - marked</a></li>\n<li><a href="https://www.npmjs.com/package/github-markdown-css">NPM - github-markdown-css</a></li>\n<li><a href="https://www.npmjs.com/package/dexie">NPM - Dexie</a></li>\n<li><a href="https://www.npmjs.com/package/dexie-export-import">NPM - dexie-export-import</a></li>\n</ul>\n<h2>\n  <a id="step-4-build-it" class="anchor" aria-hidden="true" href="#step-4-build-it">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Step 4 - build it</h2><p>In this section, I only mention the snippets from the above mentioned API, for the complete POC demo - read <a href="https://github.com/zhenyanghua/yame/blob/70ea7b7e134afd62391b2acdac5318081f760057/index.html">source code</a>.</p>\n<h3>\n  <a id="-code-onpaste-code-eventhandler-and-code-clipboard-code-api" class="anchor" aria-hidden="true" href="#-code-onpaste-code-eventhandler-and-code-clipboard-code-api">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a><code>onpaste</code> EventHandler and <code>Clipboard</code> API</h3><div class="codeblock">\n  <pre class="language-javascript">  textarea<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">\'paste\'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">await</span> navigator<span class="token punctuation">.</span>clipboard<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    data\n        <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> item<span class="token punctuation">.</span>types<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">\'image/png\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token parameter">item</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n          <span class="token keyword">const</span> blob <span class="token operator">=</span> <span class="token keyword">await</span> item<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token string">\'image/png\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token comment">// Save blob as users paste</span>\n          <span class="token comment">// TODO - need to remove those from idb and revoke URL </span>\n          <span class="token comment">//  when the current session or activeDoc is reset to undefined.</span>\n          <span class="token keyword">const</span> blobId <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">saveBlob</span><span class="token punctuation">(</span>blob<span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span>blob<span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token comment">// find the cursor position and insert</span>\n          <span class="token comment">// FIXME - the "Cut" command doesn\'t seem to be working</span>\n          textarea<span class="token punctuation">.</span>value <span class="token operator">=</span> textarea<span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> textarea<span class="token punctuation">.</span>selectionStart<span class="token punctuation">)</span> \n              <span class="token operator">+</span> <span class="token string">"![Image - "</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLocaleString</span><span class="token punctuation">(</span><span class="token string">\'en-US\'</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"](bid:"</span> <span class="token operator">+</span> blobId <span class="token operator">+</span> <span class="token string">":"</span> <span class="token operator">+</span> url<span class="token string">")"</span> \n              <span class="token operator">+</span> textarea<span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>textarea<span class="token punctuation">.</span>selectionStart <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token function">parse</span><span class="token punctuation">(</span>textarea<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></pre>  \n</div><h3>\n  <a id="replace-all-matching-patterns-code-blob-id-generated_url-code-with-the-pasted" class="anchor" aria-hidden="true" href="#replace-all-matching-patterns-code-blob-id-generated_url-code-with-the-pasted">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Replace all matching patterns <code>![blob-id](GENERATED_URL)</code> with the pasted</h3><div class="codeblock">\n  <pre class="language-javascript">  <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">openNote</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>query<span class="token punctuation">,</span> doc<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    activeDoc <span class="token operator">=</span> query <span class="token operator">?</span> <span class="token keyword">await</span> query <span class="token operator">:</span> doc<span class="token punctuation">;</span>\n    <span class="token keyword">const</span> <span class="token punctuation">{</span>id<span class="token punctuation">,</span> data<span class="token punctuation">,</span> name<span class="token punctuation">}</span> <span class="token operator">=</span> activeDoc<span class="token punctuation">;</span>\n    <span class="token keyword">const</span> matches <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>data<span class="token punctuation">.</span><span class="token function">matchAll</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">![.*](bid:(d+):.*)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gi</span></span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token keyword">const</span> imageIds <span class="token operator">=</span> matches<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">m</span> <span class="token operator">=></span> <span class="token function">Number</span><span class="token punctuation">(</span>m<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">const</span> images <span class="token operator">=</span> <span class="token keyword">await</span> db<span class="token punctuation">.</span>images<span class="token punctuation">.</span><span class="token function">bulkGet</span><span class="token punctuation">(</span>imageIds<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">const</span> replacedData <span class="token operator">=</span> data<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(![.*](bid:(d+):)(.*)())</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gi</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">m<span class="token punctuation">,</span> p1<span class="token punctuation">,</span> p2<span class="token punctuation">,</span> p3<span class="token punctuation">,</span> p4</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">const</span> image <span class="token operator">=</span> images<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> x<span class="token punctuation">.</span>id <span class="token operator">===</span> <span class="token function">Number</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span>image<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token keyword">return</span> <span class="token string">""</span> <span class="token operator">+</span> p1 <span class="token operator">+</span> url <span class="token operator">+</span> p4<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    textarea<span class="token punctuation">.</span>value <span class="token operator">=</span> replacedData<span class="token punctuation">;</span>\n    <span class="token function">parse</span><span class="token punctuation">(</span>replacedData<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span></pre>  \n</div><h3>\n  <a id="parser" class="anchor" aria-hidden="true" href="#parser">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Parser</h3><div class="codeblock">\n  <pre class="language-javascript">  <span class="token keyword">function</span> <span class="token function">parse</span><span class="token punctuation">(</span><span class="token parameter">text</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    viewer<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token function">marked</span><span class="token punctuation">(</span>text<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">bid:d+:</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gi</span></span><span class="token punctuation">,</span> <span class="token string">\'\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span></pre>  \n</div><h2>\n  <a id="known-issues" class="anchor" aria-hidden="true" href="#known-issues">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Known issues</h2><ul>\n<li>No syntax highlighting yet</li>\n<li>&quot;Cut&quot; command doesn&#39;t seem to work, this must be a bug from the POC.</li>\n<li>The <code>dexie-export-import</code> currently has a <a href="https://github.com/dfahlander/Dexie.js/issues/1288">bug</a> and a <a href="https://github.com/dfahlander/Dexie.js/pull/1271">PR</a> is in progress to fix the aysnc array buffer issue. At this moment, we use a local build module from the fork branch directly.</li>\n<li>Image pasting doesn&#39;t seem to work with mobile phone browsers.</li>\n</ul>\n<h2>\n  <a id="roadmap" class="anchor" aria-hidden="true" href="#roadmap">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Roadmap</h2><h3>\n  <a id="stack" class="anchor" aria-hidden="true" href="#stack">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Stack</h3><ul>\n<li>Preact (CLI) - Dataflow</li>\n<li>Tailwind CSS - PostCSS utility</li>\n<li>marked - Markdown parser</li>\n<li>highlight/prism - language syntax parser</li>\n<li>Dexie - IndexedDB wrapper</li>\n<li>dexie-export-import (local)? - local fix of the IndexedDB export/import</li>\n</ul>\n<h3>\n  <a id="mvp-i-core-functionalities" class="anchor" aria-hidden="true" href="#mvp-i-core-functionalities">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>MVP I - Core functionalities</h3><ol>\n<li>Create all functionalities provided in the prototype.</li>\n<li>Add ability to delete notes</li>\n<li>Add ability to lock a note from being deleted.</li>\n<li>Add ability to save name upon saving (modal?)</li>\n<li>Add notification to indicate operation status.</li>\n</ol>\n<h3>\n  <a id="mvp-ii-workbook" class="anchor" aria-hidden="true" href="#mvp-ii-workbook">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>MVP II - Workbook</h3><ol>\n<li>Ability to arrange notes by workbook</li>\n<li>Ability to import a new workbook with all its notes</li>\n<li>Ability to manage workbooks</li>\n</ol>\n<h3>\n  <a id="explore-collaboration" class="anchor" aria-hidden="true" href="#explore-collaboration">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Explore - Collaboration</h3><ul>\n<li>P2P without server</li>\n<li>Multiple people editing the same notes at the same time.</li>\n</ul>\n'}}/>
    </${s}>`}