import { render } from 'preact';
import App from './components/app';
import './web-components/codeblock';


if (typeof window !== 'undefined') {
  async function init() {
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