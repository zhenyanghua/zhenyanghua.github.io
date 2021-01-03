import{s,u as a,b as t,h as e,m as d}from"../index.4d2539ec.js";import{f as r}from"./time.daaab1ba.js";s("/assets/style.module.edc5e2a1.css");const i="post_14b9dxr",n="title_14b9dxr",o="date_14b9dxr",h="summary_14b9dxr",b="github_14b9dxr";function l({children:s,title:l,date:c,summary:m}){a(l),t();const{path:u}=e();return d`<div class=${i}>
      <h1 class=${n}>${l}</h1>
      <p class=${o}>Posted on ${r(c)}</p>
      <div class=${h} dangerouslySetInnerHTML=${{__html:m}}/>
      ${s}
      <h2 class=${b}>
        <a target="_blank" href=${`https://github.com/zhenyanghua/zhenyanghua.github.io/blob/articles/posts${u}/index.md`}>Read on GitHub</a>
      </h2>
    </div>`}export{l as P};