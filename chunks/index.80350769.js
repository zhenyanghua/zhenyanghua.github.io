import{s,m as a,b as e,u as t,e as r}from"../index.02e07533.js";import{f as n}from"./time.daaab1ba.js";s("/assets/style.module.2e651384.css");const l="writings_j5bi2k",i="list_j5bi2k",$="card_j5bi2k";null;const c="card_cwjn7n",o="title_cwjn7n",u="summary_cwjn7n",d="date_cwjn7n",p="readmore_cwjn7n";function m({id:s,class:e,url:t,title:r,summary:l,date:i}){let $=c;return e&&($=`${$} ${e}`),a`<div id=${s} class=${$}>
      <h2 class=${o}>
        <a href=${t}>${r}</a>
      </h2>
      <p class=${d}>${n(i)}</p>
      <p class=${u} dangerouslySetInnerHTML=${{__html:l}}/>
      <p class=${p} aria-label=${"Read more about "+r}>
        <a href=${t}>Read more</a>
      </p>
    </div>`}null;const f="page_1es3dyz";function v({prev:s,current:e,first:t,last:r,total:n,next:l}){return a`<div className=${f}>
      <span><a href=${t}>1</a></span>
      <span><a href=${s}>Prev</a></span>
      <span>${e} / <a href=${r}>${n}</a></span>
      <span><a href=${l}>Next</a></span>
    </div>`}function h({posts:s}){const[t,r]=e(""),n=s.filter(s=>s.title.toLowerCase().includes(t.trim().toLowerCase()));return a`<div>
            <label for="search">Search Article</label>
            <input id="search" type="text" value=${t} onInput=${s=>{r(s.target.value)}}/>
            <ul>
                ${n.map(s=>a`<li key=${s.url}>${s.title}</li>`)}
            </ul>
        </div>`}function _({posts:s,page:e}){return t("Writings"),a`<div class=${l}>
      <${h} posts=${r}/>
      <${v} ...${e}/>
      <div class=${i}>
        ${s.map(s=>a`<${m} id=${s.url} class=${$} key=${s.url} ...${s} url=${s.url+"#maincontent"}/>`)}
      </div>
      <${v} ...${e}/>
    </div>`}export{_ as W};