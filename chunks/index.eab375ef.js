import{s,m as a,b as e}from"../index.fcd7c8c9.js";s("/assets/style.module.d341b83a.css"),null;const t={card:"card_cwjn7n",title:"title_cwjn7n",summary:"summary_cwjn7n"};function c({url:s,label:e,title:c,summary:l}){return a`<div class=${t.card}>
      <h2 class=${t.label}>
        <a href=${s}>${c}</a>
      </h2>
      <p class=${t.summary}>${l}</p>
    </div>`}export default function(){return a`<div>
      ${e.map(s=>a`<${c} key=${s.url} ...${s}/>`)}
    </div>`}