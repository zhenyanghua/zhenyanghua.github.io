import './components/header-element/header-element';

(async function () {
    if (!('paintWorklet' in CSS)) {
        await import("https://unpkg.com/css-paint-polyfill");
    }

    // todo - use npm package when using bundler
    CSS.paintWorklet.addModule('https://unpkg.com/houdini-leaf/worklet.js');
})();
