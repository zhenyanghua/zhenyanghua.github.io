import{s as e,m as t,b as s,y as a,u as l,e as n}from"../index.d8a23b33.js";import{f as r}from"./time.daaab1ba.js";e("/assets/style.module.2e651384.css");const c="writings_j5bi2k",i="list_j5bi2k",u="card_j5bi2k";null;const o="card_cwjn7n",$="title_cwjn7n",p="summary_cwjn7n",h="date_cwjn7n",d="readmore_cwjn7n";function f({id:e,class:s,url:a,title:l,summary:n,date:c}){let i=o;return s&&(i=`${i} ${s}`),t`<div id=${e} class=${i}>
      <h2 class=${$}>
        <a href=${a}>${l}</a>
      </h2>
      <p class=${h}>${r(c)}</p>
      <p class=${p} dangerouslySetInnerHTML=${{__html:n}}/>
      <p class=${d} aria-label=${"Read more about "+l}>
        <a href=${a}>Read more</a>
      </p>
    </div>`}null;const m="page_1es3dyz";function g({prev:e,current:s,first:a,last:l,total:n,next:r}){return t`<div class=${m}>
      <span><a href=${a}>1</a></span>
      <span><a href=${e}>Prev</a></span>
      <span>${s} / <a href=${l}>${n}</a></span>
      <span><a href=${r}>Next</a></span>
    </div>`}null;const v="search_1pt434p",b="searchBox_1pt434p",w="hidden_1pt434p",y="active_1pt434p";null;const _="textHighlight_b8ahmi";function j({children:e,match:s}){if("string"!=typeof e||!s.trim())return e;const a=[],l=function(e,t){const s=[];let a=e.length,l=t.length;const n=new Array(a);!function(e,t){let s=0,a=1;e[0]=0;for(;a<e.length;)t.charAt(a)===t.charAt(s)?(e[a]=s+1,s++,a++):0!==s?s=e[s-1]:(e[a]=0,a++)}(n,e);let r=0,c=0;for(;r<l;)t.charAt(r)===e.charAt(c)?(r++,c++):0===c?r++:c=n[c-1],c===a&&0!==c&&(s.push(r-c),c=n[c-1]);return s}(s.trim().toLowerCase(),e.trim().toLocaleLowerCase());if(0===l.length)return e;let n=0,r=0;for(;n<e.length&&r<l.length;){const c=l[r],i=l[r]+s.trim().length,u=e.substring(n,c),o=e.substring(c,i);a.push(u),a.push(t`<span class=${_}>${o}</span>`),n=i,r++}return n<e.length&&a.push(e.substring(n)),t`
            ${a}
        `}function k({posts:e}){const[l,n]=s(""),[r,c]=s(null),[i,u]=s(null),o=e.filter(e=>e.title.toLowerCase().includes(l.trim().toLowerCase())).slice(0,5),$=e=>{location.assign(e)};return a(()=>{null!==i&&$(o[i].url)},[i]),t`<div class=${v} onKeyDown=${e=>{let t=r;switch(e.key){case"ArrowDown":e.preventDefault(),t=null===t?0:(t+1)%o.length;break;case"ArrowUp":e.preventDefault(),t=null===t?o.length-1:(t-1+o.length)%o.length;break;case"Enter":e.preventDefault(),u(t);break;case"Escape":e.preventDefault(),t=null}c(t)}} onBlur=${e=>{e.preventDefault(),c(null)}}>
            <div class=${b}>
                <label for="search">Search Article</label>
                <input id="search" type="text" autocomplete="off" value=${l} onInput=${e=>{n(e.target.value),c(0)}}/>
            </div>
            <ul class=${null!==r&&o[r]&&l.trim()?"":w}>
                ${o.map(e=>t`<li key=${e.url} class=${null!==r&&o[r]&&e.url===o[r].url?y:""} onClick=${()=>{$(e.url)}}>
                        <${j} match=${l}>${e.title}</${j}>
                    </li>`)}
            </ul>
        </div>`}function A({posts:e,page:s}){return l("Writings"),t`<div class=${c}>
      <${k} posts=${n}/>
      <${g} ...${s}/>
      <div class=${i}>
        ${e.map(e=>t`<${f} id=${e.url} class=${u} key=${e.url} ...${e} url=${e.url+"#maincontent"}/>`)}
      </div>
      <${g} ...${s}/>
    </div>`}export{A as W};