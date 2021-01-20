import{y as e,m as n}from"../index.fb005576.js";import"./time.daaab1ba.js";import{P as a}from"./index.bd5cdb53.js";const t=[];export default function(){return e(()=>{t.forEach(e=>new Function(e)())},[]),n`<${a} ...${{title:"Docker Useful Commands",date:"2018-11-06T17:00:00.000Z"}} summary=${"<p>This article shows a curated list of docker commands that may be useful.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="inspect-container-and-filter-by-its-property" class="anchor" aria-hidden="true" href="#inspect-container-and-filter-by-its-property">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Inspect container and filter by its property</h2><div class="codeblock">\n  <pre>docker inspect -f &#39;{{ .NetworkSettings.IPAddress }}&#39; container_name</pre>\n</div><h2>\n  <a id="detached-and-interactive-terminal" class="anchor" aria-hidden="true" href="#detached-and-interactive-terminal">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Detached and interactive terminal</h2><p>Run a nginx container in a detached interactive terminal that maps the host port 8088 to the nginx webserver port\nand open a shell in the interactive terminal.</p>\n<div class="codeblock">\n  <pre>docker run -dit --name my-nginx -p 8088:80 nginx /bin/bash </pre>\n</div><p>Enter the shell</p>\n<div class="codeblock">\n  <pre>docker attach my-nginx</pre>\n</div><p>Exit the shell while keeping the nginx running</p>\n<p><kbd>Ctl+P</kbd>, <kbd>Ctl+Q</kbd></p>\n'}}/>
    </${a}>`}