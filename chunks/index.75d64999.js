import{m as e}from"../index.d7fd2eaa.js";import{P as n}from"./index.4797403a.js";export default function(){return e`<${n} title="NPM Dependencies vs DevDependencies" date="Sat Oct 24 2020 13:00:00 GMT-0400 (Eastern Daylight Time)">
      <article dangerouslySetInnerHTML=${{__html:'<h1>\n  <a id="what-39-s-the-difference-between-dependencies-and-devdependencies-in-npm-" class="anchor" aria-hidden="true" href="#what-39-s-the-difference-between-dependencies-and-devdependencies-in-npm-">\n    <span class="header-link"></span>\n  </a>What&#39;s the difference between dependencies and devDependencies in npm?</h1><p>If you are creating just an application, or a service, there isn&#39;t a difference in the usage. \nHowever, if you are creating a library, this following key part may help you understand the \ndifference:</p>\n<blockquote>\n<p>Anything is the devDependencies list will NOT be installed in the client application \nwhile everything in the dependencies list will be.</p>\n</blockquote>\n<h2>\n  <a id="why-does-it-matter-" class="anchor" aria-hidden="true" href="#why-does-it-matter-">\n    <span class="header-link"></span>\n  </a>Why does it matter?</h2><h3>\n  <a id="scenario-1" class="anchor" aria-hidden="true" href="#scenario-1">\n    <span class="header-link"></span>\n  </a>Scenario 1</h3><p>Imagine your library is to offer a date time parser to its users. You may be using \neslint for your development linting check. If you decide to put it in the dependencies \nlist, when user install your library package, the eslint listed in your <code>&quot;dependencies&quot;</code> \nlist will also be installed into users&#39; <code>node_modules</code> folder, even if users have decided\nnot to use any eslint feature at all for their applications. This increase the overall \npackage size for their application if it is a Node JS application and also force the \nclient to unnecessarily download the unused packages.</p>\n<h3>\n  <a id="scenario-2" class="anchor" aria-hidden="true" href="#scenario-2">\n    <span class="header-link"></span>\n  </a>Scenario 2</h3><p>Image your library is a UI library and is TypeScript based. You may have decided to also\nuse another nice responsive table library as the base for your mroe customized fancy-table\ncomponent. So you may have something like <code>&quot;table&quot;: &quot;1.2.1&quot;</code> in your <code>&quot;dependencies&quot;</code>. \nBecause you are working in TypeScript, you need the type definitions of the table API. \nLuckily, they have already published <code>@types/table</code> for TypeScript users. Now the question\nis clear - where should you put it? The answer is <code>&quot;dependencies&quot;</code> list. The reason is if \nit is left in the <code>&quot;devDependencies&quot;</code> list, users of your UI library won&#39;t have type \ninformation about the internal type where the base (table) of your fancy-table refers to. \nIf your library users also develop in TypeScript, their TypeScript compiler will report \nmissing type errors.</p>\n<h2>\n  <a id="lesson-learned" class="anchor" aria-hidden="true" href="#lesson-learned">\n    <span class="header-link"></span>\n  </a>Lesson Learned</h2><p>I learned this lesson in a hard way when I had to spend the entire day troubleshooting the\nTypeScript issues. Before deciding to install development related packages in the \n<code>&quot;devDependencies&quot;</code> list, think twice whether they are only development related, or they \ntruly constitute a dependency of your library.</p>\n'}}/>
    </${n}>`}