import{y as e,m as t}from"../index.97203252.js";import"./time.daaab1ba.js";import{P as n}from"./index.6b483cbe.js";const a=[];export default function(){return e(()=>{a.forEach(e=>new Function(e)())},[]),t`<${n} ...${{title:"Exception Handling in WebMethods",date:"2018-10-10T17:00:00.000Z"}} summary=${"<p><code>Try-Catch</code> block is commonly used to try a risky operation and catch the exception it may raise. This article shows the trick to do the similar thing without writing java code in a flow service with WebMethods.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<p>The following flow service sequence is an alternative to a <code>Try-Catch</code> block.</p>\n<img src="https://image.ibb.co/iZXAGz/try_catch_sequence.png" alt="Try-Catch Sequence" class="ui big image" />\n\n<p>Figure 1. Try-Catch Sequence in WebMethods</p>\n<h2>\n  <a id="sequence" class="anchor" aria-hidden="true" href="#sequence">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Sequence</h2><p>The outer sequence exits on success; the first inner sequence exits on failure and the second inner sequence exits on done.</p>\n<p>A sequence block consists of any number of operations that needs to be executed in the placed order. There are three options available for instructing a sequence to exit - <code>FAILURE</code> (default), <code>SUCCESS</code> and <code>DONE</code>. When a sequence exits, the next closest sibling statement or sequence will be executed unless the enclosing sequence instructs to exit on success.</p>\n<h3>\n  <a id="try-block" class="anchor" aria-hidden="true" href="#try-block">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Try Block</h3><p>In the above case, if the risky operation <code>pub.flow:debugLog (first)</code> runs successfully, the <code>SEQUENCE (exit on failure)</code> will exit until the last statement is run, and exit normally. Because the enclosing <code>SEQUENCE (exit on success)</code> receives the successful indication from the first inner sequence, the enclosing sequence exits, and the second inner sequence will not execute.</p>\n<h3>\n  <a id="catch-block" class="anchor" aria-hidden="true" href="#catch-block">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Catch Block</h3><p>If the risky operation <code>pub.flow:debugLog (first)</code> fails, the first inner sequence will exit and because it is not a successful exit, the enclosing sequence will continue to execute the next statement or sequence, and then the second sequence <code>SEQUENCE (exit on done)</code> executes.</p>\n<h2>\n  <a id="other-thoughts" class="anchor" aria-hidden="true" href="#other-thoughts">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Other thoughts</h2><p>The <code>Try-Catch</code> sequence is useful in wrapping many risky operations such as the out-of-box <code>http</code> client, <code>jms</code> client. However, this pattern prevents any type of exception propagating to the caller operation.  Sometimes a risky operation needs to be retried with WebMethods built-in retry feature, hence make sure the <code>ISRuntimeException</code> is rethrown to allow this exception to propagate to the top-level service.</p>\n'}}/>
    </${n}>`}