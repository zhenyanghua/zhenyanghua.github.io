import{m as e}from"../index.f7c0c5b6.js";import"./time.daaab1ba.js";import{P as t}from"./index.ad101fb9.js";export default function(){return e`<${t} ...${{title:"Wrap A Command with Builder Pattern",date:"2018-12-19 17:00:00"}}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="this-article-shows-a-well-designed-way-to-wrap-a-command-and-expose-it-through-api-with-the-classic-builder-pattern-in-this-tutorial-you-will-learn-how-to-write-the-builder-pattern-and-how-to-direct-standard-output-stream-and-standard-error-stream-from-the-command-to-the-input-stream-of-your-api-" class="anchor" aria-hidden="true" href="#this-article-shows-a-well-designed-way-to-wrap-a-command-and-expose-it-through-api-with-the-classic-builder-pattern-in-this-tutorial-you-will-learn-how-to-write-the-builder-pattern-and-how-to-direct-standard-output-stream-and-standard-error-stream-from-the-command-to-the-input-stream-of-your-api-">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>This article shows a well-designed way to wrap a command and expose it through API with the classic Builder pattern. In this tutorial, you will learn how to write the Builder pattern, and how to direct standard output stream and standard error stream from the command to the input stream of your API.</h2><p>In a scenario that we have this command line application that will send some information to a server developed using some exotic framework or in a completely a different programming language, which increase the difficulty to reference it directly in your client application. It is used so often in the integration test that you feel the strong need to convert it to an API so that your projects could use it directly from your code without the knowledge on what exactly the correct command line is to have it send the correct information. If this scenario is too complicated for you, let&#39;s just say you want to run a command that execute a jar file with some command line arguments. Usually, you would do something like this:</p>\n<div class="codeblock">\n  <pre>java -jar hello-world.jar --foo=bar</pre>\n</div><p>That will do the job. But if you want to invoke it from your java application and pass in various configuration arguments, you will likely constructor a string and then execute it from the runtime:</p>\n<div class="codeblock">\n  <pre>String cmd = String.format(&quot;java -jar &quot;%s&quot;&quot; +\n                        &quot; --meter.feature-service=&quot;%s&quot;&quot; +\n                        &quot; --meter.description=&quot;%s&quot;&quot; +\n                        &quot; --meter.manufacture=&quot;%s&quot;&quot; +\n                        &quot; --meter.model-number=&quot;%s&quot;&quot; +\n                        &quot; --meter.lifecycle-status.recruited=&quot;%s&quot;&quot; +\n                        &quot; --meter.lifecycle-status.decommissioned=&quot;%s&quot;&quot; +\n                        &quot; --meter.total.recruited=%d&quot; +\n                        &quot; --meter.total.decommissioned=%d&quot;,\n                path,\n                featureService,\n                description,\n                manufacture,\n                model,\n                lifecycleRecruited,\n                lifecycleDecommissioned,\n                totalRecruited,\n                totalDecommissioned);\n\nProcess process = Runtime.getRuntime().exec(cmd);</pre>\n</div><p>This is a good start because we already start to externalize the key parameters to provide limit flexibility to the client. In the above example, there are many configurable properties needs to be passed in from the client. We could have just created a number of setters with an empty argument constructor leave the rest to the client, but we are better than this. There are two improvements we could do.</p>\n<ol>\n<li><p>Use Builder Pattern for Object Creation. A classic way to implement the Builder pattern is to use a nested class (static inner class) and make the constructor of the class of the object you want to build private. This way, we could assign default values to the optional parameters and enforce required parameters through the Builder constructor.</p>\n</li>\n<li><p>Direct the output stream from the target command to the input stream of the current program.</p>\n</li>\n</ol>\n<p>Here is an example of the Builder pattern to provide the flexibility and minimal client code for clients to use.</p>\n<div class="codeblock">\n  <pre>public class MeterSimulator {\n    private String path;\n    private String featureService;\n    private String description;\n    private String manufacture;\n    private String model;\n    private String lifecycleRecruited;\n    private String lifecycleDecommissioned;\n    private int totalRecruited;\n    private int totalDecommissioned;\n\n    public static class Builder {\n        // Required\n        private String path;\n\n        // Optional\n        private String featureService = &quot;https://example.com/arcgis/rest/services/MeterMiles/FeatureServer/1&quot;;\n        private String description = &quot;abcdefghijklmnopqrstuvwxyz&quot;;\n        private String manufacture = &quot;ACME&quot;;\n        private String model = &quot;Integration&quot;;\n        private String lifecycleRecruited = &quot;New&quot;;\n        private String lifecycleDecommissioned = &quot;Decom&quot;;\n        private int totalRecruited = 0;\n        private int totalDecommissioned = 0;\n\n        /**\n         * constructor\n         * @param path path to the meter-simulate.jar\n         */\n        public Builder(String path) {\n            this.path = path;\n        }\n\n        public Builder withFeatureService(String featureService) {\n            this.featureService = featureService;\n            return this;\n        }\n\n        public Builder withDescription(String description) {\n            this.description = description;\n            return this;\n        }\n\n        public Builder withManufacture(String manufacture) {\n            this.manufacture = manufacture;\n            return this;\n        }\n\n        public Builder withModel(String model) {\n            this.model = model;\n            return this;\n        }\n\n        public Builder withLifecycleRecruited(String lifecycleRecruited) {\n            this.lifecycleRecruited = lifecycleRecruited;\n            return this;\n        }\n\n        public Builder withLifecycleDecommissioned(String lifecycleDecommissioned) {\n            this.lifecycleDecommissioned = lifecycleDecommissioned;\n            return this;\n        }\n\n        public Builder withTotalRecruited(int totalRecruited) {\n            this.totalRecruited = totalRecruited;\n            return this;\n        }\n\n        public Builder withTotalDecommissioned(int totalDecommissioned) {\n            this.totalDecommissioned = totalDecommissioned;\n            return this;\n        }\n\n        public MeterSimulator build() {\n            return new MeterSimulator(this);\n        }\n    }\n\n    public void call() throws Exception {\n        String cmd = String.format(&quot;java -jar &quot;%s&quot;&quot; +\n                        &quot; --meter.feature-service=&quot;%s&quot;&quot; +\n                        &quot; --meter.description=&quot;%s&quot;&quot; +\n                        &quot; --meter.manufacture=&quot;%s&quot;&quot; +\n                        &quot; --meter.model-number=&quot;%s&quot;&quot; +\n                        &quot; --meter.lifecycle-status.recruited=&quot;%s&quot;&quot; +\n                        &quot; --meter.lifecycle-status.decommissioned=&quot;%s&quot;&quot; +\n                        &quot; --meter.total.recruited=%d&quot; +\n                        &quot; --meter.total.decommissioned=%d&quot;,\n                path,\n                featureService,\n                description,\n                manufacture,\n                model,\n                lifecycleRecruited,\n                lifecycleDecommissioned,\n                totalRecruited,\n                totalDecommissioned);\n\n        Process process = Runtime.getRuntime().exec(cmd);\n\n        // Redirect output stream of the command to the input stream of current program\n        try(BufferedReader stdIn = new BufferedReader(new InputStreamReader(process.getInputStream()));\n            BufferedReader stdErr = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {\n\n            String s;\n\n            while((s = stdIn.readLine()) != null) {\n                System.out.println(s);\n            }\n\n            while ((s = stdErr.readLine()) != null) {\n                System.err.println(s);\n            }\n        }\n    }\n\n    private MeterSimulator(Builder builder) {\n        this.path = builder.path;\n        this.featureService = builder.featureService;\n        this.description = builder.description;\n        this.manufacture = builder.manufacture;\n        this.model = builder.model;\n        this.lifecycleRecruited = builder.lifecycleRecruited;\n        this.lifecycleDecommissioned = builder.lifecycleDecommissioned;\n        this.totalRecruited = builder.totalRecruited;\n        this.totalDecommissioned = builder.totalDecommissioned;\n    }\n}</pre>\n</div><p>Finally, by using the Builder pattern, we tremendously simplified the client&#39;s action to use the wrapped command. Here is the usage:</p>\n<div class="codeblock">\n  <pre>MeterSimulator meterSimulator = new MeterSimulator.Builder(METER_SIMULATOR_PATH)\n                .withManufacture(&quot;Zebra&quot;)\n                .withDescription(&quot;From Integration Test&quot;)\n                .withModel(&quot;foo1&quot;)\n                .withTotalDecommissioned(10)\n                .build();\nmeterSimulator.call();</pre>\n</div>'}}/>
    </${t}>`}