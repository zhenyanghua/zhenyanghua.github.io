import{y as e,m as a}from"../index.e9c051ac.js";import"./time.daaab1ba.js";import{P as t}from"./index.0e302060.js";const n=[];export default function(){return e(()=>{n.forEach(e=>new Function(e)())},[]),a`<${t} ...${{title:"How to Setup ELK Stack with Docker for Development",date:"2018-11-13T17:00:00.000Z"}} summary=${"<p>This tip shows the fastest way to stand up the <em>ELK</em> stack for development.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<p>The Elastic stack has a nice <a href="https://www.docker.elastic.co" target="_blank">website</a> that provides the links to the docker images and documentation. In this example, I am using the latest version as this article is written - v6.4.3 for all the elastic stack.</p>\n<h2>\n  <a id="1-run-elasticsearch" class="anchor" aria-hidden="true" href="#1-run-elasticsearch">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>1. Run ElasticSearch</h2><div class="codeblock">\n  <pre>docker run -d --name my-es -p 9200:9200 -p 9300:9300 -e &quot;discovery.type=single-node&quot; docker.elastic.co/elasticsearch/elasticsearch:6.4.3</pre>\n</div><p>After the container starts running, find out the internal docker IP the ElasticSearch server is using. This will be used for configuring the Logstash and Kibana.</p>\n<div class="codeblock">\n  <pre>docker inspect -f &#39;{{ .NetworkSettings.IPAddress }}&#39; my-es</pre>\n</div><h2>\n  <a id="2-run-logstash" class="anchor" aria-hidden="true" href="#2-run-logstash">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>2. Run Logstash</h2><p>Create a configuration file in the host directory, and bind mount to the container configuration file.</p>\n<div class="codeblock">\n  <pre>vim ~/elk/config/logstash.conf </pre>\n</div><p>Enter the following and save with <code>:wq</code>. Note that we created an index pattern that starts with <code>leafyjava-</code>.</p>\n<div class="codeblock">\n  <pre>input {\n    tcp {\n        port =&gt; 5050\n        codec =&gt; json\n    }\n}\n\noutput {\n    elasticsearch {\n        hosts =&gt; [&quot;http://172.17.0.7:9200&quot;]\n        index =&gt; &quot;leafyjava-%{appName}&quot;\n    }\n}</pre>\n</div><p>Run the container. We need to use <code>-f</code> flag to ask Logstash to use the config file we just bound.</p>\n<div class="codeblock">\n  <pre>docker run -d --name my-logstash -p 5050:5050 -v ~/elk/config/logstash.conf:/config-dir/logstash.conf docker.elastic.co/logstash/logstash:6.4.3 -f /config-dir/logstash.conf</pre>\n</div><h2>\n  <a id="3-run-kibana" class="anchor" aria-hidden="true" href="#3-run-kibana">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>3. Run Kibana</h2><div class="codeblock">\n  <pre>docker run -d --name my-kibana -e &quot;ELASTICSEARCH_URL=http://172.17.0.7:9200&quot; -p 5601:5601 docker.elastic.co/kibana/kibana:6.4.3</pre>\n</div><p>Go to <code>localhost:5601</code>, and you will see the Kibana console up and running. Now you are ready for integrating your applications to use this elastic stack.</p>\n'}}/>
    </${t}>`}