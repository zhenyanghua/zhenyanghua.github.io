import{s,m as a,u as e}from"../index.f7d07a73.js";import{f as t}from"./time.daaab1ba.js";s("/assets/style.module.2e651384.css");const r="writings_j5bi2k",n="list_j5bi2k",l="card_j5bi2k";null;const i="card_cwjn7n",$="title_cwjn7n",c="summary_cwjn7n",d="date_cwjn7n",o="readmore_cwjn7n";function p({id:s,class:e,url:r,title:n,summary:l,date:p}){let u=i;return e&&(u=`${u} ${e}`),a`<div id=${s} class=${u}>
      <h2 class=${$}>
        <a href=${r}>${n}</a>
      </h2>
      <p class=${d}>${t(p)}</p>
      <p class=${c} dangerouslySetInnerHTML=${{__html:l}}/>
      <p class=${o} aria-label=${"Read more about "+n}>
        <a href=${r}>Read more</a>
      </p>
    </div>`}null;const u="page_1es3dyz";function m({prev:s,current:e,first:t,last:r,total:n,next:l}){return a`<div className=${u}>
      <span><a href=${t}>1</a></span>
      <span><a href=${s}>Prev</a></span>
      <span>${e} / <a href=${r}>${n}</a></span>
      <span><a href=${l}>Next</a></span>
    </div>`}function f({posts:s}){a`<div>
        <label for="search">Search Article</label>
        <input id="search" type="text"/>
        <ul>
            ${s.map(s=>a`<li key=${s.url}>${s.title}</li>`)}
        </ul>
    </div>`}function h({posts:s,page:t}){return e("Writings"),a`<div class=${r}>
      <${f} posts=${s}/>
      <${m} ...${t}/>
      <div class=${n}>
        ${s.map(s=>a`<${p} id=${s.url} class=${l} key=${s.url} ...${s} url=${s.url+"#maincontent"}/>`)}
      </div>
      <${m} ...${t}/>
    </div>`}export{h as W};