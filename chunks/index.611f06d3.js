import{s,m as a,u as e,b as t}from"../index.7b723884.js";import{f as r}from"./time.daaab1ba.js";null;const n="writings_1a8img0",l="list_1a8img0",c="card_1a8img0";null;const i="card_cwjn7n",m="title_cwjn7n",$="summary_cwjn7n",d="date_cwjn7n",o="readmore_cwjn7n";function u({class:s,url:e,title:t,summary:n,date:l}){let c=i;return s&&(c=`${c} ${s}`),a`<div class=${c}>
      <h2 class=${m}>
        <a href=${e}>${t}</a>
      </h2>
      <p class=${d}>${r(l)}</p>
      <p class=${$} dangerouslySetInnerHTML=${{__html:n}}/>
      <p class=${o} aria-label=${"Read more about "+t}>
        <a href=${e}>Read more</a>
      </p>
    </div>`}export default function(){return e("Writings"),a`<div class=${n}>
      <div className=${l}>
        ${t.map(s=>a`<${u} class=${c} key=${s.url} ...${s} url=${s.url+"#maincontent"}/>`)}
      </div>
    </div>`}