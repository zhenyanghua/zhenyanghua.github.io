import{m as a}from"../index.f7c0c5b6.js";import"./time.daaab1ba.js";import{P as n}from"./index.ad101fb9.js";export default function(){return a`<${n} ...${{title:"Reload Configurations from Spring Cloud Config",date:"2018-11-13 17:00:00"}}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="spring-cloud-config-server-automatically-retrieves-specified-configurations-backed-on-git-based-repository-to-ask-the-affected-spring-cloud-config-clients-to-use-the-updated-configuration-a-signal-needs-to-be-sent-to-the-client-this-article-shows-two-approaches-" class="anchor" aria-hidden="true" href="#spring-cloud-config-server-automatically-retrieves-specified-configurations-backed-on-git-based-repository-to-ask-the-affected-spring-cloud-config-clients-to-use-the-updated-configuration-a-signal-needs-to-be-sent-to-the-client-this-article-shows-two-approaches-">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Spring Cloud Config Server automatically retrieves specified configurations backed on Git based Repository. To ask the affected Spring Cloud Config clients to use the updated configuration, a signal needs to be sent to the client. This article shows two approaches.</h2><h2>\n  <a id="one-to-one-approach" class="anchor" aria-hidden="true" href="#one-to-one-approach">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>One to One Approach</h2><p>With Spring Actuator project, we get a series of utility tools for administering the server. One of them is <code>/refresh</code>, upon calling this endpoint, if the application context is annotated with <code>@RefreshScope</code>, it will be signaled to refresh. This endpoint is called on the client application.</p>\n<p>Add the following dependency to the client application, and annotate the application with <code>@RefreshScope</code>.</p>\n<div class="codeblock">\n  <pre class="language-xml"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span></pre>  \n</pre><p>For instance, given the configuration server is on <em>localhost:8888</em> and the configuration client is on <em>localhost:8081</em>, to refresh the configuration on the client, an HTTP request should be made to <em>localhost:8081/refresh</em>.</p>\n<h2>\n  <a id="one-to-many-approach" class="anchor" aria-hidden="true" href="#one-to-many-approach">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>One to Many Approach</h2><p>Using the <code>/refresh</code> endpoint works but when there are multiple client applications that need to be refreshed, it will be hard to maintain such a list. Of course, there is another project from Spring Cloud existing to solve this problem - Spring Cloud Config Monitor. With this project and if the Spring Cloud Bus project is also added as a dependency, it adds additional endpoint <code>/monitor</code> to the configuration server, which sends a message to a message broker and then broadcasts it to all subscribed clients.</p>\n<p>Spring Cloud Bus works as a service bus to exchange messages from the message broker between clients and servers. The monitor endpoint is used to broadcast the changes to all spring cloud config clients that are annotated with <code>@RefreshScope</code>. <strong>Both servers and clients depend on the service bus to exchange the message.</strong>, so we need to add the Spring Cloud Bus dependency to both servers and clients.</p>\n<p>In the following example, we will be using RabbitMQ as the message broker.</p>\n<h3>\n  <a id="1-cloud-config-server" class="anchor" aria-hidden="true" href="#1-cloud-config-server">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>1. Cloud Config Server</h3><p>Add the following dependencies to the configuration server:</p>\n<div class="codeblock">\n  <pre class="language-xml"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-config-monitor<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-bus-amqp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span></pre>  \n</pre><p>RabbitMQ configuration</p>\n<div class="codeblock">\n  <pre>spring:\n  rabbitmq:\n    host: localhost\n    port: 5672\n    username: guest\n    password: guest</pre>\n</div><h4>\n  <a id="1-1-github-backed-configuration-repository" class="anchor" aria-hidden="true" href="#1-1-github-backed-configuration-repository">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>1.1 GitHub backed configuration repository</h4><div class="codeblock">\n  <pre>monitor:\n  github:\n    enabled: true</pre>\n</div><p>Add a <code>PropertyPathNotificationExtractor</code> Bean to the configuration server:</p>\n<div class="codeblock">\n  <pre>@Bean\npublic GithubPropertyPathNotificationExtractor bitbucketPropertyPathNotificationExtractor() {\n    return new BitbucketPropertyPathNotificationExtractor();\n}</pre>\n</div><h4>\n  <a id="1-2-gitlab-backed-configuration-repository" class="anchor" aria-hidden="true" href="#1-2-gitlab-backed-configuration-repository">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>1.2 GitLab backed configuration repository</h4><div class="codeblock">\n  <pre>monitor:\n  gitlab:\n    enabled: true</pre>\n</div><p>Add a <code>PropertyPathNotificationExtractor</code> Bean to the configuration server:</p>\n<div class="codeblock">\n  <pre>@Bean\npublic GitlabPropertyPathNotificationExtractor bitbucketPropertyPathNotificationExtractor() {\n    return new BitbucketPropertyPathNotificationExtractor();\n}</pre>\n</div><h4>\n  <a id="1-3-bitbucket-backed-configuration-repository" class="anchor" aria-hidden="true" href="#1-3-bitbucket-backed-configuration-repository">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>1.3 BitBucket backed configuration repository</h4><div class="codeblock">\n  <pre>monitor:\n  bitbucket:\n    enabled: true</pre>\n</div><p>Add a <code>PropertyPathNotificationExtractor</code> Bean to the configuration server:</p>\n<div class="codeblock">\n  <pre>@Bean\npublic BitbucketPropertyPathNotificationExtractor bitbucketPropertyPathNotificationExtractor() {\n    return new BitbucketPropertyPathNotificationExtractor();\n}</pre>\n</div><h3>\n  <a id="2-cloud-config-clients" class="anchor" aria-hidden="true" href="#2-cloud-config-clients">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>2. Cloud Config Clients</h3><p>Add the following dependencies to the configuration clients:</p>\n<div class="codeblock">\n  <pre class="language-xml"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>\n   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>\n   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-bus-amqp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span></pre>  \n</pre><p>RabbitMQ configuration</p>\n<div class="codeblock">\n  <pre>spring:\n  rabbitmq:\n    host: localhost\n    port: 5672\n    username: guest\n    password: guest</pre>\n</div><h3>\n  <a id="3-webhooks-simulation" class="anchor" aria-hidden="true" href="#3-webhooks-simulation">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>3. WebHooks Simulation</h3><p>Sometimes it is not easy to register a webhook from a remote git repository directly to your local development environment, but to simulate what the webhook does, we could manually make a <code>POST</code> request to the configuration server <code>/monitor</code> endpoint with the git vendor specific webhook request header and body to indicate a push has been made to the remote git repository.</p>\n<p>The different implementations of the <code>PropertyPathNotificationExtractor</code> interface extract the changed configuration YAML files from the vendor-specific request headers and body and map them to an array of paths to those YAML files relative to the repository.</p>\n<p>The following sections demo some examples of calling the <code>/monitor</code> endpoint on the configuration server with the vendor-specific WebHooks requests headers and body from GitHub, GitLab, and BitBucket</p>\n<h4>\n  <a id="3-1-github-backed-configuration-repository" class="anchor" aria-hidden="true" href="#3-1-github-backed-configuration-repository">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>3.1 GitHub backed configuration repository</h4><div class="codeblock">\n  <pre>curl -X POST   http://localhost:8888/monitor   -H &#39;Content-Type: application/json&#39;   -H &#39;X-GitHub-Event: push&#39;   -d &#39;{\n    &quot;commits&quot;: [\n        {\n            &quot;modified&quot;: [\n                &quot;client-service-dev.yml&quot;\n            ]\n        }\n    ]\n\n}&#39;</pre>\n</div><h4>\n  <a id="3-2-gitlab-backed-configuration-repository" class="anchor" aria-hidden="true" href="#3-2-gitlab-backed-configuration-repository">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>3.2 GitLab backed configuration repository</h4><div class="codeblock">\n  <pre>curl -X POST   http://localhost:8888/monitor   -H &#39;Content-Type: application/json&#39;   -H &#39;X-Gitlab-Event: Push Hook&#39;   -d &#39;{\n    &quot;commits&quot;: [\n        {\n            &quot;modified&quot;: [\n                &quot;client-service-dev.yml&quot;\n            ]\n        }\n    ]\n\n}&#39;</pre>\n</div><h4>\n  <a id="3-3-bitbucket-backed-configuration-repository" class="anchor" aria-hidden="true" href="#3-3-bitbucket-backed-configuration-repository">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>3.3 BitBucket backed configuration repository</h4><div class="codeblock">\n  <pre>curl -X POST   http://localhost:8888/monitor   -H &#39;Content-Type: application/json&#39;   -H &#39;X-Event-Key: repo:push&#39;   -H &#39;X-Hook-UUID: 1&#39;   -d &#39;{\n    &quot;push&quot;: {\n        &quot;changes&quot;: [\n            &quot;client-service-dev.yml&quot;\n        ]\n    }\n}&#39;</pre>\n</div>'}}/>
    </${n}>`}