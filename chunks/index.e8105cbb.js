import{y as n,m as s}from"../index.bd4eee16.js";import"./time.daaab1ba.js";import{P as a}from"./index.c8964cf6.js";const t=[];export default function(){return n(()=>{t.forEach(n=>new Function(n)())},[]),s`<${a} ...${{title:"Java Basic Serialization",date:"2018-09-02T17:00:00.000Z"}} summary=${"<p>Serialization includes the part that serializes an object to a file and deserializes a file to an object that has the desired same state as it was in. It is typically done by using two high-level classes from the <code>java.io</code> package - <code>ObjectOutputStream</code> and <code>ObjectInputStream</code>. In this article, we demonstrate the basic operations of serializing and deserializing.</p>"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="key-points-in-serialization" class="anchor" aria-hidden="true" href="#key-points-in-serialization">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Key Points in Serialization</h2><ul>\n<li>A class must implement <code>Serializable</code> interface before its object can be serialized.</li>\n<li>If a class implements <code>Serializable</code>, all its instances variables that have a reference to another object must be <code>transient </code>or the object referenced to must also implement <code>Serializable</code>.</li>\n<li>If an instance variable is marked <code>transient</code>, it will not be serialized.</li>\n<li><code>private void writeObject(ObjectOutputStream oos)</code> and <code>private void readObject(ObjectInputStream ois)</code> could be used to manually add additional logic to the serialization process. This could be very useful to serialize objects that don&#39;t implement <code>Serializable</code>.</li>\n<li><code>oos.defaultWriteObject()</code> and <code>ois.defaultReadObject()</code> could be used before custom serialization logic happens to auto-serialize serializable objects.</li>\n<li><code>oos.writeXXX()</code> and <code>ois.readXXX()</code> could be used to write and read additional state in custom serialization process. The read order must be the same as the write order.</li>\n<li>If a superclass implements <code>Serializable</code>, its subclasses do automatically.</li>\n<li>If a superclass doesn&#39;t implements <code>Serializable</code>, when a subclass object is deserialized, the superclass constructor will be invoked along with its super-constructor(s). If the superclass contains constructor(s) with argument(s), it must explicitly define a nonargument constructor.</li>\n</ul>\n<h2>\n  <a id="example" class="anchor" aria-hidden="true" href="#example">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Example</h2><div class="codeblock">\n  <pre class="language-java"><span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token operator">*</span><span class="token punctuation">;</span>\n\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SerializePlay</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Dog</span> dog <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token string">"female"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Collar</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"wangwang"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Sex: "</span> <span class="token operator">+</span> dog<span class="token punctuation">.</span><span class="token function">getSex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">try</span><span class="token punctuation">(</span><span class="token class-name">ObjectOutputStream</span> oos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectOutputStream</span><span class="token punctuation">(</span>\n                <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span><span class="token string">"dog.ser"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            oos<span class="token punctuation">.</span><span class="token function">writeObject</span><span class="token punctuation">(</span>dog<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n         \n        <span class="token keyword">try</span><span class="token punctuation">(</span><span class="token class-name">ObjectInputStream</span> ois <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectInputStream</span><span class="token punctuation">(</span>\n                    <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">"dog.ser"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">Dog</span> dogRestored <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Dog</span><span class="token punctuation">)</span> ois<span class="token punctuation">.</span><span class="token function">readObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Collar size: "</span> <span class="token operator">+</span> \n                    dogRestored<span class="token punctuation">.</span><span class="token function">getCollar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Nickname: "</span> <span class="token operator">+</span> dogRestored<span class="token punctuation">.</span><span class="token function">getNickname</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Sex: "</span> <span class="token operator">+</span> dogRestored<span class="token punctuation">.</span><span class="token function">getSex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">IOException</span> <span class="token operator">|</span> <span class="token class-name">ClassNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Collar</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> size<span class="token punctuation">;</span>\n   \n    <span class="token class-name">Collar</span> <span class="token punctuation">(</span><span class="token keyword">int</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>size <span class="token operator">=</span> size<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">int</span> <span class="token function">getSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> size<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> sex<span class="token punctuation">;</span>\n    \n    <span class="token class-name">Animal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n\n    <span class="token class-name">Animal</span><span class="token punctuation">(</span><span class="token class-name">String</span> sex<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>sex <span class="token operator">=</span> sex<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token class-name">String</span> <span class="token function">getSex</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> sex<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    \n    <span class="token keyword">void</span> <span class="token function">setSex</span><span class="token punctuation">(</span><span class="token class-name">String</span> sex<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>sex <span class="token operator">=</span> sex<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token keyword">extends</span> <span class="token class-name">Animal</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>\n    <span class="token keyword">transient</span> <span class="token keyword">private</span> <span class="token class-name">Collar</span> collar<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> nickname<span class="token punctuation">;</span>\n\n    <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token class-name">String</span> sex<span class="token punctuation">,</span> <span class="token class-name">Collar</span> collar<span class="token punctuation">,</span> <span class="token class-name">String</span> nickname<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">super</span><span class="token punctuation">(</span>sex<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>collar <span class="token operator">=</span> collar<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>nickname <span class="token operator">=</span> nickname<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token class-name">Collar</span> <span class="token function">getCollar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> collar<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token class-name">String</span> <span class="token function">getNickname</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> nickname<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">writeObject</span><span class="token punctuation">(</span><span class="token class-name">ObjectOutputStream</span> oos<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            oos<span class="token punctuation">.</span><span class="token function">defaultWriteObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            oos<span class="token punctuation">.</span><span class="token function">writeInt</span><span class="token punctuation">(</span>collar<span class="token punctuation">.</span><span class="token function">getSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            oos<span class="token punctuation">.</span><span class="token function">writeObject</span><span class="token punctuation">(</span><span class="token function">getSex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">readObject</span><span class="token punctuation">(</span><span class="token class-name">ObjectInputStream</span> ois<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            ois<span class="token punctuation">.</span><span class="token function">defaultReadObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            collar <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Collar</span><span class="token punctuation">(</span>ois<span class="token punctuation">.</span><span class="token function">readInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token function">setSex</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> ois<span class="token punctuation">.</span><span class="token function">readObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">IOException</span> <span class="token operator">|</span> <span class="token class-name">ClassNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></pre>  \n</div>'}}/>
    </${a}>`}