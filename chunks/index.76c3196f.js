import{s,u as a,b as t,h as e,m as r}from"../index.e74eacfc.js";import{f as d}from"./time.daaab1ba.js";s("/assets/style.module.184703f0.css");const n="post_14b9dxr",o="title_14b9dxr",h="date_14b9dxr",i="summary_14b9dxr",b="github_14b9dxr";function l({children:s,title:l,date:m,summary:c}){a(l),t();const{path:u}=e();return r`<div class=${n}>
      <h1 class=${o}>${l}</h1>
      <p class=${h}>Posted on ${d(m)}</p>
      <div class=${i} dangerouslySetInnerHTML=${{__html:c}}/>
      ${s}
      <h2 class=${b}>
        <a target="_blank" href=${`https://github.com/zhenyanghua/zhenyanghua.github.io/blob/master/posts${u}/index.md`}>Read on GitHub</a>
      </h2>
    </div>`}export{l as P};