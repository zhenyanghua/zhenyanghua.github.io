import{s as e,m as s,b as t,y as a,u as l,e as n}from"../index.b692d1cc.js";import{f as r}from"./time.daaab1ba.js";e("/assets/style.module.2e651384.css");const c="writings_j5bi2k",i="list_j5bi2k",u="card_j5bi2k";null;const o="card_cwjn7n",$="title_cwjn7n",p="summary_cwjn7n",d="date_cwjn7n",h="readmore_cwjn7n";function f({id:e,class:t,url:a,title:l,summary:n,date:c}){let i=o;return t&&(i=`${i} ${t}`),s`<div id=${e} class=${i}>
      <h2 class=${$}>
        <a href=${a}>${l}</a>
      </h2>
      <p class=${d}>${r(c)}</p>
      <p class=${p} dangerouslySetInnerHTML=${{__html:n}}/>
      <p class=${h} aria-label=${"Read more about "+l}>
        <a href=${a}>Read more</a>
      </p>
    </div>`}null;const m="page_1es3dyz";function v({prev:e,current:t,first:a,last:l,total:n,next:r}){return s`<div class=${m}>
      <span><a href=${a}>1</a></span>
      <span><a href=${e}>Prev</a></span>
      <span>${t} / <a href=${l}>${n}</a></span>
      <span><a href=${r}>Next</a></span>
    </div>`}null;const g="search_1pt434p",b="searchBox_1pt434p",_="hidden_1pt434p",w="active_1pt434p";null;const y="textHighlight_b8ahmi";function j({children:e,match:t}){if("string"!=typeof e||!t.trim())return e;const a=[];let l=0,n=0;for(;l<e.length;){let r=e.substring(l,l+t.length);r.toLowerCase()===t.toLowerCase()?(a.push(e.substring(n,l)),a.push(s`<span class=${y}>${r}</span>`),l+=t.length,n=l):l++}return n<l&&a.push(e.substring(n)),s`
            ${a}
        `}function k({posts:e}){const[l,n]=t(""),[r,c]=t(null),[i,u]=t(null),o=e.filter(e=>e.title.toLowerCase().includes(l.trim().toLowerCase())).slice(0,5),$=e=>{location.assign(e)};return a(()=>{null!==i&&$(o[i].url)},[i]),s`<div class=${g} onKeyDown=${e=>{let s=r;switch(e.key){case"ArrowDown":e.preventDefault(),s=null===s?0:(s+1)%o.length;break;case"ArrowUp":e.preventDefault(),s=null===s?o.length-1:(s-1+o.length)%o.length;break;case"Enter":e.preventDefault(),u(s);break;case"Escape":e.preventDefault(),s=null}c(s)}} onBlur=${e=>{e.preventDefault(),c(null)}}>
            <div class=${b}>
                <label for="search">Search Article</label>
                <input id="search" type="text" autocomplete="off" value=${l} onInput=${e=>{n(e.target.value),c(0)}}/>
            </div>
            <ul class=${null!==r&&o[r]&&l.trim()?"":_}>
                ${o.map(e=>s`<li key=${e.url} class=${null!==r&&o[r]&&e.url===o[r].url?w:""} onClick=${()=>{$(e.url)}}>
                        <${j} match=${l}>${e.title}</${j}>
                    </li>`)}
            </ul>
        </div>`}function x({posts:e,page:t}){return l("Writings"),s`<div class=${c}>
      <${k} posts=${n}/>
      <${v} ...${t}/>
      <div class=${i}>
        ${e.map(e=>s`<${f} id=${e.url} class=${u} key=${e.url} ...${e} url=${e.url+"#maincontent"}/>`)}
      </div>
      <${v} ...${t}/>
    </div>`}export{x as W};