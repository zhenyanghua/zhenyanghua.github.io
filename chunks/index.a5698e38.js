import{s,m as a,y as t,b as e}from"../index.0c94d8a6.js";import{f as c}from"./time.daaab1ba.js";null;const i="writings_1a8img0",n="list_1a8img0",d="card_1a8img0";null;const l="card_cwjn7n",r="title_cwjn7n",m="summary_cwjn7n",$="date_cwjn7n";function u({class:s,url:t,title:e,summary:i,date:n}){let d=l;return s&&(d=`${d} ${s}`),a`<div class=${d}>
      <h2 class=${r}>
        <a href=${t}>${e}</a>
      </h2>
      <p class=${$}>${c(n)}</p>
      <p class=${m}>${i}</p>
    </div>`}export default function(){return t(()=>{document.title="Writings - Zhenyang Hua"},[]),a`<div class=${i}>
      <div className=${n}>
        ${e.map(s=>a`<${u} class=${d} key=${s.url} ...${s}/>`)}
      </div>
    </div>`}