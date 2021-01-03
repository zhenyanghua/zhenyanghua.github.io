import{s,m as a,b as e}from"../index.552eb74c.js";s("/assets/style.module.d341b83a.css"),null;const t={card:"card_cwjn7n",title:"title_cwjn7n",summary:"summary_cwjn7n"};function l({url:s,label:e,title:l,summary:r}){return a`<div class=${t.card}>
      <h2 class=${t.label}>
        <a href=${s}>${l}</a>
      </h2>
      <p class=${t.summary}>${r}</p>
    </div>`}export default function(){return a`<div>
      ${e.map(s=>a`<${l} key=${s.url} ...${s}/>`)}
    </div>`}