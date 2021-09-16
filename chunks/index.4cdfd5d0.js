import{s,m as a,u as e}from"../index.72ccb5cf.js";import{f as t}from"./time.daaab1ba.js";s("/assets/style.module.2e651384.css");const n="writings_j5bi2k",r="list_j5bi2k",$="card_j5bi2k";null;const c="card_cwjn7n",i="title_cwjn7n",l="summary_cwjn7n",d="date_cwjn7n",o="readmore_cwjn7n";function p({id:s,class:e,url:n,title:r,summary:$,date:p}){let u=c;return e&&(u=`${u} ${e}`),a`<div id=${s} class=${u}>
      <h2 class=${i}>
        <a href=${n}>${r}</a>
      </h2>
      <p class=${d}>${t(p)}</p>
      <p class=${l} dangerouslySetInnerHTML=${{__html:$}}/>
      <p class=${o} aria-label=${"Read more about "+r}>
        <a href=${n}>Read more</a>
      </p>
    </div>`}null;const u="page_1es3dyz";function m({prev:s,current:e,first:t,last:n,total:r,next:$}){return a`<div className=${u}>
      <span><a href=${t}>1</a></span>
      <span><a href=${s}>Prev</a></span>
      <span>${e} / <a href=${n}>${r}</a></span>
      <span><a href=${$}>Next</a></span>
    </div>`}function f({posts:s,page:t}){return e("Writings"),a`<div class=${n}>
      <${m} ...${t}/>
      <div class=${r}>
        ${s.map(s=>a`<${p} id=${s.url} class=${$} key=${s.url} ...${s} url=${s.url+"#maincontent"}/>`)}
      </div>
      <${m} ...${t}/>
    </div>`}export{f as W};