import{s as e,m as s,b as a,y as l,u as t,e as n}from"../index.afbb3992.js";import{f as r}from"./time.daaab1ba.js";e("/assets/style.module.2e651384.css");const c="writings_j5bi2k",i="list_j5bi2k",u="card_j5bi2k";null;const $="card_cwjn7n",o="title_cwjn7n",p="summary_cwjn7n",d="date_cwjn7n",f="readmore_cwjn7n";function v({id:e,class:a,url:l,title:t,summary:n,date:c}){let i=$;return a&&(i=`${i} ${a}`),s`<div id=${e} class=${i}>
      <h2 class=${o}>
        <a href=${l}>${t}</a>
      </h2>
      <p class=${d}>${r(c)}</p>
      <p class=${p} dangerouslySetInnerHTML=${{__html:n}}/>
      <p class=${f} aria-label=${"Read more about "+t}>
        <a href=${l}>Read more</a>
      </p>
    </div>`}null;const m="page_1es3dyz";function h({prev:e,current:a,first:l,last:t,total:n,next:r}){return s`<div class=${m}>
      <span><a href=${l}>1</a></span>
      <span><a href=${e}>Prev</a></span>
      <span>${a} / <a href=${t}>${n}</a></span>
      <span><a href=${r}>Next</a></span>
    </div>`}null;const b="search_1pt434p",_="searchBox_1pt434p",w="hidden_1pt434p",y="active_1pt434p";function g({posts:e}){const[t,n]=a(""),[r,c]=a(null),[i,u]=a(null),$=e.filter(e=>e.title.toLowerCase().includes(t.trim().toLowerCase())).slice(0,5),o=e=>{location.assign(e)};return l(()=>{null!==i&&o($[i].url)},[i]),s`<div class=${b} onKeyDown=${e=>{let s=r;switch(e.key){case"ArrowDown":e.preventDefault(),s=null===s?0:(s+1)%$.length;break;case"ArrowUp":e.preventDefault(),s=null===s?$.length-1:(s-1+$.length)%$.length;break;case"Enter":e.preventDefault(),u(s);break;case"Escape":e.preventDefault(),s=null}c(s)}} onBlur=${e=>{e.preventDefault(),c(null)}}>
            <div class=${_}>
                <label for="search">Search Article</label>
                <input id="search" type="text" value=${t} onInput=${e=>{n(e.target.value),c(0)}}/>
            </div>
            <ul class=${null!==r&&$[r]?"":w}>
                ${$.map(e=>s`<li key=${e.url} class=${null!==r&&$[r]&&e.url===$[r].url?y:""} onClick=${()=>{console.debug("clicked"),o(e.url)}}>${e.title}</li>`)}
            </ul>
        </div>`}function k({posts:e,page:a}){return t("Writings"),s`<div class=${c}>
      <${g} posts=${n}/>
      <${h} ...${a}/>
      <div class=${i}>
        ${e.map(e=>s`<${v} id=${e.url} class=${u} key=${e.url} ...${e} url=${e.url+"#maincontent"}/>`)}
      </div>
      <${h} ...${a}/>
    </div>`}export{k as W};