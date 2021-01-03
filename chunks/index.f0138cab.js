import{s,m as a,u as e,b as t}from"../index.f7c0c5b6.js";import{f as c}from"./time.daaab1ba.js";null;const r="writings_1a8img0",i="list_1a8img0",l="card_1a8img0";null;const n="card_cwjn7n",$="title_cwjn7n",m="summary_cwjn7n",d="date_cwjn7n",o="readmore_cwjn7n";function u({class:s,url:e,title:t,summary:r,date:i}){let l=n;return s&&(l=`${l} ${s}`),a`<div class=${l}>
      <h2 class=${$}>
        <a href=${e}>${t}</a>
      </h2>
      <p class=${d}>${c(i)}</p>
      <p class=${m}>${r}</p>
      <p class=${o} aria-label=${"Read more about "+t}>
        <a href=${e}>Read more</a>
      </p>
    </div>`}export default function(){return e("Writings"),a`<div class=${r}>
      <div className=${i}>
        ${t.map(s=>a`<${u} class=${l} key=${s.url} ...${s} url=${s.url+"#maincontent"}/>`)}
      </div>
    </div>`}