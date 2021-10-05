import{s,u as a,c as t,n as e,m as r}from"../index.c0167266.js";import{f as d}from"./time.daaab1ba.js";s("/assets/style.module.184703f0.css");const n="post_14b9dxr",o="title_14b9dxr",i="date_14b9dxr",h="summary_14b9dxr",b="github_14b9dxr";function l({children:s,title:l,date:m,summary:c}){a(l),t();const{path:u}=e();return r`<div class=${n}>
      <h1 class=${o}>${l}</h1>
      <p class=${i}>Posted on ${d(m)}</p>
      <div class=${h} dangerouslySetInnerHTML=${{__html:c}}/>
      ${s}
      <h2 class=${b}>
        <a target="_blank" href=${`https://github.com/zhenyanghua/zhenyanghua.github.io/blob/master/posts${u}/index.md`}>Read on GitHub</a>
      </h2>
    </div>`}export{l as P};