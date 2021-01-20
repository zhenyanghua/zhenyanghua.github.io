import{m as n}from"../index.e68c6915.js";import"./time.daaab1ba.js";import{P as s}from"./index.18860ff3.js";export default function(){return n`<${s} ...${{title:"Override Enum Methods with Constant Specific Class Body",date:"2018-11-20T17:00:00.000Z"}} summary=${"<p>This article shows one advanced technique when using enums - constant specific class body.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<p>Enum is a specialized class whose instances are created and managed completely by JVM. So we should never invoke constructors of an enum, otherwise there might be a meltdown of the JVM, and fortunately, our loyal friend compiler always help us catching the error before it happens. Most of the time we use enum for two purposes -- to create either singleton or a list of predefined enumerable list.</p>\n<p>Given the following scenario, create an enum of currency that is supported by a vending machine, we might end up with the following enum:</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">Currency</span> <span class="token punctuation">{</span>\n    <span class="token function">QUARTER</span><span class="token punctuation">(</span><span class="token number">0.25</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">ONE_DOLLAR</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">FIVE_DOLLAR</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token keyword">double</span> value<span class="token punctuation">;</span>\n\n    <span class="token class-name">Currency</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token keyword">double</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> value<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></pre>  \n</div><p>Now our vending machine also needs to know if the money inserted is a <em>note</em> or a <em>coin</em>, we will need to provide such information in our enum type. e.g. adding a getter method that uses a switch to determine which instances and its associated money type:</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">Currency</span> <span class="token punctuation">{</span>\n    <span class="token function">QUARTER</span><span class="token punctuation">(</span><span class="token number">0.25</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">ONE_DOLLAR</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">FIVE_DOLLAR</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token keyword">double</span> value<span class="token punctuation">;</span>\n\n    <span class="token class-name">Currency</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token keyword">double</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> value<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">switch</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">case</span> QUARTER<span class="token operator">:</span>\n                <span class="token keyword">return</span> <span class="token string">"coin"</span><span class="token punctuation">;</span>\n            <span class="token keyword">default</span><span class="token operator">:</span>\n                <span class="token keyword">return</span> <span class="token string">"note"</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></pre>  \n</div><p>Let&#39;s think about this, when an enum instance is referenced, the exact instance is already determined. In the above <code>getType()</code> implementation, knowing that we already know what exact instance we are using, we still have to make a check with a <code>switch-case</code> block, it seems unnecessary. Java provides a nicer way to solve this problem. We could give the majority the same type of behavior while specially treat the minority. In this case, instead of using a <code>switch-case</code> block, we simply return the <code>&quot;note&quot;</code> to all instances as both one-dollar and two-dollar are note. As for the quarter, we could treat that instance as an anonymous class and override this <code>getType()</code> method to return <code>&quot;coin&quot;</code>:</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">Currency</span> <span class="token punctuation">{</span>\n    <span class="token function">QUARTER</span><span class="token punctuation">(</span><span class="token number">0.25</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token annotation punctuation">@Override</span>\n        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token string">"coin"</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token function">ONE_DOLLAR</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">FIVE_DOLLAR</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token keyword">double</span> value<span class="token punctuation">;</span>\n\n    <span class="token class-name">Currency</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token keyword">double</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> value<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token string">"note"</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></pre>  \n</div><p>This block after the <code>QUARTER</code> instance is called <em>constant specific class body</em>. This pair of braces is just like the body to a class, where all methods could be overridden, and the <code>@Override</code> annotation is optional - just like with any class overriden methods.</p>\n<h2>\n  <a id="abstract-methods" class="anchor" aria-hidden="true" href="#abstract-methods">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Abstract Methods</h2><p>Can enum be abstract? The answer is <strong>NO</strong>. However, enum class methods could be abstract. To fulfill the contract of a concrete class with abstract methods, these abstract methods must be overridden for all its instances.</p>\n<p>If we change the above code to define an abstract <code>getType()</code> instead, we must override this method for all instances of this enum class:</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">Currency</span> <span class="token punctuation">{</span>\n    <span class="token function">QUARTER</span><span class="token punctuation">(</span><span class="token number">0.25</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token annotation punctuation">@Override</span>\n        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token string">"coin"</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token function">ONE_DOLLAR</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token annotation punctuation">@Override</span>\n        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token string">"note"</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token function">FIVE_DOLLAR</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token annotation punctuation">@Override</span>\n        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token string">"note"</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token keyword">double</span> value<span class="token punctuation">;</span>\n\n    <span class="token class-name">Currency</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token keyword">double</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> value<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">String</span> <span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></pre>  \n</div>'}}/>
    </${s}>`}