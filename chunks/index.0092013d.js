import{s,u as a,c as t,k as e,m as r}from"../index.7afb9b37.js";import{f as d}from"./time.daaab1ba.js";s("/assets/style.module.184703f0.css");const n="post_14b9dxr",o="title_14b9dxr",i="date_14b9dxr",b="summary_14b9dxr",h="github_14b9dxr";function l({children:s,title:l,date:m,summary:u}){a(l),t();const{path:c}=e();return r`<div class=${n}>
      <h1 class=${o}>${l}</h1>
      <p class=${i}>Posted on ${d(m)}</p>
      <div class=${b} dangerouslySetInnerHTML=${{__html:u}}/>
      ${s}
      <h2 class=${h}>
        <a target="_blank" href=${`https://github.com/zhenyanghua/zhenyanghua.github.io/blob/master/posts${c}/index.md`}>Read on GitHub</a>
      </h2>
    </div>`}export{l as P};