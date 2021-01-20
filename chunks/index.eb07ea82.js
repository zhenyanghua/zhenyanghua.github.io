import{m as e}from"../index.f7c0c5b6.js";import"./time.daaab1ba.js";import{P as t}from"./index.ad101fb9.js";export default function(){return e`<${t} ...${{title:"Entity Mapping with Inheritance in Hibernate",date:"2018-10-10T17:00:00.000Z"}}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="inheritance-could-be-enabled-in-hibernate-with-the-code-mappedsuperclass-code-annotation-this-annotation-could-greatly-reduce-the-boilerplate-in-our-entity-mapping-" class="anchor" aria-hidden="true" href="#inheritance-could-be-enabled-in-hibernate-with-the-code-mappedsuperclass-code-annotation-this-annotation-could-greatly-reduce-the-boilerplate-in-our-entity-mapping-">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Inheritance could be enabled in Hibernate with the <code>@MappedSuperclass</code> annotation. This annotation could greatly reduce the boilerplate in our entity mapping.</h2><h2>\n  <a id="story" class="anchor" aria-hidden="true" href="#story">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Story</h2><p>Using inheritance to map a <strong>paper-book</strong> and <strong>audio-book</strong> type of data.</p>\n<h2>\n  <a id="solution" class="anchor" aria-hidden="true" href="#solution">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Solution</h2><p>The following Resource class uses <code>@MappedSuperclass</code> annotation to abstract the shared properties into a superclass that represents a resource that could be extended by all concrete resources. In this case, we also make the resource generic so that each the primary key property <code>id</code> could be flexible with the type of its subclass.</p>\n<p>By using the <code>@MappedSuperclass</code> instead of the <code>@Entity</code> annotation on the superclass, it tells Hibernate to create these superclass properties in each of the respective subclass tables in the database.</p>\n<div class="codeblock">\n  <pre>@MappedSuperclass\npublic class Resource&lt;T&gt; {\n    @Id\n    @GeneratedValue(strategy = AUTO)\n    private T id;\n\n    @Column(length=255)\n    private String name;\n\n    // getters and setters are omitted for brevity\n}\n\n@Entity\npublic class PaperBook extends Resource&lt;Long&gt; {\n    private String author;\n\n    // getters and setters are omitted for brevity\n}\n\n@Entity\npublic class AudioBook extends Resource&lt;Long&gt; {\n    private String author;\n    private String toldBy;\n\n    // getters and setters are omitted for brevity\n}\n\n@Entity\npublic class Dvd extends Resource&lt;Long&gt; {\n    private String director;\n\n    // getters and setters are omitted for brevity\n}</pre>\n</div><h2>\n  <a id="lesson-learnt" class="anchor" aria-hidden="true" href="#lesson-learnt">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Lesson Learnt</h2><ul>\n<li><code>@MappedSuperclass</code> annotation could be used on superclass to enable inheritance in entity mapping.</li>\n</ul>\n'}}/>
    </${t}>`}