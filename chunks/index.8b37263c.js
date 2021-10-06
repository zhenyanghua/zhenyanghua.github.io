import{s as e,a as t,y as s,m as a,b as n,u as l,e as r}from"../index.38952e88.js";import{f as c}from"./time.daaab1ba.js";e("/assets/style.module.2e651384.css");const i="writings_j5bi2k",u="list_j5bi2k",o="card_j5bi2k";null;const $="card_cwjn7n",p="title_cwjn7n",h="summary_cwjn7n",d="date_cwjn7n",f="readmore_cwjn7n";function m({id:e,class:n,url:l,title:r,summary:i,date:u}){let o=$;n&&(o=`${o} ${n}`);const m=t(null);return s(()=>{m.current&&(console.debug("rendering plain html"),ref.current.innerHTML=i)},[]),a`<div id=${e} class=${o}>
      <h2 class=${p}>
        <a href=${l}>${r}</a>
      </h2>
      <p class=${d}>${c(u)}</p>
      <p class=${h} ref=${m} dangerouslySetInnerHTML=${{__html:i}}/>
      <p class=${f} aria-label=${"Read more about "+r}>
        <a href=${l}>Read more</a>
      </p>
    </div>`}null;const g="page_1es3dyz";function v({prev:e,current:t,first:s,last:n,total:l,next:r}){return a`<div class=${g}>
      <span><a href=${s}>1</a></span>
      <span><a href=${e}>Prev</a></span>
      <span>${t} / <a href=${n}>${l}</a></span>
      <span><a href=${r}>Next</a></span>
    </div>`}null;const b="search_1pt434p",w="searchBox_1pt434p",y="hidden_1pt434p",_="active_1pt434p";null;const j="textHighlight_b8ahmi";function k({children:e,match:t}){if("string"!=typeof e||!t.trim())return e;const s=[],n=function(e,t){const s=[];let a=e.length,n=t.length;const l=new Array(a);!function(e,t){let s=0,a=1;e[0]=0;for(;a<e.length;)t.charAt(a)===t.charAt(s)?(e[a]=s+1,s++,a++):0!==s?s=e[s-1]:(e[a]=0,a++)}(l,e);let r=0,c=0;for(;r<n;)t.charAt(r)===e.charAt(c)?(r++,c++):0===c?r++:c=l[c-1],c===a&&0!==c&&(s.push(r-c),c=l[c-1]);return s}(t.trim().toLowerCase(),e.trim().toLocaleLowerCase());if(0===n.length)return e;let l=0,r=0;for(;l<e.length&&r<n.length;){const c=n[r],i=n[r]+t.trim().length,u=e.substring(l,c),o=e.substring(c,i);s.push(u),s.push(a`<span class=${j}>${o}</span>`),l=i,r++}return l<e.length&&s.push(e.substring(l)),a`
            ${s}
        `}function A({posts:e}){const[t,l]=n(""),[r,c]=n(null),[i,u]=n(null),o=e.filter(e=>e.title.toLowerCase().includes(t.trim().toLowerCase())).slice(0,5),$=e=>{location.assign(e)};return s(()=>{null!==i&&$(o[i].url)},[i]),a`<div class=${b} onKeyDown=${e=>{let t=r;switch(e.key){case"ArrowDown":e.preventDefault(),t=null===t?0:(t+1)%o.length;break;case"ArrowUp":e.preventDefault(),t=null===t?o.length-1:(t-1+o.length)%o.length;break;case"Enter":e.preventDefault(),u(t);break;case"Escape":e.preventDefault(),t=null}c(t)}} onBlur=${e=>{e.preventDefault(),c(null)}}>
            <div class=${w}>
                <label for="search">Search Article</label>
                <input id="search" type="text" autocomplete="off" value=${t} onInput=${e=>{l(e.target.value),c(0)}}/>
            </div>
            <ul class=${null!==r&&o[r]&&t.trim()?"":y}>
                ${o.map(e=>a`<li key=${e.url} class=${null!==r&&o[r]&&e.url===o[r].url?_:""} onClick=${()=>{$(e.url)}}>
                        <${k} match=${t}>${e.title}</${k}>
                    </li>`)}
            </ul>
        </div>`}function x({posts:e,page:t}){return l("Writings"),a`<div class=${i}>
      <${A} posts=${r}/>
      <${v} ...${t}/>
      <div class=${u}>
        ${e.map(e=>a`<${m} id=${e.url} class=${o} key=${e.url} ...${e} url=${e.url+"#maincontent"}/>`)}
      </div>
      <${v} ...${t}/>
    </div>`}export{x as W};