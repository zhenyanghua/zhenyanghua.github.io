import{y as t,m as e}from"../index.e7d414ad.js";import"./time.daaab1ba.js";import{P as a}from"./index.ce630727.js";const n=[];export default function(){return t(()=>{n.forEach(t=>new Function(t)())},[]),e`<${a} ...${{title:"WebMethods Implicit and Explicit Transaction Management",date:"2018-11-13 17:00:00"}} summary=${"<p>It is not documented from any of the WebMethods resources that how to manage transactions implicitly and explicitly. This tip shows the missing piece that will prevent a transaction holding a connection until the transaction owner thread is killed.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<p>Imagine a case you have to do the following operations:</p>\n<ol>\n<li>Execute a stored procedure that takes a data table as input parameters. (ExecuteService adapter)</li>\n</ol>\n<hr>\n<ol start="2">\n<li>Query a table (Select adapter)</li>\n<li>Update the table A (Update adapter)</li>\n<li>Update the table B (Update adapter)</li>\n</ol>\n<hr>\n<p>step 2-4 must be realized in together.</p>\n<p>With a typical Java workflow, a transaction will be wrapped around the step 2-4 to make sure when any of the steps fail, the changes made within this transaction gets rolled back.</p>\n<p>In WebMethods, JDBC connections are managed by a connection pool. When an adapter service is run, if the adapter service is created from the same connection, then it will attempt to acquire the connection from the pool. If there is no active connection, it the connection pool will create a connection and assign it to the adapter service, meanwhile, any other adapter that created from the same connection must wait for the first adapter to release connection before they can send statements through JDBC to the database.</p>\n<p>On the other hand, an <code>ExecuteService</code> adapter will similarly acquire connection programmatically from the pipeline and put a hold on the connection until the session is over.</p>\n<p>Let&#39;s now wrap the above use case with the transaction block.</p>\n<ol>\n<li>Execute a stored procedure that takes a data table as input parameters. (ExecuteService adapter)</li>\n</ol>\n<hr>\n<ol start="2">\n<li>transaction starts</li>\n<li>Query a table (Select adapter)</li>\n<li>Update the table A (Update adapter)</li>\n<li>Update the table B (Update adapter)</li>\n<li>transaction commit/rollback</li>\n</ol>\n<hr>\n<p>The above workflow seems promising, but we might forget something. There are actually two transaction blocks above -- one is implicit, and the other is explicit.</p>\n<p>Step 1 is wrapped by an implicit transaction block that will start the transaction before the step1 is run, and will end the transaction when the flow service ends, which is after step 6 (Not step 1). The above workflow with implicit transaction could be translated to the following:</p>\n<ol>\n<li>Outer transaction starts implicitly</li>\n<li>Execute a stored procedure that takes a data table as input parameters. (ExecuteService adapter)</li>\n</ol>\n<hr>\n<ol start="3">\n<li>Inner transaction starts</li>\n<li>Query a table (Select adapter)</li>\n<li>Update the table A (Update adapter)</li>\n<li>Update the table B (Update adapter)</li>\n<li>Inner transaction commit/rollback</li>\n</ol>\n<hr>\n<ol start="8">\n<li>Outer transaction commit/rollback implicitly</li>\n</ol>\n<p>Remember we haven&#39;t changed any workflow yet. The connection acquired from the above workflow is going to hang after step 3. It turns out webMethods doesn&#39;t like a mixed-use of transaction management.\nIt either has to be all implicit or all explicit within the same thread that runs the transaction.</p>\n<p>To make it work with WebMethods, we must change the above to the following:</p>\n<ol>\n<li>Transaction 1 starts</li>\n<li>Execute a stored procedure that takes a data table as input parameters. (ExecuteService adapter)</li>\n<li>Transaction 1 commit/rollback</li>\n</ol>\n<hr>\n<ol start="4">\n<li>Transaction 2 starts</li>\n<li>Query a table (Select adapter)</li>\n<li>Update the table A (Update adapter)</li>\n<li>Update the table B (Update adapter)</li>\n<li>Transaction 2 commit/rollback</li>\n</ol>\n<hr>\n<h2>\n  <a id="conclusion" class="anchor" aria-hidden="true" href="#conclusion">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Conclusion</h2><p>Use only one style of transaction management -- either explicitly or implicitly within the same thread, not both.</p>\n'}}/>
    </${a}>`}