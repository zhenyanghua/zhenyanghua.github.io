import{s,u as a,c as t,n as e,m as d}from"../index.ddf55706.js";import{f as r}from"./time.daaab1ba.js";s("/assets/style.module.184703f0.css");const n="post_14b9dxr",o="title_14b9dxr",i="date_14b9dxr",h="summary_14b9dxr",b="github_14b9dxr";function l({children:s,title:l,date:m,summary:u}){a(l),t();const{path:c}=e();return d`<div class=${n}>
      <h1 class=${o}>${l}</h1>
      <p class=${i}>Posted on ${r(m)}</p>
      <div class=${h} dangerouslySetInnerHTML=${{__html:u}}/>
      ${s}
      <h2 class=${b}>
        <a target="_blank" href=${`https://github.com/zhenyanghua/zhenyanghua.github.io/blob/master/posts${c}/index.md`}>Read on GitHub</a>
      </h2>
    </div>`}export{l as P};