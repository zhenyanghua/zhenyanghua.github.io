import{y as e,m as n}from"../index.e62306f5.js";import"./time.daaab1ba.js";import{P as t}from"./index.bfaa6152.js";const r=["const red = '#e17474b0';\n  const green = '#4caf5096';\n  const blue = '#2196f37a';\n  const pink = '#f436e5';\n    function visualizeArray({ containerSelector, array, highlights, pointers }) {\n    const containers = document.querySelectorAll(containerSelector);\n    Array.from(containers).forEach(container => {\n      let _highlights = highlights;\n      let _pointers = pointers;\n      let _array = array;\n      if (!_array && container.hasAttribute('data-array')) {\n        const arrString = container.getAttribute('data-array');\n        if (typeof arrString === 'string' && !/^\\[.*\\]$/.test(arrString)) {\n          _array = Array.from(arrString);\n        } else {\n          _array = JSON.parse(arrString);\n        }\n      }\n      if (!_highlights && container.hasAttribute('data-highlights')) {\n        _highlights = JSON.parse(container.getAttribute('data-highlights'));\n        _highlights.forEach((highlight) => {\n          switch(highlight.color) {\n            case 'red':\n              highlight.color = red;\n              break;\n            case 'blue':\n              highlight.color = blue;\n              break;\n            case 'green':\n              highlight.color = green;\n              break;\n          }\n        });\n      }\n      if (!_pointers && container.hasAttribute('data-pointers')) {\n        _pointers = JSON.parse(container.getAttribute('data-pointers'));\n      }\n      if (_array) {\n        container.innerHTML = _array.map((x, i) => {\n          let style = '';\n          if (_highlights) {\n            for (let {range, color} of _highlights) {\n              if (range[0] <= i && range[1] >= i) {\n                style = 'background-color: ' + color + ';';\n              }\n            }\n          }\n          let pointerStyle = '';\n          if (_pointers && pointers.some(p => p.index === i)) {\n            const { index, color } = _pointers.find(p => p.index === i);\n            pointerStyle = 'outline-color: ' + color + ';';\n          }\n          return '<div class=\"item center\" style=\"' + style + '\">' \n            + (_pointers &&  pointerStyle ? ('<div class=\"pointer center\" style=\"' + pointerStyle + '\">' + x + '</div>') : x ) \n            + '</div>'\n        }).join('');\n      }\n    });\n  }\n  function* kmpSearch(pattern, text) {\n    const result = [];\n    let m = pattern.length;\n    let n = text.length;\n    const lps = new Array(m);\n    preProcess(lps, pattern, false).next();\n    // point to the text\n    let i = 0;\n    // point to the pattern\n    let j = 0;\n    // this flag is informational to visualization only\n    let mismatch = false;\n    let mismatchedJ = j;\n    while (i < n) {\n      yield { i, j, result };\n      if (text.charAt(i) === pattern.charAt(j)) {\n        mismatch = false;\n        i++;\n        j++;\n      } else {\n        mismatch = true;\n        yield { i, j, result, mismatch };\n        if (j === 0) {\n          i++;\n        } else {\n          j = lps[j - 1];\n        }\n      }\n      // a pattern matching occurrence is found\n      if (j === m) {\n        if (j !== 0) {\n          result.push(i - j);\n          // reset j to account for overlapping\n          j = lps[j - 1];\n        }\n      }\n    }\n    return { i, j, result };\n  }\n  function* preProcess(lps, pattern, stepover) {\n    let len = 0;\n    let i = 1;\n    lps[0] = 0;\n    while(i < lps.length) {\n      if (pattern.charAt(i) === pattern.charAt(len)) {\n        if (stepover) {\n          yield { len, i };\n        }\n        lps[i] = len + 1;\n        len++;\n        i++;\n      } else {\n        if (stepover) {\n          yield { len, i, mismatch: true };\n        }\n        if (len !== 0) {\n          len = lps[len - 1];\n        } else {\n          lps[i] = 0;\n          i++;\n        }\n      }\n    }\n  }\n  window.vsa = visualizeArray;\n  window.red = red;\n  window.green = green;\n  window.blue = blue;\n  window.pink = pink;\n  window.kmpSearch = kmpSearch;\n  window.preProcess = preProcess;","let generatorNaive;\nconst inputPatNaive = document.getElementById('input-pat-naive');\nconst inputSearchNaive = document.getElementById('input-search-naive');\nconst btnStepperNaive = document.getElementById('btn-stepper-naive');\nconst reset = () => {\n  vsa({\n    containerSelector: '#pat-naive-array',\n    array: Array.from(inputPatNaive.value)\n  });\n  vsa({\n    containerSelector: '#search-naive-array',\n    array: Array.from(inputSearchNaive.value)\n  });\n  generatorNaive = searchNaive(inputPatNaive.value, inputSearchNaive.value);\n};\nreset();\ninputPatNaive.addEventListener('input', reset);\ninputSearchNaive.addEventListener('input', reset);\nbtnStepperNaive.addEventListener('click', () => {\n  const { value, done } = generatorNaive.next();\n  if (!done) {\n    if (value !== undefined) {\n      const { i, j, mismatch } = value;\n      vsa({\n        containerSelector: '#pat-naive-array',\n        array: Array.from(inputPatNaive.value),\n        pointers: [{ index: j, color: pink}]\n      });\n      vsa({\n        containerSelector: '#search-naive-array',\n        array: Array.from(inputSearchNaive.value),\n        pointers: [{ index: i, color: pink}]\n      });\n    }\n  }\n});\n\nfunction* searchNaive(pattern, text) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < text.length) {\n    let next = i;\n    while (text.charAt(next) === pattern.charAt(j)) {\n      yield { i: next, j };\n      next++;\n      j++\n      // match\n      if (j === pattern.length) {\n        result.push(i);\n        break;\n      }\n    }\n    // mismatch\n    if (j < pattern.length) {\n      yield { i, j, mismatch: true };\n    }\n    i++;\n    j = 0;\n    yield { i, j };\n  }\n  return { i, j, result };\n}","let preProcessStepper;\n  let lps;\n  const btnStepper1 = document.getElementById('btn-stepper-1');\n  const inputPatLps = document.getElementById('input-pat-lps');\n  const spanLenPointer = document.getElementById('len-pointer');\n  const resetLps = () => {\n    lps = Array(inputPatLps.value.length).fill(0);\n    spanLenPointer.innerHTML = 0;\n    vsa({\n      containerSelector: '#pat-lps-array',\n      array: Array.from(inputPatLps.value)\n    });\n    vsa({\n      containerSelector: '#lps-array',\n      array: lps\n    });\n    preProcessStepper = preProcess(lps, inputPatLps.value, true);\n  };\n  resetLps();\n  btnStepper1.addEventListener('click', () => {\n    const { value, done } = preProcessStepper.next();\n    if (!done) {\n      if (value !== undefined) {\n        const { i, len, mismatch } = value;\n        vsa({\n          containerSelector: '#pat-lps-array',\n          array: Array.from(inputPatLps.value),\n          pointers: [{ index: i, color: pink }, { index: len, color: mismatch ? red : green }],\n          highlights: [{ range: [i, i], color: mismatch ? red : green }]\n        });\n        vsa({\n          containerSelector: '#lps-array',\n          array: lps,\n          pointers: [{ index: i, color: pink }]\n        });\n        spanLenPointer.innerHTML = len;\n      }\n    } else {\n      resetLps();\n    }\n  });\n  inputPatLps.addEventListener('input', resetLps);","let pattern = 'onion';\n  let text = 'onionionsoni';\n  let searchStepper;\n  const inputPat = document.getElementById('input-pat');\n  const inputSearch = document.getElementById('input-search');\n  const btnNext = document.getElementById('btn-stepper-2');\n  inputPat.value = pattern;\n  inputSearch.value = text;\n  const reset = () => {\n    pattern = inputPat.value;\n    text = inputSearch.value;\n    vsa({ \n      containerSelector: '#pat-array', \n      array: Array.from(pattern), \n    });\n    vsa({ \n      containerSelector: '#search-array', \n      array: Array.from(text),\n    });\n    searchStepper = kmpSearch(pattern, text);\n  };\n  reset();\n  inputPat.addEventListener('input', reset);\n  inputSearch.addEventListener('input', reset);\n  btnNext.addEventListener('click', () => {\n    const { value, done } = searchStepper.next();\n    if (!done) {\n      const { i, j, result, mismatch } = value;\n      const searchHighlights = [{ range: [i-j, i-1], color: green }];\n      const patternHighlights = [{ range: [0, j-1], color: green }];\n      if (mismatch) {\n        searchHighlights.push({ range: [i, i], color: red });\n        patternHighlights.push({ range: [j, j], color: red });\n      }\n      const matchedPointers = result.map(startIndex => ({ index: startIndex, color: blue }));\n      vsa({ \n        containerSelector: '#pat-array', \n        array: Array.from(pattern), \n        pointers: [{ index: j , color: pink }], \n        highlights: patternHighlights\n      });\n      vsa({ \n        containerSelector: '#search-array', \n        array: Array.from(text), \n        pointers: [{ index: i , color: pink }, ...matchedPointers], \n        highlights: searchHighlights\n      });\n    } else {\n      const { result } = value;\n      const matchedHighlights = result.map(startIndex => ({ range: [startIndex, startIndex + pattern.length - 1], color: blue }));\n      const matchedPointers = result.map(startIndex => ({ index: startIndex, color: pink }));\n      vsa({ \n        containerSelector: '#pat-array', \n        array: Array.from(pattern), \n      });\n      vsa({ \n        containerSelector: '#search-array', \n        array: Array.from(text), \n        highlights: matchedHighlights,\n        pointers: matchedPointers\n      });\n      // reset generator\n      searchStepper = kmpSearch(pattern, text);\n    }\n  });","vsa({ containerSelector: '.array' });"];export default function(){return e(()=>{r.forEach(e=>new Function(e)())},[]),n`<${t} ...${{title:"Efficient Text Highlighter",date:"2021-10-02 19:38:00"}} summary=${"<p>When I built the search blog post feature of this site, there is a nice visual enhancement called text highlighter as part of the search component. I implemented the same feature with three different approaches, regex replacement with <code>innerHTML</code>, brute force pattern matching, and finally a more efficient approach with Knuth-Morris-Pratt (KMP) text search algorithm. In this post, I will show all three approaches to implement this feature with some interactive visualization to hopefully help a few people see the joy of programming while applying some common algorithms to a practical use case. </p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<style>\n    .center {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      font-family: consolas, monospace, sans-serif;\n    }\n    .array {\n      display: flex;\n      width: fit-content;\n      margin: 20px;\n    }\n    .item {\n      border: 4px solid black;\n      border-right: none;\n      width: 30px;\n      height: 30px;\n      padding: 4px;\n      font-size: 20px;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      font-family: consolas, monospace, sans-serif;\n    }\n    .item:last-child {\n      border-right: 4px solid black;\n    }\n    .item .pointer {\n      outline: 4px solid;\n      width: 100%;\n      height: 100%;\n    }\n    input {\n      font-size: 1em;\n    }\n</style>\n\n<script>\n  const red = \'#e17474b0\';\n  const green = \'#4caf5096\';\n  const blue = \'#2196f37a\';\n  const pink = \'#f436e5\';\n    function visualizeArray({ containerSelector, array, highlights, pointers }) {\n    const containers = document.querySelectorAll(containerSelector);\n    Array.from(containers).forEach(container => {\n      let _highlights = highlights;\n      let _pointers = pointers;\n      let _array = array;\n      if (!_array && container.hasAttribute(\'data-array\')) {\n        const arrString = container.getAttribute(\'data-array\');\n        if (typeof arrString === \'string\' && !/^[.*]$/.test(arrString)) {\n          _array = Array.from(arrString);\n        } else {\n          _array = JSON.parse(arrString);\n        }\n      }\n      if (!_highlights && container.hasAttribute(\'data-highlights\')) {\n        _highlights = JSON.parse(container.getAttribute(\'data-highlights\'));\n        _highlights.forEach((highlight) => {\n          switch(highlight.color) {\n            case \'red\':\n              highlight.color = red;\n              break;\n            case \'blue\':\n              highlight.color = blue;\n              break;\n            case \'green\':\n              highlight.color = green;\n              break;\n          }\n        });\n      }\n      if (!_pointers && container.hasAttribute(\'data-pointers\')) {\n        _pointers = JSON.parse(container.getAttribute(\'data-pointers\'));\n      }\n      if (_array) {\n        container.innerHTML = _array.map((x, i) => {\n          let style = \'\';\n          if (_highlights) {\n            for (let {range, color} of _highlights) {\n              if (range[0] <= i && range[1] >= i) {\n                style = \'background-color: \' + color + \';\';\n              }\n            }\n          }\n          let pointerStyle = \'\';\n          if (_pointers && pointers.some(p => p.index === i)) {\n            const { index, color } = _pointers.find(p => p.index === i);\n            pointerStyle = \'outline-color: \' + color + \';\';\n          }\n          return \'<div class="item center" style="\' + style + \'">\' \n            + (_pointers &&  pointerStyle ? (\'<div class="pointer center" style="\' + pointerStyle + \'">\' + x + \'</div>\') : x ) \n            + \'</div>\'\n        }).join(\'\');\n      }\n    });\n  }\n  function* kmpSearch(pattern, text) {\n    const result = [];\n    let m = pattern.length;\n    let n = text.length;\n    const lps = new Array(m);\n    preProcess(lps, pattern, false).next();\n    // point to the text\n    let i = 0;\n    // point to the pattern\n    let j = 0;\n    // this flag is informational to visualization only\n    let mismatch = false;\n    let mismatchedJ = j;\n    while (i < n) {\n      yield { i, j, result };\n      if (text.charAt(i) === pattern.charAt(j)) {\n        mismatch = false;\n        i++;\n        j++;\n      } else {\n        mismatch = true;\n        yield { i, j, result, mismatch };\n        if (j === 0) {\n          i++;\n        } else {\n          j = lps[j - 1];\n        }\n      }\n      // a pattern matching occurrence is found\n      if (j === m) {\n        if (j !== 0) {\n          result.push(i - j);\n          // reset j to account for overlapping\n          j = lps[j - 1];\n        }\n      }\n    }\n    return { i, j, result };\n  }\n  function* preProcess(lps, pattern, stepover) {\n    let len = 0;\n    let i = 1;\n    lps[0] = 0;\n    while(i < lps.length) {\n      if (pattern.charAt(i) === pattern.charAt(len)) {\n        if (stepover) {\n          yield { len, i };\n        }\n        lps[i] = len + 1;\n        len++;\n        i++;\n      } else {\n        if (stepover) {\n          yield { len, i, mismatch: true };\n        }\n        if (len !== 0) {\n          len = lps[len - 1];\n        } else {\n          lps[i] = 0;\n          i++;\n        }\n      }\n    }\n  }\n  window.vsa = visualizeArray;\n  window.red = red;\n  window.green = green;\n  window.blue = blue;\n  window.pink = pink;\n  window.kmpSearch = kmpSearch;\n  window.preProcess = preProcess;\n<\/script>\n\n<h2>\n  <a id="regex-replacement" class="anchor" aria-hidden="true" href="#regex-replacement">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Regex Replacement</h2><h2>\n  <a id="brute-force-pattern-matching" class="anchor" aria-hidden="true" href="#brute-force-pattern-matching">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Brute force pattern matching</h2><p>The brute force approach is to examine the each following sequence matches the pattern characters for each character in the search text. </p>\n<p><label for="input-pat-naive">Pattern text</label>\n<input id="input-pat-naive" type="text" value="onions"/> </p>\n<div id="pat-naive-array" class="array"></div>\n\n<p><label for="input-search-naive">Search text</label>\n<input id="input-search-naive" type="text" value="onionions"/> </p>\n<div id="search-naive-array" class="array"></div>\n\n<div>\n  <button id="btn-stepper-naive">Step over</button>\n</div>\n\n<script>\nlet generatorNaive;\nconst inputPatNaive = document.getElementById(\'input-pat-naive\');\nconst inputSearchNaive = document.getElementById(\'input-search-naive\');\nconst btnStepperNaive = document.getElementById(\'btn-stepper-naive\');\nconst reset = () => {\n  vsa({\n    containerSelector: \'#pat-naive-array\',\n    array: Array.from(inputPatNaive.value)\n  });\n  vsa({\n    containerSelector: \'#search-naive-array\',\n    array: Array.from(inputSearchNaive.value)\n  });\n  generatorNaive = searchNaive(inputPatNaive.value, inputSearchNaive.value);\n};\nreset();\ninputPatNaive.addEventListener(\'input\', reset);\ninputSearchNaive.addEventListener(\'input\', reset);\nbtnStepperNaive.addEventListener(\'click\', () => {\n  const { value, done } = generatorNaive.next();\n  if (!done) {\n    if (value !== undefined) {\n      const { i, j, mismatch } = value;\n      vsa({\n        containerSelector: \'#pat-naive-array\',\n        array: Array.from(inputPatNaive.value),\n        pointers: [{ index: j, color: pink}]\n      });\n      vsa({\n        containerSelector: \'#search-naive-array\',\n        array: Array.from(inputSearchNaive.value),\n        pointers: [{ index: i, color: pink}]\n      });\n    }\n  }\n});\n\nfunction* searchNaive(pattern, text) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < text.length) {\n    let next = i;\n    while (text.charAt(next) === pattern.charAt(j)) {\n      yield { i: next, j };\n      next++;\n      j++\n      // match\n      if (j === pattern.length) {\n        result.push(i);\n        break;\n      }\n    }\n    // mismatch\n    if (j < pattern.length) {\n      yield { i, j, mismatch: true };\n    }\n    i++;\n    j = 0;\n    yield { i, j };\n  }\n  return { i, j, result };\n}\n<\/script>\n\n<h2>\n  <a id="knuth-morris-pratt-text-search-algorithm" class="anchor" aria-hidden="true" href="#knuth-morris-pratt-text-search-algorithm">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Knuth-Morris-Pratt text search algorithm</h2><p>The above brute force algorithm in the worst case scenario, will run a comparison as long as the pattern string for every character in the search text, which has a time complexity of <code>O(N * M)</code> where <code>N</code> is the length of the search text, and <code>M</code> is the length of the pattern. KMP search algorithm elegantly utilizes the previous matching result and never moves the search cursor back and also skipped all the previous matched character for the next comparison. The essense here is to take advantage of the character sequence that are the prefix of the pattern also being the suffix of the pattern. Because of this, we could skip the comparison of the substring of the pattern that are both prefix and suffix of it, this way, given <code>M</code> &lt;&lt; <code>N</code>, for text matching where overlapping match may happen often, the times we need to reset the pattern search cursor is greatly reduced. </p>\n<p>To have the information of the character sequence that are both prefix and suffix of the pattern, we need to preprocess the pattern string so that we know the longest prefix that is also the suffix for each character. For now, let&#39;s assume such sequence doesn&#39;t include the entire sequence itself, and we will come back to it in a moment with an example to explain why we shouldn&#39;t consider the entire sequence itself as the longest prefix that is also the suffix. Sometimes people call such sequence - <code>LPS</code>, which stands for the longest proper prefix that is also the suffix in a given sequence. </p>\n<p>For example:</p>\n<div class="array" data-array="onions"></div>\n\n<p>To preprocess the pattern <code>onions</code>, </p>\n<ol>\n<li>We first test for <code>o</code>, to see if it is both prefix and suffix, based on our assumption above, the entire sequence of <code>o</code> is not an <code>LPS</code>. so we mark it as <code>0</code>;</li>\n<li>We test for <code>on</code>, to see what&#39;s the LPS in there. <code>o</code> is the prefix, and <code>n</code> is the suffix, they are not the same, so there isn&#39;t an <code>LPS</code> in them, so we mark it as <code>0</code>;</li>\n<li>We test for <code>oni</code>, possible prefixes are <code>o</code>, <code>on</code>, and possible suffixes are <code>i</code>, <code>ni</code>, and none of them are the same, so there isn&#39;t an <code>LPS</code> in them, so we mark it as <code>0</code>;</li>\n<li>We test for <code>onio</code>, possible prefixes are <code>o</code>, <code>on</code>, <code>oni</code>, and possible suffixes are <code>o</code>, <code>io</code>, <code>nio</code>, and <code>o</code> happens to be the only substring that is both a prefix and suffix, because its length is 1, so we mark it as <code>1</code>;</li>\n<li>We test for <code>onion</code>, possible prefixes are <code>o</code>, <code>on</code>, <code>oni</code>, <code>onio</code>, and possible suffixes are  <code>n</code>, <code>on</code>, <code>ion</code>, <code>nion</code>, and there are two substrings that are both prefix and suffix: <code>o</code> and <code>on</code>, we are looking for the longest substring, <code>on</code> wins, and its length is 2, so we marked it as <code>2</code>;</li>\n<li>Finally, we test for <code>onions</code>, possible prefixes are <code>o</code>, <code>on</code>, <code>oni</code>, <code>onio</code>, <code>onion</code> and possible suffixes are <code>s</code>, <code>ns</code>, <code>ons</code>, <code>ions</code>, <code>nions</code>, and there isn&#39;t any substrings are the same. so we mark it as <code>0</code>.</li>\n</ol>\n<p>Now we have this preprocessed array that represent the longest prefix that is also the suffix for each sequence for this pattern:</p>\n<p><strong>Pattern</strong></p>\n<p><label for="input-pat-lps">Pattern text</label>\n<input id="input-pat-lps" type="text" value="onions"/> </p>\n<pre>\n<code>longest LPS length: <span id="len-pointer"></span></code>\n</pre>\n<div id="pat-lps-array" class="array"></div>\n\n<p><strong>LPS</strong></p>\n<div id="lps-array" class="array"></div>\n\n<div>\n  <button id="btn-stepper-1">Step over</button>\n</div>\n\n<script>\n  let preProcessStepper;\n  let lps;\n  const btnStepper1 = document.getElementById(\'btn-stepper-1\');\n  const inputPatLps = document.getElementById(\'input-pat-lps\');\n  const spanLenPointer = document.getElementById(\'len-pointer\');\n  const resetLps = () => {\n    lps = Array(inputPatLps.value.length).fill(0);\n    spanLenPointer.innerHTML = 0;\n    vsa({\n      containerSelector: \'#pat-lps-array\',\n      array: Array.from(inputPatLps.value)\n    });\n    vsa({\n      containerSelector: \'#lps-array\',\n      array: lps\n    });\n    preProcessStepper = preProcess(lps, inputPatLps.value, true);\n  };\n  resetLps();\n  btnStepper1.addEventListener(\'click\', () => {\n    const { value, done } = preProcessStepper.next();\n    if (!done) {\n      if (value !== undefined) {\n        const { i, len, mismatch } = value;\n        vsa({\n          containerSelector: \'#pat-lps-array\',\n          array: Array.from(inputPatLps.value),\n          pointers: [{ index: i, color: pink }, { index: len, color: mismatch ? red : green }],\n          highlights: [{ range: [i, i], color: mismatch ? red : green }]\n        });\n        vsa({\n          containerSelector: \'#lps-array\',\n          array: lps,\n          pointers: [{ index: i, color: pink }]\n        });\n        spanLenPointer.innerHTML = len;\n      }\n    } else {\n      resetLps();\n    }\n  });\n  inputPatLps.addEventListener(\'input\', resetLps);\n<\/script>\n\n<p>Now, given a text <code>onionions</code> to search for the pattern, we got the matched</p>\n<div class="array" data-array="onionions" data-highlights=\'[{"range": [3, 8], "color": "blue"}]\'></div>\n\n<p><strong>Steppers</strong></p>\n<p>We create two pointers, one for the pattern, and one for the search text:</p>\n<p><strong>Pattern</strong></p>\n<p><label for="input-pat">Pattern text</label>\n<input id="input-pat" type="text" /></p>\n<div id="pat-array" class="array"></div>\n\n<p><strong>Search text</strong></p>\n<p><label for="input-search">Search text</label>\n<input id="input-search" type="text" /></p>\n<div id="search-array" class="array"></div>\n\n<div>\n  <button id="btn-stepper-2">Step over</button>\n</div>\n\n<p>As we step over the search, when there is a match, both pointers move forward. When there is a mismatch, the search text pointer <strong>never</strong> reset, whereas the pattern pointer will look up for the longest prefix that is also the suffix just before the mismatched character. Then, it will backtrack the pattern pointer to the <code>LPS</code> index of the previous matching substring sequence to skip all characters in such sequence that we know they have a match from the previous step. The intuition of how this logic works thanks to we know if the prefix of a sequence is exactly the same as its suffix, we could overlapping the matching substring of the sequence to skip the comparison. </p>\n<p>With a little help from this stepper, we could aparently observe that if we considered the entire sequence of the pattern substring as the longest proper prefix that is also the suffix, the mismatched character would have been mistakenly counted as part of the matching character before we reset the pattern pointer back to its backtracked index (<code>LPS</code> index of the previous matching substring sequence). </p>\n<script>\n  let pattern = \'onion\';\n  let text = \'onionionsoni\';\n  let searchStepper;\n  const inputPat = document.getElementById(\'input-pat\');\n  const inputSearch = document.getElementById(\'input-search\');\n  const btnNext = document.getElementById(\'btn-stepper-2\');\n  inputPat.value = pattern;\n  inputSearch.value = text;\n  const reset = () => {\n    pattern = inputPat.value;\n    text = inputSearch.value;\n    vsa({ \n      containerSelector: \'#pat-array\', \n      array: Array.from(pattern), \n    });\n    vsa({ \n      containerSelector: \'#search-array\', \n      array: Array.from(text),\n    });\n    searchStepper = kmpSearch(pattern, text);\n  };\n  reset();\n  inputPat.addEventListener(\'input\', reset);\n  inputSearch.addEventListener(\'input\', reset);\n  btnNext.addEventListener(\'click\', () => {\n    const { value, done } = searchStepper.next();\n    if (!done) {\n      const { i, j, result, mismatch } = value;\n      const searchHighlights = [{ range: [i-j, i-1], color: green }];\n      const patternHighlights = [{ range: [0, j-1], color: green }];\n      if (mismatch) {\n        searchHighlights.push({ range: [i, i], color: red });\n        patternHighlights.push({ range: [j, j], color: red });\n      }\n      const matchedPointers = result.map(startIndex => ({ index: startIndex, color: blue }));\n      vsa({ \n        containerSelector: \'#pat-array\', \n        array: Array.from(pattern), \n        pointers: [{ index: j , color: pink }], \n        highlights: patternHighlights\n      });\n      vsa({ \n        containerSelector: \'#search-array\', \n        array: Array.from(text), \n        pointers: [{ index: i , color: pink }, ...matchedPointers], \n        highlights: searchHighlights\n      });\n    } else {\n      const { result } = value;\n      const matchedHighlights = result.map(startIndex => ({ range: [startIndex, startIndex + pattern.length - 1], color: blue }));\n      const matchedPointers = result.map(startIndex => ({ index: startIndex, color: pink }));\n      vsa({ \n        containerSelector: \'#pat-array\', \n        array: Array.from(pattern), \n      });\n      vsa({ \n        containerSelector: \'#search-array\', \n        array: Array.from(text), \n        highlights: matchedHighlights,\n        pointers: matchedPointers\n      });\n      // reset generator\n      searchStepper = kmpSearch(pattern, text);\n    }\n  });\n<\/script>\n\n<script>\n  vsa({ containerSelector: \'.array\' });\n<\/script>\n\n\n'}}/>
    </${t}>`}
function $w_s$(e,t){document.querySelector('link[rel=stylesheet][href="'+e+'"]')||((t=document.createElement("link")).rel="stylesheet",t.href=e,document.head.appendChild(t))}
$w_s$("/assets/style.module.184703f0.css");