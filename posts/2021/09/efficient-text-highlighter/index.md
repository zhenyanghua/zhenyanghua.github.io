---
title: 'Efficient Text Highlighter'
date: '2021-10-02 19:38:00'
---
When I built the search blog post feature of this site, there is a nice visual enhancement called text highlighter as part of the search component. I implemented the same feature with three different approaches, regex positive lookahead, brute force pattern matching, and finally a more efficient approach with Knuth-Morris-Pratt (KMP) text search algorithm. In this post, I will show all three approaches to implement this feature with some interactive visualization to hopefully help a few people see the joy of programming while applying some common algorithms to a practical use case. 
<!-- Excerpt End -->

<style>
    .center {
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: consolas, monospace, sans-serif;
    }
    .array {
      display: flex;
      width: fit-content;
      margin: 20px;
    }
    .item {
      border: 4px solid black;
      border-right: none;
      width: 30px;
      height: 30px;
      padding: 4px;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: consolas, monospace, sans-serif;
    }
    .item:last-child {
      border-right: 4px solid black;
    }
    .item .pointer {
      outline: 4px solid;
      width: 100%;
      height: 100%;
    }
    input {
      font-size: 1em;
    }
</style>

<script>
  const red = '#e17474b0';
  const green = '#4caf5096';
  const blue = '#2196f37a';
  const pink = '#f436e5';
  function mapColor(array) {
    array.forEach((item) => {
      switch(item.color) {
        case 'red':
          item.color = red;
          break;
        case 'blue':
          item.color = blue;
          break;
        case 'green':
          item.color = green;
          break;
        case 'pink':
          item.color = pink;
      }
    });
  }
  function visualizeArray({ containerSelector, array, highlights, pointers }) {
    const containers = document.querySelectorAll(containerSelector);
    Array.from(containers).forEach(container => {
      let _highlights = highlights;
      let _pointers = pointers;
      let _array = array;
      if (!_array && container.hasAttribute('data-array')) {
        const arrString = container.getAttribute('data-array');
        if (typeof arrString === 'string' && !/^\[.*\]$/.test(arrString)) {
          _array = Array.from(arrString);
        } else {
          _array = JSON.parse(arrString);
        }
      }
      if (!_highlights && container.hasAttribute('data-highlights')) {
        _highlights = JSON.parse(container.getAttribute('data-highlights'));
        mapColor(_highlights);
      }
      if (!_pointers && container.hasAttribute('data-pointers')) {
        _pointers = JSON.parse(container.getAttribute('data-pointers'));
        mapColor(_pointers);
      }
      if (_array) {
        container.innerHTML = _array.map((x, i) => {
          let style = '';
          if (_highlights) {
            for (let {range, color} of _highlights) {
              if (range[0] <= i && range[1] >= i) {
                style = 'background-color: ' + color + ';';
              }
            }
          }
          let pointerStyle = '';
          if (_pointers && _pointers.some(p => p.index === i)) {
            const { index, color } = _pointers.find(p => p.index === i);
            pointerStyle = 'outline-color: ' + color + ';';
          }
          return '<div class="item center" style="' + style + '">' 
            + (_pointers &&  pointerStyle ? ('<div class="pointer center" style="' + pointerStyle + '">' + x + '</div>') : x ) 
            + '</div>'
        }).join('');
      }
    });
  }
  function* kmpSearch(pattern, text) {
    const result = [];
    let m = pattern.length;
    let n = text.length;
    const lps = new Array(m);
    preProcess(lps, pattern, false).next();
    // point to the text
    let i = 0;
    // point to the pattern
    let j = 0;
    // this flag is informational to visualization only
    let mismatch = false;
    let mismatchedJ = j;
    while (i < n) {
      yield { i, j, result };
      if (text.charAt(i) === pattern.charAt(j)) {
        mismatch = false;
        i++;
        j++;
      } else {
        mismatch = true;
        yield { i, j, result, mismatch };
        if (j === 0) {
          i++;
        } else {
          j = lps[j - 1];
        }
      }
      // a pattern matching occurrence is found
      if (j === m) {
        if (j !== 0) {
          result.push(i - j);
          // reset j to account for overlapping
          j = lps[j - 1];
        }
      }
    }
    return { i, j, result };
  }
  function* preProcess(lps, pattern, stepover) {
    let len = 0;
    let i = 1;
    lps[0] = 0;
    while(i < lps.length) {
      if (pattern.charAt(i) === pattern.charAt(len)) {
        if (stepover) {
          yield { len, i };
        }
        lps[i] = len + 1;
        len++;
        i++;
      } else {
        if (stepover) {
          yield { len, i, mismatch: true };
        }
        if (len !== 0) {
          len = lps[len - 1];
        } else {
          lps[i] = 0;
          i++;
        }
      }
    }
  }
  window.vsa = visualizeArray;
  window.red = red;
  window.green = green;
  window.blue = blue;
  window.pink = pink;
  window.kmpSearch = kmpSearch;
  window.preProcess = preProcess;
</script>

## Regex Positive Lookahead

When search for pattern matching, it is possible to have overlapping characters that could be a potential match. For example, in the 

**Pattern**

<div class="array" data-array="onion"></div>

**Search text**

<div class="array" data-array="onionionions"></div>

A regex like this `/onion/gi` will only result in two matches:

<div class="array" data-array="onionionions" 
  data-highlights='[{ "range": [0, 4], "color": "blue" }, { "range": [6, 10], "color": "blue" }]' 
  data-pointers='[{ "index": 0, "color": "pink" }, { "index": 6, "color": "pink" }]'></div>

We could tell there is an overlapping occurrence missing from these matches, to match such occurences, we need to ask regex to look ahead of each character before moving on to the next character, similar to the brute force approach from the next section. This technique is called **Positive Lookahead** in regex, and the expression is `(?=...)`. It asserts that the given subpattern can be matched here, without consuming characters. Now we update the regex to be `/(?=onion)/`, we will be getting the three matches including the overlapping one.

<div class="array" data-array="onionionions" 
  data-highlights='[{ "range": [0, 4], "color": "blue" }, { "range": [3, 7], "color": "blue" }, { "range": [6, 10], "color": "blue" }]' 
  data-pointers='[{ "index": 0, "color": "pink" }, { "index": 3, "color": "pink" }, { "index": 6, "color": "pink" }]'></div>

## Brute force pattern matching

The brute force approach is to examine the each following sequence matches the pattern characters for each character in the search text. 

<label for="input-pat-naive">Pattern text</label>
<input id="input-pat-naive" type="text" value="onions"/> 
<div id="pat-naive-array" class="array"></div>

<label for="input-search-naive">Search text</label>
<input id="input-search-naive" type="text" value="onionions"/> 
<div id="search-naive-array" class="array"></div>

<div>
  <button id="btn-stepper-naive">➡️Step over</button>
</div>

<script>
let generatorNaive;
const inputPatNaive = document.getElementById('input-pat-naive');
const inputSearchNaive = document.getElementById('input-search-naive');
const btnStepperNaive = document.getElementById('btn-stepper-naive');
const reset = () => {
  vsa({
    containerSelector: '#pat-naive-array',
    array: Array.from(inputPatNaive.value)
  });
  vsa({
    containerSelector: '#search-naive-array',
    array: Array.from(inputSearchNaive.value)
  });
  generatorNaive = searchNaive(inputPatNaive.value, inputSearchNaive.value);
};
reset();
inputPatNaive.addEventListener('input', reset);
inputSearchNaive.addEventListener('input', reset);
btnStepperNaive.addEventListener('click', () => {
  const { value, done } = generatorNaive.next();
  if (!done) {
    if (value !== undefined) {
      const { i, j, mismatch, result } = value;
      const matchedPointers = result.map(startIndex => ({ index: startIndex, color: blue }));
      vsa({
        containerSelector: '#pat-naive-array',
        array: Array.from(inputPatNaive.value),
        pointers: [{ index: j, color: pink}],
        highlights: [{ range: [0, j], color: mismatch ? red : green }]
      });
      vsa({
        containerSelector: '#search-naive-array',
        array: Array.from(inputSearchNaive.value),
        pointers: [{ index: i, color: pink}, ...matchedPointers],
        highlights: [{ range: [i - j, i], color: mismatch ? red : green }]
      });
    }
  } else {
    const { result } = value;
    const matchedHighlights = result.map(startIndex => ({ range: [startIndex, startIndex + inputPatNaive.value.length - 1], color: blue }));
    const matchedPointers = result.map(startIndex => ({ index: startIndex, color: pink }));
    vsa({ 
      containerSelector: '#pat-naive-array',
      array: Array.from(inputPatNaive.value),
    });
    vsa({ 
      containerSelector: '#search-naive-array',
      array: Array.from(inputSearchNaive.value),
      highlights: matchedHighlights,
      pointers: matchedPointers
    });
    // reset generator
    generatorNaive = searchNaive(inputPatNaive.value, inputSearchNaive.value);
  }
});

function* searchNaive(pattern, text) {
  const result = [];
  let i = 0, j = 0;
  while (i < text.length) {
    // what's left in the search text is shorter than the pattern text length
    if (i === text.length - pattern.length + 1) {
      yield { i, j, mismatch: true, result };
      break;
    }
    let next = i;
    while (text.charAt(next) === pattern.charAt(j)) {
      yield { i: next, j, result };
      next++;
      j++
      // match
      if (j === pattern.length) {
        result.push(i);
        break;
      }
    }
    // mismatch
    if (j < pattern.length) {
      yield { i: next, j, mismatch: true, result };
    }
    i++;
    j = 0;
  }
  return { i, j, result };
}
</script>

## Knuth-Morris-Pratt text search algorithm

The above brute force algorithm in the worst case scenario, will run a comparison as long as the pattern string for every character in the search text, which has a time complexity of `O(N * M)` where `N` is the length of the search text, and `M` is the length of the pattern. KMP search algorithm elegantly utilizes the previous matching result and never moves the search cursor back and also skipped all the previous matched character for the next comparison. The essense here is to take advantage of the character sequence that are the prefix of the pattern also being the suffix of the pattern. Because of this, we could skip the comparison of the substring of the pattern that are both prefix and suffix of it, this way, given `M` << `N`, for text matching where overlapping match may happen often, the times we need to reset the pattern search cursor is greatly reduced. 

To have the information of the character sequence that are both prefix and suffix of the pattern, we need to preprocess the pattern string so that we know the longest prefix that is also the suffix for each character. For now, let's assume such sequence doesn't include the entire sequence itself, and we will come back to it in a moment with an example to explain why we shouldn't consider the entire sequence itself as the longest prefix that is also the suffix. Sometimes people call such sequence - `LPS`, which stands for the longest proper prefix that is also the suffix in a given sequence. 

For example:

<div class="array" data-array="onions"></div>

To preprocess the pattern `onions`, 

1. We first test for `o`, to see if it is both prefix and suffix, based on our assumption above, the entire sequence of `o` is not an `LPS`. so we mark it as `0`;
2. We test for `on`, to see what's the LPS in there. `o` is the prefix, and `n` is the suffix, they are not the same, so there isn't an `LPS` in them, so we mark it as `0`;
3. We test for `oni`, possible prefixes are `o`, `on`, and possible suffixes are `i`, `ni`, and none of them are the same, so there isn't an `LPS` in them, so we mark it as `0`;
4. We test for `onio`, possible prefixes are `o`, `on`, `oni`, and possible suffixes are `o`, `io`, `nio`, and `o` happens to be the only substring that is both a prefix and suffix, because its length is 1, so we mark it as `1`;
5. We test for `onion`, possible prefixes are `o`, `on`, `oni`, `onio`, and possible suffixes are  `n`, `on`, `ion`, `nion`, and there are two substrings that are both prefix and suffix: `o` and `on`, we are looking for the longest substring, `on` wins, and its length is 2, so we marked it as `2`;
6. Finally, we test for `onions`, possible prefixes are `o`, `on`, `oni`, `onio`, `onion` and possible suffixes are `s`, `ns`, `ons`, `ions`, `nions`, and there isn't any substrings are the same. so we mark it as `0`.

Now we have this preprocessed array that represent the longest prefix that is also the suffix for each sequence for this pattern:

**Pattern**

<label for="input-pat-lps">Pattern text</label>
<input id="input-pat-lps" type="text" value="onions"/> 
<pre>
<code>longest LPS length: <span id="len-pointer"></span></code>
</pre>
<div id="pat-lps-array" class="array"></div>

**LPS**

<div id="lps-array" class="array"></div>

<div>
  <button id="btn-stepper-1">➡️Step over</button>
</div>

<script>
  let preProcessStepper;
  let lps;
  const btnStepper1 = document.getElementById('btn-stepper-1');
  const inputPatLps = document.getElementById('input-pat-lps');
  const spanLenPointer = document.getElementById('len-pointer');
  const resetLps = () => {
    lps = Array(inputPatLps.value.length).fill(0);
    spanLenPointer.innerHTML = 0;
    vsa({
      containerSelector: '#pat-lps-array',
      array: Array.from(inputPatLps.value)
    });
    vsa({
      containerSelector: '#lps-array',
      array: lps
    });
    preProcessStepper = preProcess(lps, inputPatLps.value, true);
  };
  resetLps();
  btnStepper1.addEventListener('click', () => {
    const { value, done } = preProcessStepper.next();
    if (!done) {
      if (value !== undefined) {
        const { i, len, mismatch } = value;
        vsa({
          containerSelector: '#pat-lps-array',
          array: Array.from(inputPatLps.value),
          pointers: [{ index: i, color: pink }, { index: len, color: mismatch ? red : green }],
          highlights: [{ range: [i, i], color: mismatch ? red : green }]
        });
        vsa({
          containerSelector: '#lps-array',
          array: lps,
          pointers: [{ index: i, color: pink }]
        });
        spanLenPointer.innerHTML = len;
      }
    } else {
      resetLps();
    }
  });
  inputPatLps.addEventListener('input', resetLps);
</script>

Now, given a text `onionions` to search for the pattern, we got the matched

<div class="array" data-array="onionions" data-highlights='[{"range": [3, 8], "color": "blue"}]'></div>

**Steppers**

We create two pointers, one for the pattern, and one for the search text:

**Pattern**

<label for="input-pat">Pattern text</label>
<input id="input-pat" type="text" />

<div id="pat-array" class="array"></div>

**Search text**

<label for="input-search">Search text</label>
<input id="input-search" type="text" />

<div id="search-array" class="array"></div>

<div>
  <button id="btn-stepper-2">➡️Step over</button>
</div>

As we step over the search, when there is a match, both pointers move forward. When there is a mismatch, the search text pointer **never** reset, whereas the pattern pointer will look up for the longest prefix that is also the suffix just before the mismatched character. Then, it will backtrack the pattern pointer to the `LPS` index of the previous matching substring sequence to skip all characters in such sequence that we know they have a match from the previous step. The intuition of how this logic works thanks to we know if the prefix of a sequence is exactly the same as its suffix, we could overlapping the matching substring of the sequence to skip the comparison. 

With a little help from this stepper, we could aparently observe that if we considered the entire sequence of the pattern substring as the longest proper prefix that is also the suffix, the mismatched character would have been mistakenly counted as part of the matching character before we reset the pattern pointer back to its backtracked index (`LPS` index of the previous matching substring sequence). 

<script>
  let pattern = 'onion';
  let text = 'onionionsoni';
  let searchStepper;
  const inputPat = document.getElementById('input-pat');
  const inputSearch = document.getElementById('input-search');
  const btnNext = document.getElementById('btn-stepper-2');
  inputPat.value = pattern;
  inputSearch.value = text;
  const reset = () => {
    pattern = inputPat.value;
    text = inputSearch.value;
    vsa({ 
      containerSelector: '#pat-array', 
      array: Array.from(pattern), 
    });
    vsa({ 
      containerSelector: '#search-array', 
      array: Array.from(text),
    });
    searchStepper = kmpSearch(pattern, text);
  };
  reset();
  inputPat.addEventListener('input', reset);
  inputSearch.addEventListener('input', reset);
  btnNext.addEventListener('click', () => {
    const { value, done } = searchStepper.next();
    if (!done) {
      const { i, j, result, mismatch } = value;
      const searchHighlights = [{ range: [i-j, i-1], color: green }];
      const patternHighlights = [{ range: [0, j-1], color: green }];
      if (mismatch) {
        searchHighlights.push({ range: [i, i], color: red });
        patternHighlights.push({ range: [j, j], color: red });
      }
      const matchedPointers = result.map(startIndex => ({ index: startIndex, color: blue }));
      vsa({ 
        containerSelector: '#pat-array', 
        array: Array.from(pattern), 
        pointers: [{ index: j , color: pink }], 
        highlights: patternHighlights
      });
      vsa({ 
        containerSelector: '#search-array', 
        array: Array.from(text), 
        pointers: [{ index: i , color: pink }, ...matchedPointers], 
        highlights: searchHighlights
      });
    } else {
      const { result } = value;
      const matchedHighlights = result.map(startIndex => ({ range: [startIndex, startIndex + pattern.length - 1], color: blue }));
      const matchedPointers = result.map(startIndex => ({ index: startIndex, color: pink }));
      vsa({ 
        containerSelector: '#pat-array', 
        array: Array.from(pattern), 
      });
      vsa({ 
        containerSelector: '#search-array', 
        array: Array.from(text), 
        highlights: matchedHighlights,
        pointers: matchedPointers
      });
      // reset generator
      searchStepper = kmpSearch(pattern, text);
    }
  });
</script>

<script>
  vsa({ containerSelector: '.array' });
</script>

## Visualization

Once we have the array that indicates the starting index of each match, we could build the node sequence that represent the plain text and the highlighted text:

```js
const nodes = [];
// i to track the start of the plain text
let i = 0;
// j to track the start of the highlight, in other words, the end of plain text
let j = 0;

while (i < children.length && j < matched.length) {
    const matchingStartingIndex = matched[j];
    const matchingEndingIndexExclusive = matched[j] + match.trim().length;
    // plain text range [i, j)
    const plainText = children.substring(i, matchingStartingIndex);
    // highlight text range [m[j], m[j] + len(pattern))
    const highlight = children.substring(matchingStartingIndex, matchingEndingIndexExclusive);
    nodes.push(plainText);
    nodes.push(<span class={style.textHighlight}>{highlight}</span>);
    // move i to the letter after j's matching pattern
    i = matchingEndingIndexExclusive;
    // moveup j to read the next matching starting index
    j++;
}

// tailing plain text
if(i < children.length) {
    nodes.push(children.substring(i));
}
```
