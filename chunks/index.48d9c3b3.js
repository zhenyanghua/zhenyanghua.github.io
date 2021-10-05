import{y as e,m as a}from"../index.e4eb1271.js";import"./time.daaab1ba.js";import{P as t}from"./index.8a8a9c09.js";const o=[];export default function(){return e(()=>{o.forEach(e=>new Function(e)())},[]),a`<${t} ...${{title:"PostgreSQL and Hibernate CLOB",date:"2018-10-10 17:00:00"}} summary=${"<p>When you need a SQL data type that can hold more than 255 characters, you are likely to use some large character data type such as CLOB, BLOB. It is easy to find the right type if you know what exactly the database you will stick to. However, when we use Hibernate, it provides the annotations that support the cross-platform data type translation.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="story" class="anchor" aria-hidden="true" href="#story">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Story</h2><p>I like to use H2 embedded database as a starting point when I start a new project, but later on, when I switch to use PostgreSQL, I was prompted <em>org.postgresql.jdbc.PgConnection.createClob() is not yet implemented</em>.</p>\n<p>I have one property in my class is a <code>String</code> type, as I marked as <code>@Lob</code> and wish Hibernate will take care of the rest for me, but NO. I still get the same exception.</p>\n<h2>\n  <a id="solution" class="anchor" aria-hidden="true" href="#solution">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Solution</h2><p>To solve this, I need to add the additional <code>@Type(org.hibernate.type.TextType)</code> annotation to the property as well, and then it works nicely with PostgreSQL in addition to H2.</p>\n<h2>\n  <a id="lesson-learnt" class="anchor" aria-hidden="true" href="#lesson-learnt">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Lesson Learnt</h2><ul>\n<li><code>org.hibernate.type.TextType</code> - A type that maps an SQL <code>LONGVARCHAR</code> to a Java String</li>\n<li><code>@Type</code> - use this to define one of the Hibernate mappings to gain cross-platform support.</li>\n</ul>\n'}}/>
    </${t}>`}