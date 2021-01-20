import{s as t,y as e,m as a}from"../index.552eb74c.js";t("/assets/style.module.413ab5c4.css");const i="post_14b9dxr";function s({children:t,path:s,title:n,date:d,label:o}){const c=new Date(d).toLocaleDateString(void 0,{month:"2-digit",day:"2-digit",year:"numeric"});return e(()=>{document.head.title=o+" - Zhenyang Hua"},[]),a`<div class=${i}>
      <h1 class="title">${n}</h1>
      <p class="date">Posted on ${c}</p>
      ${t}
      <div>
        <a target="_blank" href=${`https://github.com/zhenyanghua/zhenyanghua.github.io/blob/articles/posts${s}/index.md`}>Read on GitHub</a>
      </div>
    </div>`}export{s as P};