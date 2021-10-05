import{y as e,m as n}from"../index.4495e58c.js";import"./time.daaab1ba.js";import{P as r}from"./index.486ee963.js";const t=["function visualizeArray(containerSelector, array, ...highlightRanges) {\n    const container = document.querySelector(containerSelector);\n    const highlights = Array.from(arguments).slice(2);\n    console.debug('hili', highlights)\n    container.innerHTML = array.map((x, i) => {\n      let style = '';\n      for (let {range, color} of highlights) {\n        if (range.includes(i) || (range[0] < i && range[1] > i)) {\n          style = 'background-color: ' + color + ';';\n        }\n      }\n      return '<div class=\"item\" style=\"' + style + '\">' + x + '</div>'\n    }).join('');\n  }","const red = '#e17474b0';\n  const green = '#4caf5096';\n  const blue = '#2196f37a';\n  const textKmp1 = 'onionions';\n  const patternKmp1 = 'onions';\n  visualizeArray('#text-kmp-1', Array.from(textKmp1));\n  visualizeArray('#pattern-kmp-1', Array.from(patternKmp1));\n  visualizeArray('#text-kmp-2', Array.from(textKmp1), { range: [0, 4], color: green }, { range: [5], color: blue });\n  visualizeArray('#pattern-kmp-2', Array.from(patternKmp1), { range: [0, 4], color: green }, { range: [5], color: red });"];export default function(){return e(()=>{t.forEach(e=>new Function(e)())},[]),n`<${r} ...${{title:"Efficient Text Highlighter",date:"2021-10-02 19:38:00"}} summary=${"<p>When I built the search blog post feature of this site, there is a nice visual enhancement called text highligher as part of the search component. I implemented the same feature with three different approaches, regex replacement with <code>innerHTML</code>, brute force pattern matching, and finally a more efficient approach with Knuth-Morris-Pratt (KMP) text search algorithm. In this post, I will show all three approaches to implement this feature with some interactive visualization to hopefully help a few people see the joy of programming while applying some common algorithms to a practical use case. </p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<style>\n    .array {\n      display: flex;\n      width: fit-content;\n      margin: 20px;\n    }\n    .item {\n      border: 4px solid black;\n      border-right: none;\n      width: 30px;\n      height: 30px;\n      padding: 4px;\n      font-size: 20px;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n    }\n    .item:last-child {\n      border-right: 4px solid black;\n    }\n</style>\n\n<h2>\n  <a id="regex-replacement" class="anchor" aria-hidden="true" href="#regex-replacement">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Regex Replacement</h2><h2>\n  <a id="brute-force-pattern-matching" class="anchor" aria-hidden="true" href="#brute-force-pattern-matching">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Brute force pattern matching</h2><h2>\n  <a id="knuth-morris-pratt-text-search-algorithm" class="anchor" aria-hidden="true" href="#knuth-morris-pratt-text-search-algorithm">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Knuth-Morris-Pratt text search algorithm</h2><div id="text-kmp-1" class="array"></div>\n<div id="pattern-kmp-1" class="array"></div>\n<div id="text-kmp-2" class="array"></div>\n<div id="pattern-kmp-2" class="array"></div>\n\n<script>\n  function visualizeArray(containerSelector, array, ...highlightRanges) {\n    const container = document.querySelector(containerSelector);\n    const highlights = Array.from(arguments).slice(2);\n    console.debug(\'hili\', highlights)\n    container.innerHTML = array.map((x, i) => {\n      let style = \'\';\n      for (let {range, color} of highlights) {\n        if (range.includes(i) || (range[0] < i && range[1] > i)) {\n          style = \'background-color: \' + color + \';\';\n        }\n      }\n      return \'<div class="item" style="\' + style + \'">\' + x + \'</div>\'\n    }).join(\'\');\n  }\n<\/script>\n\n<script>\n  const red = \'#e17474b0\';\n  const green = \'#4caf5096\';\n  const blue = \'#2196f37a\';\n  const textKmp1 = \'onionions\';\n  const patternKmp1 = \'onions\';\n  visualizeArray(\'#text-kmp-1\', Array.from(textKmp1));\n  visualizeArray(\'#pattern-kmp-1\', Array.from(patternKmp1));\n  visualizeArray(\'#text-kmp-2\', Array.from(textKmp1), { range: [0, 4], color: green }, { range: [5], color: blue });\n  visualizeArray(\'#pattern-kmp-2\', Array.from(patternKmp1), { range: [0, 4], color: green }, { range: [5], color: red });\n<\/script>\n\n'}}/>
    </${r}>`}
function $w_s$(e,t){document.querySelector('link[rel=stylesheet][href="'+e+'"]')||((t=document.createElement("link")).rel="stylesheet",t.href=e,document.head.appendChild(t))}
$w_s$("/assets/style.module.184703f0.css");