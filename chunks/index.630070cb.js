import{s as a,m as s,u as e,b as t}from"../index.38ef91ca.js";import{f as r}from"./time.daaab1ba.js";null;const c="writings_1a8img0",i="list_1a8img0",l="card_1a8img0";null;const n="card_cwjn7n",$="title_cwjn7n",m="summary_cwjn7n",d="date_cwjn7n",o="readmore_cwjn7n";function u({class:a,url:e,title:t,summary:c,date:i}){let l=n;return a&&(l=`${l} ${a}`),s`<div class=${l}>
      <h2 class=${$}>
        <a href=${e}>${t}</a>
      </h2>
      <p class=${d}>${r(i)}</p>
      <p class=${m}>${c}</p>
      <p class=${o} aria-label=${"Read more about "+t}>
        <a href=${e}>Read more</a>
      </p>
    </div>`}export default function(){return e("Writings"),s`<div class=${c}>
      <div className=${i}>
        ${t.map(a=>s`<${u} class=${l} key=${a.url} ...${a} url=${a.url+"#maincontent"}/>`)}
      </div>
    </div>`}