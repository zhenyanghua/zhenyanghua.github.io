import{y as a,m as n}from"../index.4d924118.js";import"./time.daaab1ba.js";import{P as s}from"./index.a2f79423.js";const t=[];export default function(){return a(()=>{t.forEach(a=>new Function(a)())},[]),n`<${s} ...${{title:"Serve Images in Next-gen Formats",date:"2021-01-22 17:00:00"}} summary=${"<p>Serving smaller images without sacrificing the resolution quality could be finally achieved\nwith the next-gen formats. This article introduces three common next-gen formats and a tip\nto have fallback images when the browser doesn&#39;t support those.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="browser-compatibility" class="anchor" aria-hidden="true" href="#browser-compatibility">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Browser compatibility</h2><table>\n<thead>\n<tr>\n<th>Format</th>\n<th>Chrome</th>\n<th>FireFox</th>\n<th>Edge</th>\n<th>Safari</th>\n<th>IE11</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><a href="https://caniuse.com/webp" target="_blank">WebP</a></td>\n<td>Y</td>\n<td>Y</td>\n<td>Y</td>\n<td>N</td>\n<td>N</td>\n</tr>\n<tr>\n<td><a href="https://caniuse.com/avif" target="_blank">AVIF</a></td>\n<td>Y</td>\n<td>Y</td>\n<td>N</td>\n<td>N</td>\n<td>N</td>\n</tr>\n<tr>\n<td><a href="https://caniuse.com/jpeg2000" target="_blank">Jpeg 2000</a></td>\n<td>N</td>\n<td>N</td>\n<td>N</td>\n<td>Y</td>\n<td>N</td>\n</tr>\n<tr>\n<td><a href="https://caniuse.com/jpegxr" target="_blank">Jpeg XR</a></td>\n<td>N</td>\n<td>N</td>\n<td>N</td>\n<td>N</td>\n<td>Y</td>\n</tr>\n</tbody></table>\n<h2>\n  <a id="fallback" class="anchor" aria-hidden="true" href="#fallback">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Fallback</h2><p>Based on the majority of the browsers support WebP format, we could default to\nuse webp format for all images and set up fallback for universal Jpeg format.</p>\n<h3>\n  <a id="html-img-element-fallback" class="anchor" aria-hidden="true" href="#html-img-element-fallback">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>HTML <img> element fallback</h3><div class="codeblock">\n  <pre class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image description<span class="token punctuation">"</span></span> \n     <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image.webp<span class="token punctuation">"</span></span> \n     <span class="token special-attr"><span class="token attr-name">onerror</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token keyword">this</span><span class="token punctuation">.</span>src<span class="token operator">=</span>image<span class="token punctuation">.</span>jpg</span><span class="token punctuation">"</span></span></span> <span class="token punctuation">/></span></span></pre>  \n</div><h3>\n  <a id="css-background-image-fallback" class="anchor" aria-hidden="true" href="#css-background-image-fallback">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>CSS background image fallback</h3><div class="codeblock">\n  <pre class="language-css"><span class="token comment">/* default fallback when \'image-set()\' is not supported */</span>\n<span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">\'image.jpg\'</span><span class="token punctuation">)</span></span><span class="token punctuation">;</span>\n<span class="token comment">/* default to AVIF and if not supported, try WebP, etc.. */</span>\n<span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">image-set</span><span class="token punctuation">(</span> \n  <span class="token string">"image.avif"</span> <span class="token function">type</span><span class="token punctuation">(</span><span class="token string">"image/avif"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  \n  <span class="token string">"image.webp"</span> <span class="token function">type</span><span class="token punctuation">(</span><span class="token string">"image/webp"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token string">"image.jp2"</span>  <span class="token function">type</span><span class="token punctuation">(</span><span class="token string">"image/jp2"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token string">"image.jxr"</span>  <span class="token function">type</span><span class="token punctuation">(</span><span class="token string">"image/jxr"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token string">"image.jpg"</span>  <span class="token function">type</span><span class="token punctuation">(</span><span class="token string">"image/jpeg"</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span></pre>  \n</div>'}}/>
    </${s}>`}