import{m as e}from"../index.f7c0c5b6.js";import"./time.daaab1ba.js";import{P as t}from"./index.ad101fb9.js";export default function(){return e`<${t} ...${{title:"Entity Graphs for Lazy Loading",date:"2018-10-10T17:00:00.000Z"}}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="-em-entity-graphs-em-are-templates-for-persistence-query-one-common-problem-it-solves-is-em-lazy-loading-em-this-article-introduces-the-basics-of-em-entity-graphs-em-and-how-to-use-em-entity-graphs-em-with-em-jpa-em-and-em-spring-data-em-to-solve-the-em-lazy-loading-em-" class="anchor" aria-hidden="true" href="#-em-entity-graphs-em-are-templates-for-persistence-query-one-common-problem-it-solves-is-em-lazy-loading-em-this-article-introduces-the-basics-of-em-entity-graphs-em-and-how-to-use-em-entity-graphs-em-with-em-jpa-em-and-em-spring-data-em-to-solve-the-em-lazy-loading-em-">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a><em>Entity Graphs</em> are templates for persistence query. One common problem it solves is <em>Lazy Loading</em>. This article introduces the basics of <em>Entity Graphs</em> and how to use <em>Entity Graphs</em> with <em>JPA</em> and <em>Spring Data</em> to solve the <em>Lazy Loading</em>.</h2><h2>\n  <a id="1-entity-graph-basics" class="anchor" aria-hidden="true" href="#1-entity-graph-basics">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>1. Entity Graph Basics</h2><p>The tutorial will be using the <code>Order</code> class as a persistence entity.</p>\n<div class="codeblock">\n  <pre>@Entity\npublic class Order implements Serializable {\n    @Id\n    private String id;\n\n    private LocalDateTime datetime;\n\n    @ManyToOne(fetch=EAGER)\n    private User user;\n\n    @OneToMany(fetch=LAZY)\n    private List&lt;Item&gt; items;\n\n    @OneToMany(fetch=LAZY)\n    private List&lt;Payment&gt; payments;\n}</pre>\n</div><p>All fields in an entity are lazily fetched by default, so the default entity graph consists of only the fields whose <code>FetchType</code> is <code>EAGER</code>.  The exceptions are that the primary key and version fields of an entity class are always fetched.</p>\n<p>In the above example, only <code>id</code> and <code>user</code> will be in the default entity graph.</p>\n<h3>\n  <a id="1-1-fetch-graphs" class="anchor" aria-hidden="true" href="#1-1-fetch-graphs">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>1.1 Fetch Graphs</h3><p>A fetch graph consists of only the fields explicitly specified in the <code>EntityGraph</code> instance, and ignores the default entity graph settings. To specify a fetch graph, set the <code>javax.persistence.fetchgraph</code> property and pass as a hint to the EntityManager.find or query operations.</p>\n<p>In the following example, the default entity graph is ignored, and only the <code>items</code> field is included in the dynamically created fetch graph:</p>\n<div class="codeblock">\n  <pre>EntityGraph&lt;Order&gt; graph = em.createEntityGraph(Order.class);\ngraph.addAttributeNodes(&quot;items&quot;);\n...\nProperties props = new Properties();\nprops.put(&quot;javax.persistence.fetchgraph&quot;, graph);\n\nOrder order = em.find(Order.class, id, props);</pre>\n</div><h3>\n  <a id="1-2-load-graphs" class="anchor" aria-hidden="true" href="#1-2-load-graphs">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>1.2 Load Graphs</h3><p>A load graph consists of the fields explicitly specified in the <code>EntityGraph</code> instance plus any fields in the default entity graph. To specify a load graph, set the <code>javax.persistence.loadgraph</code> property as a hint to the <code>EntityManager.find</code> or query operations.</p>\n<p>In the following example, the load graph contains alll the fields in the default entity plus the <code>items</code> field:</p>\n<div class="codeblock">\n  <pre>EntityGraph&lt;Order&gt; graph = em.createEntityGraph(Order.class);\ngraph.addAttributeNodes(&quot;items&quot;);\n...\nProperties props = new Properties();\nprops.put(&quot;javax.persistence.loadgraph&quot;, graph);\n\nOrder order = em.find(Order.class, id, props);</pre>\n</div><h2>\n  <a id="2-named-entity-graph" class="anchor" aria-hidden="true" href="#2-named-entity-graph">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>2. Named Entity Graph</h2><p><code>@NamedEntityGraph</code> annotation is commonly used to create named entity graphs. When no other attributes are specified in this annotation, the default entity graph is used.</p>\n<p>In the following example, only <code>id</code> and <code>user</code> will be eagerly fetched in either a load graph or fetch graph.</p>\n<div class="codeblock">\n  <pre>@NamedEntityGraph\n@Entity\npublic class Order implements Serializable {\n    @Id\n    private String id;\n\n    private LocalDateTime datetime;\n\n    @ManyToOne(fetch=EAGER)\n    private User user;\n\n    @OneToMany(fetch=LAZY)\n    private List&lt;Item&gt; items;\n\n    @OneToMany(fetch=LAZY)\n    private List&lt;Payment&gt; payments;\n}</pre>\n</div><p>We could also add fields to be eagerly fetched to the entity graph by specifying them in the <code>attributeNodes</code> property of the graph annotation with <code>@NamedAttributeNode</code>, which could also include subgraphs if there is a third layer of the relation between the named attribute and its sub-attribute.</p>\n<p>In the following example, two entity graphs are created, and the following table shows the fields will be eagerly fetched in a fetch graph and load graph.</p>\n<table>\n<thead>\n<tr>\n<th>Name</th>\n<th>Fetch Graph</th>\n<th>Load Graph</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><strong>graph.order.items</strong></td>\n<td><code>id</code>,<code>items</code></td>\n<td><code>id</code>,<code>items</code>, <code>user</code></td>\n</tr>\n<tr>\n<td><strong>graph.order.items.payments</strong></td>\n<td><code>id</code>,<code>items</code>,<code>payments</code></td>\n<td><code>id</code>,<code>items</code>,<code>payments</code>,<code>user</code></td>\n</tr>\n</tbody></table>\n<div class="codeblock">\n  <pre>@NamedEntityGraphs({\n    @NamedEntityGraph({\n        name = &quot;graph.order.items&quot;,\n        attributeNodes = {\n            @NamedAttributeNode(&quot;items&quot;)\n        }\n    }),\n    @NamedEntityGraph({\n        name = &quot;graph.order.items.payments&quot;,\n        attributeNodes = {\n            @NamedAttributeNode(&quot;items&quot;),\n            @NamedAttributeNode(&quot;payments&quot;)\n        }\n    })\n})\n@Entity\npublic class Order implements Serializable {\n    @Id\n    private String id;\n\n    private LocalDateTime datetime;\n\n    @ManyToOne(fetch=EAGER)\n    private User user;\n\n    @OneToMany(fetch=LAZY)\n    private List&lt;Item&gt; items;\n\n    @OneToMany(fetch=LAZY)\n    private List&lt;Payment&gt; payments;\n}</pre>\n</div><h3>\n  <a id="2-1-with-jpa-2-1" class="anchor" aria-hidden="true" href="#2-1-with-jpa-2-1">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>2.1 With JPA 2.1</h3><p>Similar to the example earlier, when using the <code>EntityManger.find</code>, the pattern is to get the entity graph instead of creating one.</p>\n<div class="codeblock">\n  <pre>EntityGraph&lt;Order&gt; graph = em.getEntityGraph(&quot;graph.order.items&quot;);\n\nProperties props = new Properties();\nprops.put(&quot;javax.persistence.loadgraph&quot;, graph); // or using a fetch graph.\n\nOrder order = em.find(Order.class, id, props);</pre>\n</div><p>When using query operations, the pattern is to get the entity graph first and call the <code>Query.setHint</code> method to pass in a key-value pair where the key is the graph type and the value is the entity graph.</p>\n<div class="codeblock">\n  <pre>EntityGraph&lt;Order&gt; graph = em.getEntityGraph(&quot;graph.order.items&quot;);\n\nList&lt;Order&gt; orders = em.createNamedQuery(&quot;findAllOrdersWithItems&quot;)\n    .setHint(&quot;javax.persistence.loadgraph&quot;, graph)\n    .getResultList();</pre>\n</div><h3>\n  <a id="2-2-with-spring-data" class="anchor" aria-hidden="true" href="#2-2-with-spring-data">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>2.2 With Spring Data</h3><p><code>@EntityGraph</code> annotation is used on any JPA data access methods that need to be applied with a named entity graph. when the graph type is not specified, a fetch graph will be used.</p>\n<div class="codeblock">\n  <pre>public interface OrderRepository extends PagingAndSortingRepository&lt;Order, String&gt; {\n\n    @EntityGraph(value=&quot;graph.order.items&quot;, type=LOAD)\n    List&lt;Order&gt; findByUserWithItems(User user);\n\n    @EntityGraph(value=&quot;graph.order.items.payments&quot;, type=LOAD)\n    List&lt;Order&gt; findByUserWithItemsPayments(User user);\n}</pre>\n</div><h2>\n  <a id="3-summary" class="anchor" aria-hidden="true" href="#3-summary">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>3. Summary</h2><p>We learnt the basics of the entity graph from this tutorial by covering difference between fetch graphs and load graphs. We then learnt using annotation approach to declare named entity graphs and how to use them with JPA <code>EntityManager</code> and with Spring data <code>@EntityGraph</code> annotation. By using entity graphs, we could easily apply lazy-loading to our data access layer while balancing efficient queries.</p>\n'}}/>
    </${t}>`}