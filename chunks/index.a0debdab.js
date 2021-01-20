import{s,m as a,u as e,c as t}from"../index.f8c9dc85.js";import{f as r}from"./time.daaab1ba.js";null;const c="writings_1a8img0",i="list_1a8img0",l="card_1a8img0";null;const n="card_cwjn7n",d="title_cwjn7n",$="summary_cwjn7n",m="date_cwjn7n",o="readmore_cwjn7n";function u({id:s,class:e,url:t,title:c,summary:i,date:l}){let u=n;return e&&(u=`${u} ${e}`),a`<div id=${s} class=${u}>
      <h2 class=${d}>
        <a href=${t}>${c}</a>
      </h2>
      <p class=${m}>${r(l)}</p>
      <p class=${$} dangerouslySetInnerHTML=${{__html:i}}/>
      <p class=${o} aria-label=${"Read more about "+c}>
        <a href=${t}>Read more</a>
      </p>
    </div>`}export default function(){return e("Writings"),a`<div class=${c}>
      <div className=${i}>
        ${t.map(s=>a`<${u} id=${s.url} class=${l} key=${s.url} ...${s} url=${s.url+"#maincontent"}/>`)}
      </div>
    </div>`}