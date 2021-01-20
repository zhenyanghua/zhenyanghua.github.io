import{s as a,m as s,u as e}from"../index.4d2539ec.js";import{f as r}from"./time.daaab1ba.js";a("/assets/style.module.001d6c98.css");const t="writings_j5bi2k",n="list_j5bi2k",i="page_j5bi2k",l="card_j5bi2k";null;const $="card_cwjn7n",c="title_cwjn7n",d="summary_cwjn7n",o="date_cwjn7n",p="readmore_cwjn7n";function m({id:a,class:e,url:t,title:n,summary:i,date:l}){let m=$;return e&&(m=`${m} ${e}`),s`<div id=${a} class=${m}>
      <h2 class=${c}>
        <a href=${t}>${n}</a>
      </h2>
      <p class=${o}>${r(l)}</p>
      <p class=${d} dangerouslySetInnerHTML=${{__html:i}}/>
      <p class=${p} aria-label=${"Read more about "+n}>
        <a href=${t}>Read more</a>
      </p>
    </div>`}function u({posts:a,page:r}){return e("Writings"),s`<div class=${t}>
      <div class=${i}>
        <span><a href=${r.prev}>Prev</a></span>
        <span>${r.current} / <a href=${r.lastPage}>${r.total}</a></span>
        <span><a href=${r.next}>Next</a></span>
      </div>
      <div class=${n}>
        ${a.map(a=>s`<${m} id=${a.url} class=${l} key=${a.url} ...${a} url=${a.url+"#maincontent"}/>`)}
      </div>
    </div>`}export{u as W};