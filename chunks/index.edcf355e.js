import{y as e,m as t}from"../index.9ec869e6.js";import"./time.daaab1ba.js";import{P as a}from"./index.a45df760.js";const o=[];export default function(){return e(()=>{o.forEach(e=>new Function(e)())},[]),t`<${a} ...${{title:"Distributed Transaction Management with REST and Try Confirm/Cancel Pattern",date:"2019-04-13T17:00:00.000Z"}} summary=${"<p>This article introduces how to manage transactions effectively in distributed REST services with Try Confirm/Cancel (TCC) pattern. It also provides a repository that is a simplified Java implementation for anyone who is interested in learning the TCC pattern. This repository attempts to trim the most of the common boilerplate, but only preserve the minimal that could be most straightforward to observe this pattern. It could be adapted to use any backend stack.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="try-confirm-cancel-tcc-pattern" class="anchor" aria-hidden="true" href="#try-confirm-cancel-tcc-pattern">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Try Confirm/Cancel (TCC) Pattern</h2><p>TCC is a distributed transactions pattern that fits in the stateless REST services. It is originally proposed by Guy Pardon, the creator of Atomikos.</p>\n<h3>\n  <a id="useful-references" class="anchor" aria-hidden="true" href="#useful-references">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Useful References</h3><ul>\n<li><a href="https://www.infoq.com/presentations/Transactions-HTTP-REST">Conference Speech By Guy Pardon</a></li>\n<li><a href="https://www.atomikos.com/Blog/TransactionManagementAPIForRESTTCC">TCC for REST API (API specification)</a></li>\n<li><a href="https://github.com/prontera/spring-cloud-rest-tcc">Spring Cloud TCC Example By Chris</a></li>\n</ul>\n<h2>\n  <a id="about-this-repository" class="anchor" aria-hidden="true" href="#about-this-repository">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>About This Repository</h2><p>This repository is a simplified Java implementation for anyone who is interested in learning the TCC pattern. This repo attempts to trim the most of the common boilerplate, but only preserve the minimal that could be most straightforward to observe this pattern. It could be adapted to use any backend stack. For more advanced and more practical use of TCC, please see the referenced <a href="https://github.com/prontera/spring-cloud-rest-tcc">Spring Cloud TCC Example</a> for microservices Integration.</p>\n<p>TCC should be used in distributed services setting. This repository for most simple demonstration, uses the same application context for different services. In practice, each service mentioned in this demo should have their own application context.</p>\n<h2>\n  <a id="about-the-resource-reservation-system" class="anchor" aria-hidden="true" href="#about-the-resource-reservation-system">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>About the Resource Reservation System</h2><p>TCC is a perfect fit for implementing distributed resource reservation system. TCC pattern effectively isolating the actual confirmation of the resource from when the attempt to reserve is created by introducing a pending stage.</p>\n<h3>\n  <a id="business-service-providers-and-transactions-coordinator" class="anchor" aria-hidden="true" href="#business-service-providers-and-transactions-coordinator">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Business Service Providers and Transactions Coordinator</h3><p>This repository contains two business service providers and one transaction service. The business services should conform to TCC interface which implement the try, confirm, and cancel methods. The transaction service acts as a resource coordinator, which attempts to confirm all pending transactions or to cancel all pending transactions.</p>\n<div class="codeblock">\n  <pre>|-- Business Service\n   |-- CarReservationService\n   |-- FlightReservationService\n|-- Transactions Coordinator\n   |-- CoordinatorService</pre>\n</div><h3>\n  <a id="release-unconfirmed-resources" class="anchor" aria-hidden="true" href="#release-unconfirmed-resources">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Release Unconfirmed Resources</h3><p>The key part of TCC is to release the resources that is not confirmed after a period of time pending on the business needs. Upon failure to confirm some of the reservations while the rest of the reservations are conformed, the entire transaction should rollback as an atomic operation. Those that are already confirmed reservations should be attempted to cancel so the resources they are holding could be released back to the pool. When there is failure to cancel them after the system makes an effort to retry the cancellation, a partial confirmation exception should be thrown to raise the attention for a manual fix. Because we are dealing with a distributed system, and service failure is guaranteed to happen at some point, regardless of the type of transactions managers we are using. On the other hand, for all those reservations that are not confirmed in the expected time, a separate scheduled repeatable task service should be responsible to cancel them and release the resources back to the pool.</p>\n<div class="codeblock">\n  <pre>|-- Auto-cancellation\n   |-- CarTask\n   |-- FlightTask</pre>\n</div><h3>\n  <a id="use-of-rest-verbs" class="anchor" aria-hidden="true" href="#use-of-rest-verbs">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Use of REST Verbs</h3><p>The TCC pattern addresses the confirm and cancel operations should be idempotent. Because the confirm operation is something we use to update the status of a created reservation, the <code>PUT</code> is a good use of the REST verbs to represent the idempotent characteristics of this operation. Because the cancel operation is something we use to delete an existing reservation, the <code>DELETE</code> is a good use of the REST verbs to represent the idempotent characteristics of this operation. On the other hand, <code>POST</code> should be used to create a reservation as with the try operation.</p>\n<div class="codeblock">\n  <pre>try - POST /flight/reservation HTTP/1.1\ncancel - DELETE /flight/reservation/q1XA9j HTTP/1.1\nconfirm - PUT /flight/reservation/q1XA9j HTTP/1.1</pre>\n</div><h3>\n  <a id="use-of-response-status" class="anchor" aria-hidden="true" href="#use-of-response-status">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Use of Response Status</h3><p>The TCC pattern addresses three response statuses. When a confirm or cancel operation succeeds, a <code>HttpStatus.NO_CONTENT</code> (204) should be returned. When they fail because of the reservation has expired or cancelled, a <code>HttpStatus.NOT_FOUND</code> (404) should be returned to indicate the reservation no longer exists. These two types of response status apply to both business service provider and transaction coordinator. When a partial confirmation exception is thrown, a <code>HttpStatus.CONFLICT</code> (409) should be returned to indicate there is a problem that might need manual intervention. The transaction coordinator should be responsible for logging such event and provide effectively trouble shooting strategies. It is not specified which status code to return when a try operation succeeds, but from the semantic meaning of this operation, <code>HttpStatus.CREATED</code> (201) is used in this repository to indicate a pending reservation has be created.</p>\n<div class="codeblock">\n  <pre>try - HTTP/1.1 201 Created\nconfirm/cancel succeseds - HTTP/1.1 204 No Content\nconfirm/cancel fails - HTTP/1.1 404 Not Found\npartical confirm - HTTP/1.1 409 Conflict</pre>\n</div><h3>\n  <a id="participants-link" class="anchor" aria-hidden="true" href="#participants-link">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Participants Link</h3><p>The confirm and cancel operations reply on the participant links that is returned from the try operation, so that when the transaction coordinator attempts to confirm or cancel all reservations as an atomic operation, all participants of this transaction could be coordinated together. The transaction coordinator is responsible for keeping a collection of the participant links returned from the try operation.</p>\n<p>The TCC pattern also enforces the use of expire time as part of the payload because this is the state that is being transferred from one service to another in distributed stateless REST services. The expire time could also be useful in preconditioning check before make confirmation attempt from the transaction coordinator.</p>\n<div class="codeblock">\n  <pre>{\n    &quot;participantLinks&quot;: [\n        {\n           &quot;uri&quot;: &quot;http://localhost:8080/flight/reservation/q1XA9j&quot;,\n            &quot;expireTime&quot;: &quot;2019-04-02T16:42:54.774-04:00&quot;\n        },\n        {\n            &quot;uri&quot;: &quot;http://localhost:8080/car/reservation/Hz88AX&quot;,\n            &quot;expireTime&quot;: &quot;2019-04-02T16:03:34.795-04:00&quot;\n        }\n    ]\n}</pre>\n</div><h2>\n  <a id="work-flow-example" class="anchor" aria-hidden="true" href="#work-flow-example">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Work Flow Example</h2><p>There is a work flow example provided in this repository. The steps the example work flow goes through are:</p>\n<div class="codeblock">\n  <pre>=============== 1st Book Attempt =============\nService Provider (flight): Reserve 2 flight seats\nService Provider (car): Reserve 1 car\nService Provider (flight): Cancel flight\nTransaction Coordinator: Resource not found: Reservation FqqmR6 has been cancelled or doesn&#39;t exist\nTransaction Coordinator: Confirm failed - 404 NOT_FOUND\n=============== 2nd Book Attempt =============\nService Provider (flight): Reserve 2 flight seats\nService Provider (car): Reserve 1 car\nTransaction Coordinator: Confirm succeeded seats</pre>\n</div><p><a href="https://github.com/zhenyanghua/tcc-demo" target="_blank">Source Code Repository</a></p>\n'}}/>
    </${a}>`}