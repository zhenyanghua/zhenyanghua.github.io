import{s,u as a,b as t,h as e,m as r}from"../index.2a5b37bb.js";import{f as d}from"./time.daaab1ba.js";s("/assets/style.module.184703f0.css");const b="post_14b9dxr",n="title_14b9dxr",o="date_14b9dxr",h="summary_14b9dxr",i="github_14b9dxr";function l({children:s,title:l,date:m,summary:u}){a(l),t();const{path:c}=e();return r`<div class=${b}>
      <h1 class=${n}>${l}</h1>
      <p class=${o}>Posted on ${d(m)}</p>
      <div class=${h} dangerouslySetInnerHTML=${{__html:u}}/>
      ${s}
      <h2 class=${i}>
        <a target="_blank" href=${`https://github.com/zhenyanghua/zhenyanghua.github.io/blob/master/posts${c}/index.md`}>Read on GitHub</a>
      </h2>
    </div>`}export{l as P};