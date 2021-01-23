---
title: 'Serve Images in Next-gen Formats' 
date: '2021-01-22 17:00:00'
---
Serving smaller images without sacrificing the resolution quality could be finally achieved
with the next-gen formats. This article introduces three common next-gen formats and a tip
to have fallback images when the browser doesn't support those.
<!-- Excerpt End -->

## Browser compatibility

|Format|Chrome|FireFox|Edge|Safari|IE11|
|---|---|---|---|---|---|
|<a href="https://caniuse.com/webp" target="_blank">WebP</a>|Y|Y|Y|N|N|
|<a href="https://caniuse.com/avif" target="_blank">AVIF</a>|Y|Y|N|N|N|
|<a href="https://caniuse.com/jpeg2000" target="_blank">Jpeg 2000</a>|N|N|N|Y|N|
|<a href="https://caniuse.com/jpegxr" target="_blank">Jpeg XR</a>|N|N|N|N|Y|

## Fallback
Based on the majority of the browsers support WebP format, we could default to
use webp format for all images and set up fallback for universal Jpeg format.

### HTML <img> element fallback
```html
<img alt="image description" 
     src="image.webp" 
     onerror="this.src=image.jpg" />
```

### CSS background image fallback
```css
/* default fallback when 'image-set()' is not supported */
background-image: url('image.jpg');
/* default to AVIF and if not supported, try WebP, etc.. */
background-image: image-set( 
  "image.avif" type("image/avif"),  
  "image.webp" type("image/webp"),
  "image.jp2"  type("image/jp2"),
  "image.jxr"  type("image/jxr"),
  "image.jpg"  type("image/jpeg")
);
```
