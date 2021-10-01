---
title: 'Efficient Text Highlighter'
date: '2021-10-02 19:38:00'
---
When I built the search blog post feature of this site, there is a nice visual enhancement called text highlighter as part of the search component. I implemented the same feature with three different approaches, regex replacement with `innerHTML`, brute force pattern matching, and finally a more efficient approach with Knuth-Morris-Pratt (KMP) text search algorithm. In this post, I will show all three approaches to implement this feature with some interactive visualization to hopefully help a few people see the joy of programming while applying some common algorithms to a practical use case. 
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
        _highlights.forEach((highlight) => {
          switch(highlight.color) {
            case 'red':
              highlight.color = red;
              break;
            case 'blue':
              highlight.color = blue;
              break;
            case 'green':
              highlight.color = green;
              break;
          }
        });
      }
      if (!_pointers && container.hasAttribute('data-pointers')) {
        _pointers = JSON.parse(container.getAttribute('data-pointers'));
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
          if (_pointers && pointers.some(p => p.index === i)) {
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
    preProcess(lps, pattern);
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
  function preProcess(lps, pattern) {
    let len = 0;
    let i = 1;
    lps[0] = 0;
    while(i < lps.length) {
      if (pattern.charAt(i) === pattern.charAt(len)) {
        lps[i] = len + 1;
        len++;
        i++;
      } else {
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
</script>

## Regex Replacement

## Brute force pattern matching

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

<div class="array" data-array="onions"></div>

**LPS**

<div class="array" data-array="000120"></div>


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
  <button id="btn-stepper-1">Step over</button>
</div>

As we step over the search, when there is a match, both pointers move forward. When there is a mismatch, the search text pointer **never** reset, whereas the pattern pointer will look up for the longest prefix that is also the suffix just before the mismatched character. Then, it will backtrack the pattern pointer to the `LPS` index of the previous matching substring sequence to skip all characters in such sequence that we know they have a match from the previous step. The intuition of how this logic works thanks to we know if the prefix of a sequence is exactly the same as its suffix, we could overlapping the matching substring of the sequence to skip the comparison. 

With a little help from this stepper, we could aparently observe that if we considered the entire sequence of the pattern substring as the longest proper prefix that is also the suffix, the mismatched character would have been mistakenly counted as part of the matching character before we reset the pattern pointer back to its backtracked index (`LPS` index of the previous matching substring sequence). 

<script>
  let pattern = 'onion';
  let text = 'onionionsoni';
  let searchStepper;
  const inputPat = document.getElementById('input-pat');
  const inputSearch = document.getElementById('input-search');
  const btnNext = document.getElementById('btn-stepper-1');
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


