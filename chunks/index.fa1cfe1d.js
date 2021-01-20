import{s,m as a,b as t}from"../index.f7dbc950.js";s("/assets/style.module.d341b83a.css"),null;const e="card_cwjn7n",n="title_cwjn7n",c="summary_cwjn7n";function r({url:s,title:t,summary:r}){return a`<div class=${e}>
      <h2 class=${n}>
        <a href=${s}>${t}</a>
      </h2>
      <p class=${c}>${r}</p>
    </div>`}export default function(){return a`<div>
      ${t.map(s=>a`<${r} key=${s.url} ...${s}/>`)}
    </div>`}