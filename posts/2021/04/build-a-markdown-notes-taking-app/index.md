---
title: 'Build a markdown notes taking app'
date: '2021-04-28 22:46:00'
---
I really like the experience Azure DevOps provides in a PR description section - it is a markdown editor with instant preview of the input. The feature I really like is the ability to be able to paste in any screenshots from the clipboard just makes it really easy to convey the information. I like it so much that I wish I could use it to take any notes with screenshots that I like whenever I am and also allows me to take them with when I am on a different computer.
<!-- Excerpt End -->

## TL;DR
This article describes the path taken to build a POC of a markdown notes taking app that read images from OS clipboard.
- [Demo](https://zhenyanghua.github.io/yame/)
- [Source code](https://github.com/zhenyanghua/yame/blob/70ea7b7e134afd62391b2acdac5318081f760057/index.html)

## Step 1 - define requirements
1. A basic markdown editor that consume standard markdown syntax and output nice structure content
1. Users should be able to paste in any images from the standard clipboard from any operating system.
1. Users should be able to save their notes and images
1. Users should be able to export all their notes to a file
1. Users should be able to import the exported file and restore all the notes with any images included.

## Step 2 - identify technical challenge and possible dependencies
> A basic markdown editor that consume standard markdown syntax and output nice structure content

- We need a markdown parser that can parse standard markdown string to HTML string ([marked](https://www.npmjs.com/package/marked)).
- We may need to define our own styles for the generate HTML string but we may as well explore if there is any existing standard markdown CSS available from NPM ([github-markdown-css](https://www.npmjs.com/package/github-markdown-css)).

> Users should be able to paste in any images from the standard clipboard from any operating system.
- We need to access the data from the clipboard.
- Checking combo keys (<kbd>Ctrl</kbd> + <kbd>v</kbd>, <kbd>Cmd</kbd> + <kbd>v</kbd>, <kbd>Context</kbd>, right click paste, etc.) could be endless when we may not know what custom paste key binding are used in users' operating system.
- [HTMLElement.onpaste](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/onpaste) is an `EventHandler` that signals when a paste event is triggered from the clipboard.
- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) comes in handy, where we don't need to worry about how to obtain the data pasted from the `onpaste` event as it provides an interface to detect data types and content from the clipboard.

> Users should be able to save their notes and images
- We need to serialize the users' input in some form and persist it in a store so they will be there after a page is refreshed. Browsers have plenty storages options, e.g. `LocalStorage`, `IndexedDB`. However, `LocalStorage` can only stores up to 5MB per app per browser, which may cap even just one note with many large images pasted in. [`IndexedDB` ](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) comes in handy.
- Image serialization could be usually done through the `canvas` API where we could obtain the base64 image string from the Blob and then save it to the store. The deserialization is only a matter of decoding the base64 image back to `Blob`. However, with the `IndexedDB`, which supports `Blob` data type out-of-the-box, we could store the image directly as `Blob`.
- `IndexedDB` comes with a pretty verbose API and we could use an library that provides a simplified abstract layer. ([Dexie](https://www.npmjs.com/package/dexie))

> Users should be able to export all their notes to a file

> Users should be able to import the exported file and restore all the notes with any images included.
- We need to be able to export all notes from the `IndexedDB` to a file
- We could either export a dump of the current version of the local database or we could create a custom format that only exports the notes and images saved in the database.
- If we use a custom format and exports only the notes and images saved, we need to also import them and bulk load them to their tables. If we use features from `Dexie`, we could use the addon [dexie-export-import](https://www.npmjs.com/package/dexie-export-import) to do the export/import for the entire database.
- Schema  versioning and conflicts resolving could be too complicated in a local database version where it is not possible as the database is distributed and not possible to create a volatile lock among all browsers. We may explore this enhancement in the future. For now, we overwrite any existing schema and data when a new file is imported.
- To restore any images associations, we need to define the relationship between the notes and images. We could save notes and images in two separate tables where the notes keep a foreign key to the image unique id.
- If the image is pasted from the same source in the clipboard, we treat them as two different image and store as separate records in the table, this way we could save our brain from some more squeezing.

## Step 3 - bill of materials: list dependencies and APIs
- [Web API - HTMLElement.onpaste](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/onpaste)
- [Web API - Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- [NPM - marked](https://www.npmjs.com/package/marked)
- [NPM - github-markdown-css](https://www.npmjs.com/package/github-markdown-css)
- [NPM - Dexie](https://www.npmjs.com/package/dexie)
- [NPM - dexie-export-import](https://www.npmjs.com/package/dexie-export-import)

## Step 4 - build it
In this section, I only mention the snippets from the above mentioned API, for the complete POC demo - read [source code](https://github.com/zhenyanghua/yame/blob/70ea7b7e134afd62391b2acdac5318081f760057/index.html).

### `onpaste` EventHandler and `Clipboard` API

```javascript
  textarea.addEventListener('paste', async (e) => {
    const data = await navigator.clipboard.read();
    data
        .filter(item => item.types.includes('image/png'))
        .forEach(async item => {
          const blob = await item.getType('image/png');
          // Save blob as users paste
          // TODO - need to remove those from idb and revoke URL 
          //  when the current session or activeDoc is reset to undefined.
          const blobId = await saveBlob(blob);
          const url = URL.createObjectURL(blob);
          // find the cursor position and insert
          // FIXME - the "Cut" command doesn't seem to be working
          textarea.value = textarea.value.slice(0, textarea.selectionStart) 
              + "![Image - " + new Date().toLocaleString('en-US') + "](bid:" + blobId + ":" + url")" 
              + textarea.value.slice(textarea.selectionStart + 1);
          parse(textarea.value);
        });
  });
```

### Replace all matching patterns `![blob-id](GENERATED_URL)` with the pasted
```javascript
  async function openNote({query, doc}) {
    activeDoc = query ? await query : doc;
    const {id, data, name} = activeDoc;
    const matches = [...data.matchAll(/\!\[.*\]\(bid:(\d+):.*\)/gi)];
    const imageIds = matches.map(m => Number(m[1]));
    const images = await db.images.bulkGet(imageIds);
    const replacedData = data.replaceAll(/(\!\[.*\]\(bid:(\d+):)(.*)(\))/gi, (m, p1, p2, p3, p4) => {
      const image = images.find(x => x.id === Number(p2));
      const url = URL.createObjectURL(image.data);
      return "" + p1 + url + p4;
    });
    textarea.value = replacedData;
    parse(replacedData);
  }
```

### Parser
```javascript
  function parse(text) {
    viewer.innerHTML = marked(text.replaceAll(/bid:\d+:/gi, ''));
  }
```

## Known issues

- No syntax highlighting yet
- "Cut" command doesn't seem to work, this must be a bug from the POC.
- The `dexie-export-import` currently has a [bug](https://github.com/dfahlander/Dexie.js/issues/1288) and a [PR](https://github.com/dfahlander/Dexie.js/pull/1271) is in progress to fix the aysnc array buffer issue. At this moment, we use a local build module from the fork branch directly.
- Image pasting doesn't seem to work with mobile phone browsers.

## Roadmap
### Stack
- Preact (CLI) - Dataflow
- Tailwind CSS - PostCSS utility
- marked - Markdown parser
- highlight/prism - language syntax parser
- Dexie - IndexedDB wrapper
- dexie-export-import (local)? - local fix of the IndexedDB export/import

### MVP I - Core functionalities
1. Create all functionalities provided in the prototype.
1. Add ability to delete notes
1. Add ability to lock a note from being deleted.
1. Add ability to save name upon saving (modal?)
1. Add notification to indicate operation status.

### MVP II - Workbook
1. Ability to arrange notes by workbook
1. Ability to import a new workbook with all its notes
1. Ability to manage workbooks

### Explore - Collaboration
- P2P without server
- Multiple people editing the same notes at the same time.


