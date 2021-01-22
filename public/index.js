import hydrate from 'preact-iso/hydrate'
import App from './components/app';
import './web-components/codeblock';

if (typeof window !== 'undefined') {
  async function init() {
    await import('houdini-leaf');
    hydrate(<App />);
  }

  if (self.CSS && self.CSS.paintWorklet) {
    init();
  } else {
    import('css-paint-polyfill')
      .then(init);
  }
}

export async function prerender(data) {
  const { default: prerender } = await import('preact-iso/prerender');
  const fs = require('fs');
  fs.appendFileSync('routes.txt', data.url + '\n');
  return prerender(<App {...data} />)
}