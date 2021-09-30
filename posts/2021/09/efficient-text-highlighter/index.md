---
title: 'Efficient Text Highlighter'
date: '2021-10-02 19:38:00'
---
When I built the search blog post feature of this site, there is a nice visual enhancement called text highligher as part of the search component. I implemented the same feature with three different approaches, regex replacement with `innerHTML`, brute force pattern matching, and finally a more efficient approach with Knuth-Morris-Pratt (KMP) text search algorithm. In this post, I will show all three approaches to implement this feature with some interactive visualization to hopefully help a few people see the joy of programming while applying some common algorithms to a practical use case. 
<!-- Excerpt End -->

## Regex Replacement

## Brute force pattern matching

## Knuth-Morris-Pratt text search algorithm

<div id="text-kmp-1" class="array"></div>
<div id="pattern-kmp-1" class="array"></div>
<script>
  function updateArray(containerSelector, array) {
    document.querySelector(containerSelector)
  }
(function() {
  const textKmp1 = 'onionions';
  const patternKmp1 = 'onions';
})()


</script>