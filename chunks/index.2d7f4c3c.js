import{y,m}from"../index.935c01d8.js";import"./time.daaab1ba.js";import{P as Post}from"./index.31f7da2c.js";const scripts=['console.debug("foo")',"console.debug('foo')"];function index(){return y(()=>{scripts.forEach(script=>eval(script)())},[]),m`<${Post} ...${{title:"Behavioral Patterns - Visitor Pattern Exercise",date:"2018-07-17T17:00:00.000Z"}} summary=${"<p>The Visitor Pattern represents an operation to be performed on elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates. In this exercise, we will create a bookstore inventory structure that collects books, movies, and music. We will add shared behaviors across this hierarchical structure by using the Visitor Pattern.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="reading-materials" class="anchor" aria-hidden="true" href="#reading-materials">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Reading Materials</h2><ol>\n<li><a target="_blank" href="https://en.wikipedia.org/wiki/Visitor_pattern"><i class="external alternate icon"></i> https://en.wikipedia.org/wiki/Visitor_pattern</a> (15 minutes reading)</li>\n</ol>\n<h2>\n  <a id="practice-materials" class="anchor" aria-hidden="true" href="#practice-materials">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Practice Materials</h2><ol>\n<li>Use the <strong>Visitor Pattern</strong> to create a bookstore inventory that meets the following requirements:</li>\n</ol>\n<ul>\n<li>the bookstore inventory collects <strong>books</strong>, <strong>movies</strong>, and <strong>music</strong>.</li>\n<li>all these three media types have their own members and one common member - <strong>title</strong></li>\n<li>add one behavior to the media so that the operation can print out all the titles.</li>\n<li>add second behavior to the media so that the operation can print out details of all media and the total count of media while the media is traversed.</li>\n</ul>\n<h3>\n  <a id="components-" class="anchor" aria-hidden="true" href="#components-">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Components:</h3><ol>\n<li>Visitor Interface (The operation that is shared across visited elements) - <code>MediaVisitor</code></li>\n<li>Element Interface (The hierarchical structure that accepts the operation from a visitor) - <code>Media</code></li>\n<li>Concrete Elements (The elements in the hierarchical structure that will be visited) - <code>Book</code>, <code>Movie</code>, <code>Music</code></li>\n<li>Concrete Visitors (Each visitor will define one type of operation) - <code>TitlePrintingVisitor</code>, <code>DetailPrintingVisitor</code></li>\n<li>Iterator for traversal (The root structure that holds the references to all the sub-elements) - <code>Inventory</code></li>\n</ol>\n<h3>\n  <a id="tips" class="anchor" aria-hidden="true" href="#tips">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Tips</h3><ul>\n<li>Visitors can have their own internal state to keep track of the elements they visit.</li>\n</ul>\n<h3>\n  <a id="solution" class="anchor" aria-hidden="true" href="#solution">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Solution</h3><p><a target="_blank" href="https://github.com/zhenyanghua/design-patterns/tree/master/VisitorPatternExample/src/main/java"><i class="external alternate icon"></i> Bookstore Inventory Example</a></p>\n<h2>\n  <a id="questions-to-discuss" class="anchor" aria-hidden="true" href="#questions-to-discuss">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Questions to discuss</h2><ol>\n<li>What are the common use cases to apply the <strong>Template Method Pattern</strong>?</li>\n<li>What are the two major disadvantages of the <strong>Visitor Pattern</strong>?</li>\n</ol>\n<ul>\n<li>Break Encapsulation</li>\n<li>Difficult to add more subclasses to the hierarchical structure</li>\n</ul>\n'}}/>
    </${Post}>`}export default index;