import{y as e,m as n}from"../index.f7bcea61.js";import"./time.daaab1ba.js";import{P as t}from"./index.5b50ff61.js";const r=["const red = '#e17474b0';\n  const green = '#4caf5096';\n  const blue = '#2196f37a';\n    function visualizeArray({ containerSelector, array, highlights, pointers }) {\n    const containers = document.querySelectorAll(containerSelector);\n    Array.from(containers).forEach(container => {\n      let _highlights = highlights;\n      let _pointers = pointers;\n      let _array = array;\n      if (!_array && container.hasAttribute('data-array')) {\n        const arrString = container.getAttribute('data-array');\n        if (typeof arrString === 'string' && !/^\\[.*\\]$/.test(arrString)) {\n          _array = Array.from(arrString);\n        } else {\n          _array = JSON.parse(arrString);\n        }\n      }\n      if (!_highlights && container.hasAttribute('data-highlights')) {\n        _highlights = JSON.parse(container.getAttribute('data-highlights'));\n        _highlights.forEach((highlight) => {\n          switch(highlight.color) {\n            case 'red':\n              highlight.color = red;\n              break;\n            case 'blue':\n              highlight.color = blue;\n              break;\n            case 'green':\n              highlight.color = green;\n              break;\n          }\n        });\n      }\n      if (!_pointers && container.hasAttribute('data-pointers')) {\n        _pointers = JSON.parse(container.getAttribute('data-pointers'));\n      }\n      if (_array) {\n        container.innerHTML = _array.map((x, i) => {\n          let style = '';\n          if (_highlights) {\n            for (let {range, color} of _highlights) {\n              if (range.includes(i) || (range[0] < i && range[1] > i)) {\n                style = 'background-color: ' + color + ';';\n              }\n            }\n          }\n          return '<div class=\"item center\" style=\"' + style + '\">' \n            + (_pointers && _pointers.includes(i) ? ('<div class=\"pointer center\">' + x + '</div>') : x ) \n            + '</div>'\n        }).join('');\n      }\n    });\n  }\n  window.vsa = visualizeArray;\n  window.red = red;\n  window.green = green;\n  window.blue = blue;","const btnNext = document.getElementById('btn-stepper-1');\n  btnNext.addEventListener('click', () => {\n    vsa({ containerSelector: '#pat-onions', array=\"onions\", pointers=[1], highlights: [{ range: [0], color: green }] });\n    vsa({ containerSelector: '#search-onionions', array=\"onionions\", pointers=[1], highlights: [{ range: [0], color: green }] });\n  });","vsa({ containerSelector: '.array' });"];export default function(){return e(()=>{r.forEach(e=>new Function(e)())},[]),n`<${t} ...${{title:"Efficient Text Highlighter",date:"2021-10-02 19:38:00"}} summary=${"<p>When I built the search blog post feature of this site, there is a nice visual enhancement called text highligher as part of the search component. I implemented the same feature with three different approaches, regex replacement with <code>innerHTML</code>, brute force pattern matching, and finally a more efficient approach with Knuth-Morris-Pratt (KMP) text search algorithm. In this post, I will show all three approaches to implement this feature with some interactive visualization to hopefully help a few people see the joy of programming while applying some common algorithms to a practical use case. </p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<style>\n    .array {\n      display: flex;\n      width: fit-content;\n      margin: 20px;\n    }\n    .item {\n      border: 4px solid black;\n      border-right: none;\n      width: 30px;\n      height: 30px;\n      padding: 4px;\n      font-size: 20px;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      font-family: consolas, monospace, sans-serif;\n    }\n    .item:last-child {\n      border-right: 4px solid black;\n    }\n    .item .pointer {\n      outline: 4px solid #f436e5;\n      width: 100%;\n      height: 100%;\n    }\n</style>\n\n<script>\n  const red = \'#e17474b0\';\n  const green = \'#4caf5096\';\n  const blue = \'#2196f37a\';\n    function visualizeArray({ containerSelector, array, highlights, pointers }) {\n    const containers = document.querySelectorAll(containerSelector);\n    Array.from(containers).forEach(container => {\n      let _highlights = highlights;\n      let _pointers = pointers;\n      let _array = array;\n      if (!_array && container.hasAttribute(\'data-array\')) {\n        const arrString = container.getAttribute(\'data-array\');\n        if (typeof arrString === \'string\' && !/^[.*]$/.test(arrString)) {\n          _array = Array.from(arrString);\n        } else {\n          _array = JSON.parse(arrString);\n        }\n      }\n      if (!_highlights && container.hasAttribute(\'data-highlights\')) {\n        _highlights = JSON.parse(container.getAttribute(\'data-highlights\'));\n        _highlights.forEach((highlight) => {\n          switch(highlight.color) {\n            case \'red\':\n              highlight.color = red;\n              break;\n            case \'blue\':\n              highlight.color = blue;\n              break;\n            case \'green\':\n              highlight.color = green;\n              break;\n          }\n        });\n      }\n      if (!_pointers && container.hasAttribute(\'data-pointers\')) {\n        _pointers = JSON.parse(container.getAttribute(\'data-pointers\'));\n      }\n      if (_array) {\n        container.innerHTML = _array.map((x, i) => {\n          let style = \'\';\n          if (_highlights) {\n            for (let {range, color} of _highlights) {\n              if (range.includes(i) || (range[0] < i && range[1] > i)) {\n                style = \'background-color: \' + color + \';\';\n              }\n            }\n          }\n          return \'<div class="item center" style="\' + style + \'">\' \n            + (_pointers && _pointers.includes(i) ? (\'<div class="pointer center">\' + x + \'</div>\') : x ) \n            + \'</div>\'\n        }).join(\'\');\n      }\n    });\n  }\n  window.vsa = visualizeArray;\n  window.red = red;\n  window.green = green;\n  window.blue = blue;\n<\/script>\n\n<h2>\n  <a id="regex-replacement" class="anchor" aria-hidden="true" href="#regex-replacement">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Regex Replacement</h2><h2>\n  <a id="brute-force-pattern-matching" class="anchor" aria-hidden="true" href="#brute-force-pattern-matching">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Brute force pattern matching</h2><h2>\n  <a id="knuth-morris-pratt-text-search-algorithm" class="anchor" aria-hidden="true" href="#knuth-morris-pratt-text-search-algorithm">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Knuth-Morris-Pratt text search algorithm</h2><p>The above brute force algorithm in the worst case scenario, will run a comparison as long as the pattern string for every character in the search text, which has a time complexity of <code>O(N * M)</code> where <code>N</code> is the length of the search text, and <code>M</code> is the length of the pattern. KMP search algorithm elegantly utilizes the previous matching result and never moves the search cursor back and also skipped all the previous matched character for the next comparison. The essense here is to take advantage of the character sequence that are the prefix of the pattern also being the suffix of the pattern. Because of this, we could skip the comparison of the substring of the pattern that are both prefix and suffix of it, this way, given <code>M</code> &lt;&lt; <code>N</code>, for text matching where overlapping match may happen often, the times we need to reset the pattern search cursor is greatly reduced. </p>\n<p>To have the information of the character sequence that are both prefix and suffix of the pattern, we need to preprocess the pattern string so that we know the longest prefix that is also the suffix for each character. For now, let&#39;s assume such sequence doesn&#39;t include the entire sequence itself, and we will come back to it in a moment with an example to explain why we shouldn&#39;t consider the entire sequence itself as the longest prefix that is also the suffix. Sometimes people call such sequence - <code>LPS</code>, which stands for the longest proper prefix that is also the suffix in a given sequence. </p>\n<p>For example:</p>\n<div class="array" data-array="onions"></div>\n\n<p>To preprocess the pattern <code>onions</code>, </p>\n<ol>\n<li>We first test for <code>o</code>, to see if it is both prefix and suffix, based on our assumption above, the entire sequence of <code>o</code> is not an <code>LPS</code>. so we mark it as <code>0</code>;</li>\n<li>We test for <code>on</code>, to see what&#39;s the LPS in there. <code>o</code> is the prefix, and <code>n</code> is the suffix, they are not the same, so there isn&#39;t an <code>LPS</code> in them, so we mark it as <code>0</code>;</li>\n<li>We test for <code>oni</code>, possible prefixes are <code>o</code>, <code>on</code>, and possible suffixes are <code>i</code>, <code>ni</code>, and none of them are the same, so there isn&#39;t an <code>LPS</code> in them, so we mark it as <code>0</code>;</li>\n<li>We test for <code>onio</code>, possible prefixes are <code>o</code>, <code>on</code>, <code>oni</code>, and possible suffixes are <code>o</code>, <code>io</code>, <code>nio</code>, and <code>o</code> happens to be the only substring that is both a prefix and suffix, because its length is 1, so we mark it as <code>1</code>;</li>\n<li>We test for <code>onion</code>, possible prefixes are <code>o</code>, <code>on</code>, <code>oni</code>, <code>onio</code>, and possible suffixes are  <code>n</code>, <code>on</code>, <code>ion</code>, <code>nion</code>, and there are two substrings that are both prefix and suffix: <code>o</code> and <code>on</code>, we are looking for the longest substring, <code>on</code> wins, and its length is 2, so we marked it as <code>2</code>;</li>\n<li>Finally, we test for <code>onions</code>, possible prefixes are <code>o</code>, <code>on</code>, <code>oni</code>, <code>onio</code>, <code>onion</code> and possible suffixes are <code>s</code>, <code>ns</code>, <code>ons</code>, <code>ions</code>, <code>nions</code>, and there isn&#39;t any substrings are the same. so we mark it as <code>0</code>.</li>\n</ol>\n<p>Now we have this preprocessed array that represent the longest prefix that is also the suffix for each sequence for this pattern:</p>\n<p><strong>Pattern</strong></p>\n<div class="array" data-array="onions"></div>\n\n<p><strong>LPS</strong></p>\n<div class="array" data-array="000120"></div>\n\n\n<p>Now, given a text <code>onionions</code> to search for the pattern:</p>\n<div class="array" data-array="onionions" data-highlights=\'[{"range": [3, 8], "color": "blue"}]\'></div>\n\n<p><strong>Steppers</strong></p>\n<p>We create two pointers, one for the pattern, and one for the search text:</p>\n<p><strong>Pattern</strong></p>\n<div id="pat-onions" class="array" data-array="onions" data-pointers="[0]"></div>\n\n<p><strong>Search text</strong></p>\n<div id="search-onionions" class="array" data-array="onionions" data-pointers="[0]"></div>\n\n<div>\n  <button id="btn-stepper-1">Next</button>\n</div>\n\n<script>\n  const btnNext = document.getElementById(\'btn-stepper-1\');\n  btnNext.addEventListener(\'click\', () => {\n    vsa({ containerSelector: \'#pat-onions\', array="onions", pointers=[1], highlights: [{ range: [0], color: green }] });\n    vsa({ containerSelector: \'#search-onionions\', array="onionions", pointers=[1], highlights: [{ range: [0], color: green }] });\n  });\n<\/script>\n\n<script>\n  vsa({ containerSelector: \'.array\' });\n<\/script>\n\n\n'}}/>
    </${t}>`}
function $w_s$(e,t){document.querySelector('link[rel=stylesheet][href="'+e+'"]')||((t=document.createElement("link")).rel="stylesheet",t.href=e,document.head.appendChild(t))}
$w_s$("/assets/style.module.184703f0.css");