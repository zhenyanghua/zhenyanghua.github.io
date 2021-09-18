import{y as n,m as s}from"../index.693ec721.js";import"./time.daaab1ba.js";import{P as a}from"./index.5a847c09.js";const t=[];export default function(){return n(()=>{t.forEach(n=>new Function(n)())},[]),s`<${a} ...${{title:"Spring Data MongoDB GridFS 3.4",date:"2018-10-17 17:00:00"}} summary=${"<p>This article shows a typical usage of MongoDB GridFS with Spring Data MongoDB. This is for MongoDB java driver v3.4 and Spring Data MongoDB v1.10.x. Note that Spring Data MongoDB v2.X introduces breaking changes with the MongoDB java driver 3.6+. This article only shows the usage of the v3.4 driver with Spring Data MongoDB v1.10.x.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="fileservice-interface" class="anchor" aria-hidden="true" href="#fileservice-interface">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>FileService Interface</h2><div class="codeblock">\n  <pre class="language-java"><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">FileService</span> <span class="token punctuation">{</span>\n    <span class="token class-name">GridFSDBFile</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">GridFsResource</span><span class="token punctuation">></span></span> <span class="token function">findAsResource</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">String</span> <span class="token function">store</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">MultipartFile</span> file<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">void</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></pre>  \n</div><h2>\n  <a id="fileservice-implementation" class="anchor" aria-hidden="true" href="#fileservice-implementation">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>FileService Implementation</h2><p>We can&#39;t use <code>GridFsTemplate.getResource(String location)</code> here to get the resource because there might be files with the same name. To find the expected file, we need to find a list of the resources that all match the same filename and then filter them by the id after retrieving all the files. This is acceptable because at that point, the <code>InputStream</code> hasn&#39;t been requested yet. <code>GridFsTemplate.getResources(String locationPattern)</code> takes an Ant matching pattern and it returns all resources whose filename passes the test.</p>\n<p><code>GridFsTemplate.store()</code> returns an <code>Object</code> whose string literal could be converted to a <code>ObjectId</code> type. For instance,\n<code>ObjectId objectId = new ObjectId(GridFsTemplate.store(...).toString())</code>.</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token annotation punctuation">@Service</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FileServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">FileService</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">GridFsTemplate</span> gridFsTemplate<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Autowired</span>\n    <span class="token keyword">public</span> <span class="token class-name">FileServiceImpl</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">GridFsTemplate</span> gridFsTemplate<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>gridFsTemplate <span class="token operator">=</span> gridFsTemplate<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">GridFSDBFile</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">ObjectId</span> objectId <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectId</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> gridFsTemplate<span class="token punctuation">.</span><span class="token function">findOne</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Query</span><span class="token punctuation">(</span><span class="token class-name">Criteria</span><span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">"_id"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">is</span><span class="token punctuation">(</span>objectId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">GridFsResource</span><span class="token punctuation">></span></span> <span class="token function">findAsResource</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>gridFsTemplate<span class="token punctuation">.</span><span class="token function">getResources</span><span class="token punctuation">(</span><span class="token function">find</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getFilename</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"*"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>gridFsResource <span class="token operator">-></span> gridFsResource<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">findAny</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">store</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">MultipartFile</span> file<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            <span class="token class-name">String</span> filename <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">getOriginalFilename</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>name <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                filename <span class="token operator">=</span> <span class="token class-name">FileNameUtils</span><span class="token punctuation">.</span><span class="token function">getExtension</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span>\n                    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>ext <span class="token operator">-></span> name <span class="token operator">+</span> <span class="token string">"."</span> <span class="token operator">+</span> ext<span class="token punctuation">)</span>\n                    <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n\n            <span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">GridFSFile</span> gridFSFile <span class="token operator">=</span> gridFsTemplate<span class="token punctuation">.</span><span class="token function">store</span><span class="token punctuation">(</span>\n                inputStream<span class="token punctuation">,</span> filename<span class="token punctuation">,</span> file<span class="token punctuation">.</span><span class="token function">getContentType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>gridFSFile <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token keyword">return</span> gridFSFile<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">FileException</span><span class="token punctuation">(</span><span class="token string">"Failed to save file"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">FileException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">ObjectId</span> objectId <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectId</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        gridFsTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Query</span><span class="token punctuation">(</span><span class="token class-name">Criteria</span><span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">"_id"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">is</span><span class="token punctuation">(</span>objectId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></pre>  \n</div><h2>\n  <a id="filecontroller" class="anchor" aria-hidden="true" href="#filecontroller">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>FileController</h2><div class="codeblock">\n  <pre class="language-java"><span class="token annotation punctuation">@RestController</span>\n<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/api/v1/files"</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FileController</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">FileService</span> fileService<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Autowired</span>\n    <span class="token keyword">public</span> <span class="token class-name">FileController</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">FileService</span> fileService<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>fileService <span class="token operator">=</span> fileService<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@PostMapping</span>\n    <span class="token keyword">public</span> <span class="token class-name">Attachment</span> <span class="token function">uploadAttachment</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span>\n                                 <span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">"file"</span><span class="token punctuation">)</span> <span class="token class-name">MultipartFile</span> file<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">String</span> id <span class="token operator">=</span>  fileService<span class="token punctuation">.</span><span class="token function">store</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> file<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Attachment</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/{id}"</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">InputStreamResource</span><span class="token punctuation">></span></span> <span class="token function">downloadFile</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">GridFsResource</span><span class="token punctuation">></span></span> resourceOptional <span class="token operator">=</span> fileService<span class="token punctuation">.</span><span class="token function">findAsResource</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">return</span> resourceOptional<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>resource <span class="token operator">-></span> <span class="token punctuation">{</span>\n            <span class="token keyword">try</span> <span class="token punctuation">{</span>\n                <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span>\n                    <span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n                    <span class="token punctuation">.</span><span class="token function">contentType</span><span class="token punctuation">(</span><span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>resource<span class="token punctuation">.</span><span class="token function">getContentType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n                    <span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token class-name">HttpHeaders</span><span class="token punctuation">.</span>CONTENT_DISPOSITION<span class="token punctuation">,</span>\n                        <span class="token string">"attachment; filename=""</span> <span class="token operator">+</span> resource<span class="token punctuation">.</span><span class="token function">getFilename</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"""</span><span class="token punctuation">)</span>\n                    <span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputStreamResource</span><span class="token punctuation">(</span>resource<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">FileException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token keyword">new</span> <span class="token class-name">FileException</span><span class="token punctuation">(</span><span class="token string">"File not found"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@DeleteMapping</span><span class="token punctuation">(</span><span class="token string">"/{id}"</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">deleteFile</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        fileService<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">class</span> <span class="token class-name">Attachment</span> <span class="token punctuation">{</span>\n        <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>\n        <span class="token keyword">private</span> <span class="token class-name">String</span> fileId<span class="token punctuation">;</span>\n\n        <span class="token class-name">Attachment</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">String</span> fileId<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>fileId <span class="token operator">=</span> fileId<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token comment">// Getters and setters...</span>\n    <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span></pre>  \n</div><h2>\n  <a id="references" class="anchor" aria-hidden="true" href="#references">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>References</h2><ol>\n<li><a href="http://mongodb.github.io/mongo-java-driver/3.4/javadoc/" target="_blank">Mongo Java Driver v3.4</a></li>\n<li><a href="https://docs.spring.io/spring-data/mongodb/docs/1.10.16.RELEASE/api/" target="_blank">Spring Data MongoDB v.1.10.16 API</a></li>\n<li><a href="https://docs.spring.io/spring-data/mongodb/docs/1.10.16.RELEASE/reference/html/" target="_blank">Spring Data MongoDB v.1.10.16 Reference</a></li>\n</ol>\n'}}/>
    </${a}>`}