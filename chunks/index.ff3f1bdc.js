import{m as n}from"../index.4d2539ec.js";import"./time.daaab1ba.js";import{P as s}from"./index.84505282.js";export default function(){return n`<${s} ...${{title:"Wrap A Command with Builder Pattern",date:"2018-12-19 17:00:00"}} summary=${"<p>This article shows a well-designed way to wrap a command and expose it through API with the classic Builder pattern. In this tutorial, you will learn how to write the Builder pattern, and how to direct standard output stream and standard error stream from the command to the input stream of your API.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<p>In a scenario that we have this command line application that will send some information to a server developed using some exotic framework or in a completely a different programming language, which increase the difficulty to reference it directly in your client application. It is used so often in the integration test that you feel the strong need to convert it to an API so that your projects could use it directly from your code without the knowledge on what exactly the correct command line is to have it send the correct information. If this scenario is too complicated for you, let&#39;s just say you want to run a command that execute a jar file with some command line arguments. Usually, you would do something like this:</p>\n<div class="codeblock">\n  <pre>java -jar hello-world.jar --foo=bar</pre>\n</div><p>That will do the job. But if you want to invoke it from your java application and pass in various configuration arguments, you will likely constructor a string and then execute it from the runtime:</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token class-name">String</span> cmd <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"java -jar "%s""</span> <span class="token operator">+</span>\n                        <span class="token string">" --meter.feature-service="%s""</span> <span class="token operator">+</span>\n                        <span class="token string">" --meter.description="%s""</span> <span class="token operator">+</span>\n                        <span class="token string">" --meter.manufacture="%s""</span> <span class="token operator">+</span>\n                        <span class="token string">" --meter.model-number="%s""</span> <span class="token operator">+</span>\n                        <span class="token string">" --meter.lifecycle-status.recruited="%s""</span> <span class="token operator">+</span>\n                        <span class="token string">" --meter.lifecycle-status.decommissioned="%s""</span> <span class="token operator">+</span>\n                        <span class="token string">" --meter.total.recruited=%d"</span> <span class="token operator">+</span>\n                        <span class="token string">" --meter.total.decommissioned=%d"</span><span class="token punctuation">,</span>\n                path<span class="token punctuation">,</span>\n                featureService<span class="token punctuation">,</span>\n                description<span class="token punctuation">,</span>\n                manufacture<span class="token punctuation">,</span>\n                model<span class="token punctuation">,</span>\n                lifecycleRecruited<span class="token punctuation">,</span>\n                lifecycleDecommissioned<span class="token punctuation">,</span>\n                totalRecruited<span class="token punctuation">,</span>\n                totalDecommissioned<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Process</span> process <span class="token operator">=</span> <span class="token class-name">Runtime</span><span class="token punctuation">.</span><span class="token function">getRuntime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>cmd<span class="token punctuation">)</span><span class="token punctuation">;</span></pre>  \n</pre><p>This is a good start because we already start to externalize the key parameters to provide limit flexibility to the client. In the above example, there are many configurable properties needs to be passed in from the client. We could have just created a number of setters with an empty argument constructor leave the rest to the client, but we are better than this. There are two improvements we could do.</p>\n<ol>\n<li><p>Use Builder Pattern for Object Creation. A classic way to implement the Builder pattern is to use a nested class (static inner class) and make the constructor of the class of the object you want to build private. This way, we could assign default values to the optional parameters and enforce required parameters through the Builder constructor.</p>\n</li>\n<li><p>Direct the output stream from the target command to the input stream of the current program.</p>\n</li>\n</ol>\n<p>Here is an example of the Builder pattern to provide the flexibility and minimal client code for clients to use.</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MeterSimulator</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> path<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> featureService<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> description<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> manufacture<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> model<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> lifecycleRecruited<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> lifecycleDecommissioned<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> totalRecruited<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> totalDecommissioned<span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Builder</span> <span class="token punctuation">{</span>\n        <span class="token comment">// Required</span>\n        <span class="token keyword">private</span> <span class="token class-name">String</span> path<span class="token punctuation">;</span>\n\n        <span class="token comment">// Optional</span>\n        <span class="token keyword">private</span> <span class="token class-name">String</span> featureService <span class="token operator">=</span> <span class="token string">"https://example.com/arcgis/rest/services/MeterMiles/FeatureServer/1"</span><span class="token punctuation">;</span>\n        <span class="token keyword">private</span> <span class="token class-name">String</span> description <span class="token operator">=</span> <span class="token string">"abcdefghijklmnopqrstuvwxyz"</span><span class="token punctuation">;</span>\n        <span class="token keyword">private</span> <span class="token class-name">String</span> manufacture <span class="token operator">=</span> <span class="token string">"ACME"</span><span class="token punctuation">;</span>\n        <span class="token keyword">private</span> <span class="token class-name">String</span> model <span class="token operator">=</span> <span class="token string">"Integration"</span><span class="token punctuation">;</span>\n        <span class="token keyword">private</span> <span class="token class-name">String</span> lifecycleRecruited <span class="token operator">=</span> <span class="token string">"New"</span><span class="token punctuation">;</span>\n        <span class="token keyword">private</span> <span class="token class-name">String</span> lifecycleDecommissioned <span class="token operator">=</span> <span class="token string">"Decom"</span><span class="token punctuation">;</span>\n        <span class="token keyword">private</span> <span class="token keyword">int</span> totalRecruited <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n        <span class="token keyword">private</span> <span class="token keyword">int</span> totalDecommissioned <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n\n        <span class="token comment">/**\n         * constructor\n         * @param path path to the meter-simulate.jar\n         */</span>\n        <span class="token keyword">public</span> <span class="token class-name">Builder</span><span class="token punctuation">(</span><span class="token class-name">String</span> path<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>path <span class="token operator">=</span> path<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">withFeatureService</span><span class="token punctuation">(</span><span class="token class-name">String</span> featureService<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>featureService <span class="token operator">=</span> featureService<span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">withDescription</span><span class="token punctuation">(</span><span class="token class-name">String</span> description<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>description <span class="token operator">=</span> description<span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">withManufacture</span><span class="token punctuation">(</span><span class="token class-name">String</span> manufacture<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>manufacture <span class="token operator">=</span> manufacture<span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">withModel</span><span class="token punctuation">(</span><span class="token class-name">String</span> model<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>model <span class="token operator">=</span> model<span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">withLifecycleRecruited</span><span class="token punctuation">(</span><span class="token class-name">String</span> lifecycleRecruited<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>lifecycleRecruited <span class="token operator">=</span> lifecycleRecruited<span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">withLifecycleDecommissioned</span><span class="token punctuation">(</span><span class="token class-name">String</span> lifecycleDecommissioned<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>lifecycleDecommissioned <span class="token operator">=</span> lifecycleDecommissioned<span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">withTotalRecruited</span><span class="token punctuation">(</span><span class="token keyword">int</span> totalRecruited<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>totalRecruited <span class="token operator">=</span> totalRecruited<span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">withTotalDecommissioned</span><span class="token punctuation">(</span><span class="token keyword">int</span> totalDecommissioned<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>totalDecommissioned <span class="token operator">=</span> totalDecommissioned<span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">public</span> <span class="token class-name">MeterSimulator</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MeterSimulator</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n        <span class="token class-name">String</span> cmd <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"java -jar "%s""</span> <span class="token operator">+</span>\n                        <span class="token string">" --meter.feature-service="%s""</span> <span class="token operator">+</span>\n                        <span class="token string">" --meter.description="%s""</span> <span class="token operator">+</span>\n                        <span class="token string">" --meter.manufacture="%s""</span> <span class="token operator">+</span>\n                        <span class="token string">" --meter.model-number="%s""</span> <span class="token operator">+</span>\n                        <span class="token string">" --meter.lifecycle-status.recruited="%s""</span> <span class="token operator">+</span>\n                        <span class="token string">" --meter.lifecycle-status.decommissioned="%s""</span> <span class="token operator">+</span>\n                        <span class="token string">" --meter.total.recruited=%d"</span> <span class="token operator">+</span>\n                        <span class="token string">" --meter.total.decommissioned=%d"</span><span class="token punctuation">,</span>\n                path<span class="token punctuation">,</span>\n                featureService<span class="token punctuation">,</span>\n                description<span class="token punctuation">,</span>\n                manufacture<span class="token punctuation">,</span>\n                model<span class="token punctuation">,</span>\n                lifecycleRecruited<span class="token punctuation">,</span>\n                lifecycleDecommissioned<span class="token punctuation">,</span>\n                totalRecruited<span class="token punctuation">,</span>\n                totalDecommissioned<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">Process</span> process <span class="token operator">=</span> <span class="token class-name">Runtime</span><span class="token punctuation">.</span><span class="token function">getRuntime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>cmd<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// Redirect output stream of the command to the input stream of current program</span>\n        <span class="token keyword">try</span><span class="token punctuation">(</span><span class="token class-name">BufferedReader</span> stdIn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">BufferedReader</span> stdErr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span><span class="token function">getErrorStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\n            <span class="token class-name">String</span> s<span class="token punctuation">;</span>\n\n            <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>s <span class="token operator">=</span> stdIn<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n\n            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>s <span class="token operator">=</span> stdErr<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">MeterSimulator</span><span class="token punctuation">(</span><span class="token class-name">Builder</span> builder<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>path <span class="token operator">=</span> builder<span class="token punctuation">.</span>path<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>featureService <span class="token operator">=</span> builder<span class="token punctuation">.</span>featureService<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>description <span class="token operator">=</span> builder<span class="token punctuation">.</span>description<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>manufacture <span class="token operator">=</span> builder<span class="token punctuation">.</span>manufacture<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>model <span class="token operator">=</span> builder<span class="token punctuation">.</span>model<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>lifecycleRecruited <span class="token operator">=</span> builder<span class="token punctuation">.</span>lifecycleRecruited<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>lifecycleDecommissioned <span class="token operator">=</span> builder<span class="token punctuation">.</span>lifecycleDecommissioned<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>totalRecruited <span class="token operator">=</span> builder<span class="token punctuation">.</span>totalRecruited<span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>totalDecommissioned <span class="token operator">=</span> builder<span class="token punctuation">.</span>totalDecommissioned<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></pre>  \n</pre><p>Finally, by using the Builder pattern, we tremendously simplified the client&#39;s action to use the wrapped command. Here is the usage:</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token class-name">MeterSimulator</span> meterSimulator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MeterSimulator<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span>METER_SIMULATOR_PATH<span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">withManufacture</span><span class="token punctuation">(</span><span class="token string">"Zebra"</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">withDescription</span><span class="token punctuation">(</span><span class="token string">"From Integration Test"</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">withModel</span><span class="token punctuation">(</span><span class="token string">"foo1"</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">withTotalDecommissioned</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nmeterSimulator<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></pre>  \n</pre>'}}/>
    </${s}>`}