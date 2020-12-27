import { render } from 'preact';
import App from './components/app';
import './web-components/codeblock';

if (typeof window !== 'undefined') {
  function init() {
    import('https://unpkg.com/houdini-leaf')
      .then(() => render(<App />, document.body));
  }

  if (self.CSS && self.CSS.paintWorklet) {
    init();
  } else {
    import('https://unpkg.com/css-paint-polyfill')
      .then(init);
  }
}
