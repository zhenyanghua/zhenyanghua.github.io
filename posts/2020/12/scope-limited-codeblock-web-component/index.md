---
title: 'Create a Scope limited Codeblock Web Component'
date: 2020-12-30 17:00:00
---
Modern web platform allows us to write custom elements and with the assistance of shadow DOM,
we are able to ensure the style and behavior of the custom elements are consistent and no external styles
or behaviors are propagated in or leaked out. This post walks through some keypoints by creating a scope
limited codeblock element.
<!-- Excerpt End -->

## Table of Content
- [Create a custom element](#create-a-custom-element)
- [Lazy loading the script](#lazy-loading-the-script)
- [Prism manual mode](#prism-manual-mode)
- [One way data flow and mutation observer](#one-way-data-flow-and-mutation-observer)
- [Conclusion](#conclusion)
- [Known limitations](#known-limitations)

Recently I started with a personal [project portfolio website](https://zhenyanghua.github.io/) and one of the challenges I had is to allow code highlighting. There are tools like Prism.js, Highlight.js that does the job if my goal is only to have one theme shown at the same time. On the page that needs syntax highlighting, the design is to have two different themes applied for different sections on the same page. With Prism.js, there isn't an out-of-box method loading two different theme stylesheet without style clashing. The problem could be abstracted to allow each loaded stylesheet has their own scope so they don't affect each other when shown on the same page.

There are a few key points in this challenge:
- Each theming stylesheet share exactly the same name space and selector names.
- We should avoid intercepting the stylesheet source code and mutate it. They should be considered as black boxed code.
- We should reset the styles set by the theming sheets outside of the codeblock where the syntax highlighting logic is applied.
- Whenever code changes, we want the syntax highlight logic reapplied.

With the above given key points, it seems creating a custom codeblock component may be able to allow us to attach some of the key points in the desired lifecycle, such as injecting the stylesheet. At this point, we may have `codeblock-a` with theme `a` stylesheet injected, and `codeblock-b` with theme `b` stylesheet injected, but it is not enough to keep the scope of each stylesheet within their container component. Hence, the latter loaded stylesheet will take the precedence of the styling. As a result, if the theme `b` stylesheet is done with loading after `a`, the `codeblock-a` will be painted with the styles defined in theme `b` stylesheet. Custom element allows us to attach additional behaviors and properties, but by itself, it doesn't provide any scope constraints. We need one more thing.

Thanks to the matured web technology, we are able to use Shadow DOM to achieve something amazing natively on the web platform without writing any custom code. MDN defines the shadow DOM as:
> An important aspect of web components is encapsulation — being able to keep the *markup structure*, *style*, and *behavior* **hidden** and separate from other code on the page so that different parts do not clash, and the code can be kept nice and clean.

This is exactly what we needed to make different theme stylesheet applied only within its container. Nothing comes in and nothing goes out.

## Create a custom element

The following code block defines a basic template where we start off defining a custom element called `<codeblock-a>` for theme `a`.  With shadow DOM, we are able to define any markup including `<link>` and `<style>` in the `template`. As seen, the external stylesheet `prism-a.css` is part of the template and the styles loaded within the shadow DOM will only apply to the markup that is defined in it, and it will not leak out of it. The `<slot>` element is used as a placeholder for  any light DOM to be attached to. Light DOM are not affected by the styles defined within the shadow DOM, because they don't exist in the shadow root, they are referenced by the `<slot>` element but existing only in the DOM. You may wonder how we could apply the theming style we just injected here in the shadow DOM to the light DOM, please read on, and a technique will be introduced :).

```js
const template = document.createElement('template');  
template.innerHTML = `
	<link rel="stylesheet" href="/prism-a.css" />
	<slot></slot>
`;
```

Then we create a shadow root by calling `attachShadow` method and assign the template to the shadow root. Finally we define the custom element with the name `codeblock-a` which could be used as `<codeblock-a>custom code</codeblock-a>` in the DOM.

```js
customElements.define('codeblock-a', class extends HTMLElement {
  constructor() {  
    super();  
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true));  
  }
});
```

## Lazy loading the script

There are different ways we could lazy load the `Prism.js`. Assuming we have the `Prism.js` existing in the root directory for demonstration purpose. The following code injected a `<script>` tag to the document head and return a promise when the `src` is loaded.

```js
function injectScript(url, async = true) {  
  return new Promise((resolve, reject) => {  
    const script = document.createElement('script');  
    script.async = async;  
    script.src = url;  
    script.onload = resolve;  
    script.onerror = reject;  
    document.head.appendChild(script);  
  });  
}
```

## Prism manual mode

In our custom element, as we lazy load the `Prism.js` to the global scope and the script once loaded will be immediately invoked by its IIFE (Immediately Invoked Function Expression) format. we do not want it to automatically transform any code wherever it finds them. We must set it to be manual before we inject the global script.

```js
// enter manual mode, it must be called before loading prism script  
window.Prism = window.Prism || {};  
Prism.manual = true;  
  
injectScript('/prism.js').then(() => {
  // define templates and register the custom element here
});
```

## One way data flow and mutation observer

Earlier we mentioned any styles injected in the shadow DOM don't apply to the light DOM referenced by the `<slot>` element. The approach I used here is to visually hide the light DOM referenced by the `<slot>` element and copy what's in there to a placeholder in the shadow DOM, so the styles defined in the shadow DOM could be applied to them. Another benefit of implementing this one way data flow is to allow us to subscribe to any changes from the light DOM and reapply the syntax highlighting logic to the copy in the shadow DOM.  Here we add a `<div>` as a placeholder for the light DOM copy in the shadow DOM template:
```js
template.innerHTML = `
	<link rel="stylesheet" href="/prism-a.css" />
	<div class="codeblock"></div>
	<slot></slot>
`;
```
Users must follow the rules defined by `Prism.js`,  this is an example how a user may use this custom element:

```html
<codeblock-a>
  <!-- additional overriding styles goes in the <style> tag -->
  <style></style>
  <pre>
    <code class="lang-html">custom HTML code</code>
    <code class="lang-css">custom CSS code</code>
  </pre>
</codeblock-a>
```
To make sure when light DOM changes, our copy in the shadow DOM gets synced, we need to create a mutation observer and observe the changes to the what's referenced by the `<slot>` element.

We could add another member method which governs syntax highlighting logics to the custom element class:
```js
highlight(slot) {  
  // scoped stylesheet doesn't apply to the light dom, so we need to copy them back  
  // to the shadow dom before prism generates them.  
  const codeblock = this.shadowRoot.querySelector('.codeblock');  
  // Clearing the child nodes
  codeblock.innerHTML = '';  
  // copy from the light DOM
  for(const node of slot.assignedNodes()) {  
    codeblock.appendChild(node.cloneNode(true));  
  }  
  // apply the syntax highlighting logic.
  for(const node of codeblock.childNodes) {  
    if (node.nodeName === 'PRE') {  
      Prism.highlightAllUnder(node);  
    }  
  }  
}
```

To observe the changes to the light DOM, we need to overwrite the lifecycle method `connectedCallback` in our custom element:

```js
connectedCallback() {  
  // select the slot from the shadow root
  const slot = this.shadowRoot.querySelector('slot');
  // slotchange event is triggered for the first time when it is registered.
  slot.addEventListener('slotchange', () => {  
    this.highlight(slot);
    if (this.obs) {  
      this.obs.disconnect();  
    }  
    // Define the observer
    this.obs = new MutationObserver(((mutations) => {  
      for (const mutation of mutations) {  
        if (mutation.type === 'characterData') {  
          this.highlight(slot);  
        }  
      }  
    }));  
    // Observe every node referenced by the slot
    for (const node of slot.assignedNodes()) {  
      if (['CODE', 'PRE'].includes(node.nodeName.toUpperCase())) {  
        this.obs.observe(node, {  
          subtree: true,  
          characterData: true  
        });  
      }  
    }  
  });
}
```

To make sure no memory leaks when the custom element is removed from the DOM, we need to disconnect our observer in another lifecycle method `disconnectedCallback`:

```js
disconnectedCallback() {
  // house keeping to prevent memory leaks.
  if (this.obs) {  
    this.obs.disconnect();  
  }  
}
```

## Conclusion

This `codeblock` implementation uses a one way data flow, which hides the original user provided code from light DOM and build a scoped style codeblock in the shadow dom. It observes the changes from the light DOM and rebuild the shadow DOM copy. All styles logic is limited within the custom element.

## Known limitations

Currently implementation is naive -- it clears the shadow DOM placeholder and replace the entire content. One better approach could be to make a copy of the light DOM first in memory  and highlight the clone, then diff it with the one in the shadow DOM and swap only the part that is different. This may reduce the flash between render, even though currently it is hard to observe the flash.
