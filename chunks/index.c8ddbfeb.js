import{s as a,m as s,u as e,e as t}from"../index.e114a4ae.js";import{f as r}from"./time.daaab1ba.js";a("/assets/style.module.2e651384.css");const n="writings_j5bi2k",l="list_j5bi2k",i="card_j5bi2k";null;const $="card_cwjn7n",c="title_cwjn7n",o="summary_cwjn7n",u="date_cwjn7n",d="readmore_cwjn7n";function p({id:a,class:e,url:t,title:n,summary:l,date:i}){let p=$;return e&&(p=`${p} ${e}`),s`<div id=${a} class=${p}>
      <h2 class=${c}>
        <a href=${t}>${n}</a>
      </h2>
      <p class=${u}>${r(i)}</p>
      <p class=${o} dangerouslySetInnerHTML=${{__html:l}}/>
      <p class=${d} aria-label=${"Read more about "+n}>
        <a href=${t}>Read more</a>
      </p>
    </div>`}null;const m="page_1es3dyz";function f({prev:a,current:e,first:t,last:r,total:n,next:l}){return s`<div className=${m}>
      <span><a href=${t}>1</a></span>
      <span><a href=${a}>Prev</a></span>
      <span>${e} / <a href=${r}>${n}</a></span>
      <span><a href=${l}>Next</a></span>
    </div>`}function v({posts:a}){const[e,t]=useState(""),r=a.filter(a=>a.title.toLowerCase().includes(e.trim().toLowerCase()));return s`<div>
            <label for="search">Search Article</label>
            <input id="search" type="text" value=${e} onInput=${a=>{t(a.target.value)}}/>
            <ul>
                ${r.map(a=>s`<li key=${a.url}>${a.title}</li>`)}
            </ul>
        </div>`}function h({posts:a,page:r}){return e("Writings"),s`<div class=${n}>
      <${v} posts=${t}/>
      <${f} ...${r}/>
      <div class=${l}>
        ${a.map(a=>s`<${p} id=${a.url} class=${i} key=${a.url} ...${a} url=${a.url+"#maincontent"}/>`)}
      </div>
      <${f} ...${r}/>
    </div>`}export{h as W};