import { render } from 'preact';
import App from './components/app';
import './web-components/codeblock';


if (typeof window !== 'undefined') {
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