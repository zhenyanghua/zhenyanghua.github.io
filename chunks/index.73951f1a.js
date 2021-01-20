import{s as a,m as s,u as e,b as t}from"../index.1da59a96.js";import{f as r}from"./time.daaab1ba.js";null;const n="writings_1a8img0",l="list_1a8img0",c="card_1a8img0";null;const i="card_cwjn7n",d="title_cwjn7n",m="summary_cwjn7n",$="date_cwjn7n",o="readmore_cwjn7n";function u({class:a,url:e,title:t,summary:n,date:l}){let c=i;return a&&(c=`${c} ${a}`),s`<div class=${c}>
      <h2 class=${d}>
        <a href=${e}>${t}</a>
      </h2>
      <p class=${$}>${r(l)}</p>
      <p class=${m} dangerouslySetInnerHTML=${{__html:n}}/>
      <p class=${o} aria-label=${"Read more about "+t}>
        <a href=${e}>Read more</a>
      </p>
    </div>`}export default function(){return e("Writings"),s`<div class=${n}>
      <div className=${l}>
        ${t.map(a=>s`<${u} class=${c} key=${a.url} ...${a} url=${a.url+"#maincontent"}/>`)}
      </div>
    </div>`}