import{y as n,m as a}from"../index.d3fd1a2a.js";import"./time.daaab1ba.js";import{P as s}from"./index.ab67ed35.js";const t=[];export default function(){return n(()=>{t.forEach(n=>new Function(n)())},[]),a`<${s} ...${{title:"Entity Graphs for Lazy Loading",date:"2018-10-10T17:00:00.000Z"}} summary=${"<p><em>Entity Graphs</em> are templates for persistence query. One common problem it solves is <em>Lazy Loading</em>. This article introduces the basics of <em>Entity Graphs</em> and how to use <em>Entity Graphs</em> with <em>JPA</em> and <em>Spring Data</em> to solve the <em>Lazy Loading</em>.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="1-entity-graph-basics" class="anchor" aria-hidden="true" href="#1-entity-graph-basics">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>1. Entity Graph Basics</h2><p>The tutorial will be using the <code>Order</code> class as a persistence entity.</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token annotation punctuation">@Entity</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Order</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> datetime<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@ManyToOne</span><span class="token punctuation">(</span>fetch<span class="token operator">=</span>EAGER<span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">User</span> user<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@OneToMany</span><span class="token punctuation">(</span>fetch<span class="token operator">=</span>LAZY<span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> items<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@OneToMany</span><span class="token punctuation">(</span>fetch<span class="token operator">=</span>LAZY<span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> payments<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></pre>  \n</div><p>All fields in an entity are lazily fetched by default, so the default entity graph consists of only the fields whose <code>FetchType</code> is <code>EAGER</code>.  The exceptions are that the primary key and version fields of an entity class are always fetched.</p>\n<p>In the above example, only <code>id</code> and <code>user</code> will be in the default entity graph.</p>\n<h3>\n  <a id="1-1-fetch-graphs" class="anchor" aria-hidden="true" href="#1-1-fetch-graphs">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>1.1 Fetch Graphs</h3><p>A fetch graph consists of only the fields explicitly specified in the <code>EntityGraph</code> instance, and ignores the default entity graph settings. To specify a fetch graph, set the <code>javax.persistence.fetchgraph</code> property and pass as a hint to the EntityManager.find or query operations.</p>\n<p>In the following example, the default entity graph is ignored, and only the <code>items</code> field is included in the dynamically created fetch graph:</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token class-name">EntityGraph</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span></span> graph <span class="token operator">=</span> em<span class="token punctuation">.</span><span class="token function">createEntityGraph</span><span class="token punctuation">(</span><span class="token class-name">Order</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ngraph<span class="token punctuation">.</span><span class="token function">addAttributeNodes</span><span class="token punctuation">(</span><span class="token string">"items"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\n<span class="token class-name">Properties</span> props <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nprops<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"javax.persistence.fetchgraph"</span><span class="token punctuation">,</span> graph<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Order</span> order <span class="token operator">=</span> em<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token class-name">Order</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> id<span class="token punctuation">,</span> props<span class="token punctuation">)</span><span class="token punctuation">;</span></pre>  \n</div><h3>\n  <a id="1-2-load-graphs" class="anchor" aria-hidden="true" href="#1-2-load-graphs">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>1.2 Load Graphs</h3><p>A load graph consists of the fields explicitly specified in the <code>EntityGraph</code> instance plus any fields in the default entity graph. To specify a load graph, set the <code>javax.persistence.loadgraph</code> property as a hint to the <code>EntityManager.find</code> or query operations.</p>\n<p>In the following example, the load graph contains alll the fields in the default entity plus the <code>items</code> field:</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token class-name">EntityGraph</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span></span> graph <span class="token operator">=</span> em<span class="token punctuation">.</span><span class="token function">createEntityGraph</span><span class="token punctuation">(</span><span class="token class-name">Order</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ngraph<span class="token punctuation">.</span><span class="token function">addAttributeNodes</span><span class="token punctuation">(</span><span class="token string">"items"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\n<span class="token class-name">Properties</span> props <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nprops<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"javax.persistence.loadgraph"</span><span class="token punctuation">,</span> graph<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Order</span> order <span class="token operator">=</span> em<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token class-name">Order</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> id<span class="token punctuation">,</span> props<span class="token punctuation">)</span><span class="token punctuation">;</span></pre>  \n</div><h2>\n  <a id="2-named-entity-graph" class="anchor" aria-hidden="true" href="#2-named-entity-graph">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>2. Named Entity Graph</h2><p><code>@NamedEntityGraph</code> annotation is commonly used to create named entity graphs. When no other attributes are specified in this annotation, the default entity graph is used.</p>\n<p>In the following example, only <code>id</code> and <code>user</code> will be eagerly fetched in either a load graph or fetch graph.</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token annotation punctuation">@NamedEntityGraph</span>\n<span class="token annotation punctuation">@Entity</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Order</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> datetime<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@ManyToOne</span><span class="token punctuation">(</span>fetch<span class="token operator">=</span>EAGER<span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">User</span> user<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@OneToMany</span><span class="token punctuation">(</span>fetch<span class="token operator">=</span>LAZY<span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> items<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@OneToMany</span><span class="token punctuation">(</span>fetch<span class="token operator">=</span>LAZY<span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> payments<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></pre>  \n</div><p>We could also add fields to be eagerly fetched to the entity graph by specifying them in the <code>attributeNodes</code> property of the graph annotation with <code>@NamedAttributeNode</code>, which could also include subgraphs if there is a third layer of the relation between the named attribute and its sub-attribute.</p>\n<p>In the following example, two entity graphs are created, and the following table shows the fields will be eagerly fetched in a fetch graph and load graph.</p>\n<table>\n<thead>\n<tr>\n<th>Name</th>\n<th>Fetch Graph</th>\n<th>Load Graph</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><strong>graph.order.items</strong></td>\n<td><code>id</code>,<code>items</code></td>\n<td><code>id</code>,<code>items</code>, <code>user</code></td>\n</tr>\n<tr>\n<td><strong>graph.order.items.payments</strong></td>\n<td><code>id</code>,<code>items</code>,<code>payments</code></td>\n<td><code>id</code>,<code>items</code>,<code>payments</code>,<code>user</code></td>\n</tr>\n</tbody></table>\n<div class="codeblock">\n  <pre class="language-java"><span class="token annotation punctuation">@NamedEntityGraphs</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@NamedEntityGraph</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        name <span class="token operator">=</span> <span class="token string">"graph.order.items"</span><span class="token punctuation">,</span>\n        attributeNodes <span class="token operator">=</span> <span class="token punctuation">{</span>\n            <span class="token annotation punctuation">@NamedAttributeNode</span><span class="token punctuation">(</span><span class="token string">"items"</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token annotation punctuation">@NamedEntityGraph</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        name <span class="token operator">=</span> <span class="token string">"graph.order.items.payments"</span><span class="token punctuation">,</span>\n        attributeNodes <span class="token operator">=</span> <span class="token punctuation">{</span>\n            <span class="token annotation punctuation">@NamedAttributeNode</span><span class="token punctuation">(</span><span class="token string">"items"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n            <span class="token annotation punctuation">@NamedAttributeNode</span><span class="token punctuation">(</span><span class="token string">"payments"</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@Entity</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Order</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> datetime<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@ManyToOne</span><span class="token punctuation">(</span>fetch<span class="token operator">=</span>EAGER<span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">User</span> user<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@OneToMany</span><span class="token punctuation">(</span>fetch<span class="token operator">=</span>LAZY<span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> items<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@OneToMany</span><span class="token punctuation">(</span>fetch<span class="token operator">=</span>LAZY<span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> payments<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></pre>  \n</div><h3>\n  <a id="2-1-with-jpa-2-1" class="anchor" aria-hidden="true" href="#2-1-with-jpa-2-1">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>2.1 With JPA 2.1</h3><p>Similar to the example earlier, when using the <code>EntityManger.find</code>, the pattern is to get the entity graph instead of creating one.</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token class-name">EntityGraph</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span></span> graph <span class="token operator">=</span> em<span class="token punctuation">.</span><span class="token function">getEntityGraph</span><span class="token punctuation">(</span><span class="token string">"graph.order.items"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">Properties</span> props <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nprops<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"javax.persistence.loadgraph"</span><span class="token punctuation">,</span> graph<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// or using a fetch graph.</span>\n\n<span class="token class-name">Order</span> order <span class="token operator">=</span> em<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token class-name">Order</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> id<span class="token punctuation">,</span> props<span class="token punctuation">)</span><span class="token punctuation">;</span></pre>  \n</div><p>When using query operations, the pattern is to get the entity graph first and call the <code>Query.setHint</code> method to pass in a key-value pair where the key is the graph type and the value is the entity graph.</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token class-name">EntityGraph</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span></span> graph <span class="token operator">=</span> em<span class="token punctuation">.</span><span class="token function">getEntityGraph</span><span class="token punctuation">(</span><span class="token string">"graph.order.items"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span></span> orders <span class="token operator">=</span> em<span class="token punctuation">.</span><span class="token function">createNamedQuery</span><span class="token punctuation">(</span><span class="token string">"findAllOrdersWithItems"</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">setHint</span><span class="token punctuation">(</span><span class="token string">"javax.persistence.loadgraph"</span><span class="token punctuation">,</span> graph<span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">getResultList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></pre>  \n</div><h3>\n  <a id="2-2-with-spring-data" class="anchor" aria-hidden="true" href="#2-2-with-spring-data">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>2.2 With Spring Data</h3><p><code>@EntityGraph</code> annotation is used on any JPA data access methods that need to be applied with a named entity graph. when the graph type is not specified, a fetch graph will be used.</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">OrderRepository</span> <span class="token keyword">extends</span> <span class="token class-name">PagingAndSortingRepository</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@EntityGraph</span><span class="token punctuation">(</span>value<span class="token operator">=</span><span class="token string">"graph.order.items"</span><span class="token punctuation">,</span> type<span class="token operator">=</span>LOAD<span class="token punctuation">)</span>\n    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span></span> <span class="token function">findByUserWithItems</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@EntityGraph</span><span class="token punctuation">(</span>value<span class="token operator">=</span><span class="token string">"graph.order.items.payments"</span><span class="token punctuation">,</span> type<span class="token operator">=</span>LOAD<span class="token punctuation">)</span>\n    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span></span> <span class="token function">findByUserWithItemsPayments</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></pre>  \n</div><h2>\n  <a id="3-summary" class="anchor" aria-hidden="true" href="#3-summary">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>3. Summary</h2><p>We learnt the basics of the entity graph from this tutorial by covering difference between fetch graphs and load graphs. We then learnt using annotation approach to declare named entity graphs and how to use them with JPA <code>EntityManager</code> and with Spring data <code>@EntityGraph</code> annotation. By using entity graphs, we could easily apply lazy-loading to our data access layer while balancing efficient queries.</p>\n'}}/>
    </${s}>`}