---
title: IE Won't Set Cookie
date: 2018-11-13 17:00:00
---
This article shares a different behavior in IE than Chrome when expecting to set a cookie.
<!-- Excerpt End -->

I have a client app that using javascript to set the cookie for URL: http://localhost/login

The code looks like this:
```javascript
var c = "_s=" + sessionId + ";path='/';max-age=36000";
document.cookie = c;
console.log("c", c);
console.log("Cookie", document.cookie);
```

In chrome, it prints out:
```
c _s=1b022d51-00c3-4a40-a105-35c638986354;path='/';max-age=36000
Cookie _s=1b022d51-00c3-4a40-a105-35c638986354
```
But in IE (11 or edge 17)

It prints out:
```
c _s=1b022d51-00c3-4a40-a105-35c638986354;path='/';max-age=36000
Cookie 
```
I have enabled setting cookie option in the internet option, but still got nothing back after setting the cookie.

It turns out IE doesn't like the quotes around the `path` option, while other browsers aren't that picky.

Remove the quote resolves the problem.

