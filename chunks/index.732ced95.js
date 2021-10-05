import{y as n,m as e}from"../index.28c2bd9d.js";import"./time.daaab1ba.js";import{P as a}from"./index.b970a4e4.js";const o=[];export default function(){return n(()=>{o.forEach(n=>new Function(n)())},[]),e`<${a} ...${{title:"Creating a Library Project for Spring Boot",date:"2019-01-07T17:00:00.000Z"}} summary=${"<p>This article introduces the key points when creating a library for spring boot project.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<p>It could be common that over the years you have created a number of services that could be reused by other spring projects. It then makes sense to make the reusable modules such as a library and install it in your local repository for later use.</p>\n<p>Here are the key points to consider when building a spring boot library.</p>\n<ul>\n<li>release version</li>\n<li>build plugin</li>\n<li>dependency injection</li>\n<li>autoconfigurations</li>\n</ul>\n<h2>\n  <a id="release-version" class="anchor" aria-hidden="true" href="#release-version">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Release Version</h2><p>To guarantee spring boot works the way you expect, it is recommended to keep update the release versions of the library so that it supports some versions of the spring boot minor version. A good practice is to monitor change spring boot changelog and see if there are any conflicting dependencies that are used in the library project. If there is, introduce a new version to resolve the conflict.</p>\n<h2>\n  <a id="build-plugin" class="anchor" aria-hidden="true" href="#build-plugin">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Build Plugin</h2><p>If the projects reference this library doesn&#39;t compile through maven or gradle but still runs through IDE, it is likely the maven or gradle configuration of the library causes the problem. One cause is the presence of <code>spring-boot-maven-plugin</code>. This plugin must be removed from the dependency manager of the library project, because the library project we build doesn&#39;t need to be invoked through a command line interface, and this plugin is used to create an executable bundled jar file.</p>\n<h2>\n  <a id="dependency-injection" class="anchor" aria-hidden="true" href="#dependency-injection">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Dependency Injection</h2><p>Make sure the <code>@SpringBootApplication</code> is present in the projects that use this library so the library services could be scanned by the spring boot application.</p>\n<h2>\n  <a id="autoconfiguration" class="anchor" aria-hidden="true" href="#autoconfiguration">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Autoconfiguration</h2><p>By default, any beans defined in the classes that are annotated with <code>@Configuration</code> are the ones will be used if else no others are defined in the applications that use this library and the autoconfiguration is enabled. Spring boot allows conditionally enable autoconfiguration on both class and method level.</p>\n<p>For example, to enable a configuration class only when the value of the property <code>application.session.filter</code> is <code>true</code>, we could use the <code>@ConditionalOnProperty</code> annotation:</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token annotation punctuation">@Configuration</span>\n<span class="token annotation punctuation">@ConditionalOnProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"application.session.filter"</span><span class="token punctuation">,</span> havingValue <span class="token operator">=</span> <span class="token string">"true"</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HttpSessionAutoConfiguration</span> <span class="token punctuation">{</span>\n    <span class="token comment">//...</span>\n<span class="token punctuation">}</span></pre>  \n</div><p>In addition, if we could use <code>@ConditionalOnMissingBean</code> on a method only if the annotated bean is missing the application:</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token annotation punctuation">@Bean</span>\n<span class="token annotation punctuation">@ConditionalOnMissingBean</span>\n<span class="token keyword">public</span> <span class="token class-name">AbstractMongoSessionConverter</span> <span class="token function">jdkMongoSessionConverter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">JdkMongoSessionConverter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></pre>  \n</div><p>The above concepts apply on both Spring boot 1.x and Spring boot 2.x.</p>\n'}}/>
    </${a}>`}