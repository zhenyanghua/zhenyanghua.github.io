import{s,u as a,c as t,n as e,m as r}from"../index.cf885c6c.js";import{f as d}from"./time.daaab1ba.js";s("/assets/style.module.184703f0.css");const n="post_14b9dxr",o="title_14b9dxr",i="date_14b9dxr",h="summary_14b9dxr",c="github_14b9dxr";function b({children:s,title:b,date:l,summary:m}){a(b),t();const{path:u}=e();return r`<div class=${n}>
      <h1 class=${o}>${b}</h1>
      <p class=${i}>Posted on ${d(l)}</p>
      <div class=${h} dangerouslySetInnerHTML=${{__html:m}}/>
      ${s}
      <h2 class=${c}>
        <a target="_blank" href=${`https://github.com/zhenyanghua/zhenyanghua.github.io/blob/master/posts${u}/index.md`}>Read on GitHub</a>
      </h2>
    </div>`}export{b as P};