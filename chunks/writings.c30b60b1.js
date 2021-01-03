import{s as a,m as s,u as e,c as t}from"../index.45fb05d4.js";import{f as r}from"./time.daaab1ba.js";null;const n="writings_j5bi2k",i="list_j5bi2k",l="page_j5bi2k",$="card_j5bi2k";null;const c="card_cwjn7n",d="title_cwjn7n",o="summary_cwjn7n",p="date_cwjn7n",u="readmore_cwjn7n";function m({id:a,class:e,url:t,title:n,summary:i,date:l}){let $=c;return e&&($=`${$} ${e}`),s`<div id=${a} class=${$}>
      <h2 class=${d}>
        <a href=${t}>${n}</a>
      </h2>
      <p class=${p}>${r(l)}</p>
      <p class=${o} dangerouslySetInnerHTML=${{__html:i}}/>
      <p class=${u} aria-label=${"Read more about "+n}>
        <a href=${t}>Read more</a>
      </p>
    </div>`}function f({posts:a,page:t}){return e("Writings"),s`<div class=${n}>
      <div class=${l}>
        <span><a href=${t.prev}>Prev</a></span>
        <span>${t.current} / <a href=${t.lastPage}>${t.total}</a></span>
        <span><a href=${t.next}>Next</a></span>
      </div>
      <div class=${i}>
        ${a.map(a=>s`<${m} id=${a.url} class=${$} key=${a.url} ...${a} url=${a.url+"#maincontent"}/>`)}
      </div>
    </div>`}export default function(){return s`<${f} posts=${t} page=${{current:1,total:1,prev:"/writings/1",next:"/writings/1",lastPage:"/writings/1"}}/>`}