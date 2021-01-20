import{s,m as a,y as t,b as e}from"../index.5387ff1b.js";import{f as i}from"./time.daaab1ba.js";null;const c="writings_1a8img0",n="list_1a8img0",l="card_1a8img0";null;const d="card_cwjn7n",r="title_cwjn7n",m="summary_cwjn7n",$="date_cwjn7n";function u({class:s,url:t,title:e,summary:c,date:n}){let l=d;return s&&(l=`${l} ${s}`),a`<div class=${l}>
      <h2 class=${r}>
        <a href=${t}>${e}</a>
      </h2>
      <p class=${$}>${i(n)}</p>
      <p class=${m}>${c}</p>
    </div>`}export default function(){return t(()=>{document.title="Writings - Zhenyang Hua"},[]),a`<div class=${c}>
      <div className=${n}>
        ${e.map(s=>a`<${u} class=${l} key=${s.url} ...${s}/>`)}
      </div>
    </div>`}