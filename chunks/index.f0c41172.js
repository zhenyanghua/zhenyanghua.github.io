import{s,u as a,c as t,k as e,m as d}from"../index.f0d552bc.js";import{f as r}from"./time.daaab1ba.js";s("/assets/style.module.184703f0.css");const n="post_14b9dxr",o="title_14b9dxr",i="date_14b9dxr",h="summary_14b9dxr",b="github_14b9dxr";function l({children:s,title:l,date:m,summary:c}){a(l),t();const{path:u}=e();return d`<div class=${n}>
      <h1 class=${o}>${l}</h1>
      <p class=${i}>Posted on ${r(m)}</p>
      <div class=${h} dangerouslySetInnerHTML=${{__html:c}}/>
      ${s}
      <h2 class=${b}>
        <a target="_blank" href=${`https://github.com/zhenyanghua/zhenyanghua.github.io/blob/master/posts${u}/index.md`}>Read on GitHub</a>
      </h2>
    </div>`}export{l as P};