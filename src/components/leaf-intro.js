import { LitElement, css, html } from 'lit-element';

const htmlText = `
<script src="https://unpkg.com/houdini-leaf"></script>
`

const codeText = `
.element {
  background-image: paint(leaf);
}`;

class LeafIntro extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          --leaf-variance: left;
          --leaf-size: 24;
          --leaf-color: #73CE8F;
          background-image: paint(leaf);
          padding: calc(var(--leaf-size) * 5px);
        }
      `
    ];
  }

  render() {
    return html`
      <h2>
        Like this effect?
      </h2>
      <p>
        Leaf effect is a decorative border that uses CSS Houdini Paint API to bring special effect through background image or any where an image could be used. Try it out without javascript!
      </p>
      <div id="controls">
        <div class="radio-group">
          <label for="controls"><code>--leaf-variance</code></label>
          <div class="radio">
            <input type="radio" id="left" name="variance" value="left" checked>
            <label for="lef">left</label>
          </div>
          <div class="radio">
            <input type="radio" id="around" name="variance" value="around">
            <label for="around">around</label>
          </div>
        </div>
        <div class="slider">
          <input type="range" min="10" max="50" id="size" name="size" value="24">
          <label for="size"><code>--leaf-size</code></label>
        </div>
        <div class="color">
          <input type="color" id="color" name="color" value="#73CE8F">
          <label for="color"><code>--leaf-color</code></label>
        </div>
      </div>
      <pre>
        <code class="lang-html">${htmlText}</code>
        <code class="lang-css">${codeText}</code>
      </pre>
    `;
  }
}

customElements.define('leaf-intro', LeafIntro);
