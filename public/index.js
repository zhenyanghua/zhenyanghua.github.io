import { render } from 'preact';
import App from './components/app';
import './web-components/codeblock';
import { injectScript } from "./utils/dom";


if (typeof window !== 'undefined') {
  async function init() {
    await injectScript('prism.js');
    await import('houdini-leaf');
    render(<App />, document.body);
  }

  if (self.CSS && self.CSS.paintWorklet) {
    init();
  } else {
    import('css-paint-polyfill')
      .then(init);
  }
}