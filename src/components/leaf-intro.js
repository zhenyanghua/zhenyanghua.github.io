import { LitElement, css, html } from 'lit-element';
import { all } from '../styles';

const htmlText = `
<!-- html -->
<script src="https://unpkg.com/houdini-leaf"></script>`;

const codeText = `
/* CSS */
.element {
  background-image: paint(leaf);
}`;

class LeafIntro extends LitElement {
  static get styles() {
    return [
      ...all,
      css`
        :host {
          box-sizing: border-box;
          display: block;
          --leaf-variance: left;
          --leaf-size: 10;
          --leaf-color: #73CE8F;
          background-image: paint(leaf);
          padding: calc(var(--leaf-size) * 5px);
        }

        .control {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }

        .control > label {
          min-width: 170px;;
        }

        .radio-group > div {
          display: flex;
        }

        h2 {
          margin-top: 0;
        }

        p, label, pre {
          font-size: 1.2rem !important;
        }

        @media (min-width: 768px) {
          :host {
            --leaf-size: 24;
          }

        }
      `
    ];
  }

  render() {
    return html`
      <link rel="stylesheet" href="prism.css">
      <div>
        <h2>
          <a target="_blank" href="https://github.com/zhenyanghua/houdini/tree/master/leaf">
            CSS Houdini Leaf Effect
          </a>
        </h2>
        <p>
          Leaf effect is a decorative border that uses CSS Houdini Paint API to bring special effect through background image or any where an image could be used. Try it out without javascript!
        </p>
        <div class="controls">
          <div class="control radio-group">
            <label for="controls"><code class="lang-css">--leaf-variance</code></label>
            <div>
              <div class="radio">
                <input type="radio" id="left" name="variance" value="left" checked>
                <label for="lef">left</label>
              </div>
              <div class="radio">
                <input type="radio" id="around" name="variance" value="around">
                <label for="around">around</label>
              </div>
            </div>
          </div>
          <div class="control slider">
            <label for="size"><code class="lang-css">--leaf-size</code></label>
            <input type="range" min="10" max="32" id="size" name="size"
              .value="${window.getComputedStyle(this).getPropertyValue('--leaf-size')}"
              @change="${e => this.style.setProperty('--leaf-size', e.target.value)}">
          </div>
          <div class="control color">
            <label for="color"><code class="lang-css">--leaf-color</code></label>
            <input type="color" id="color" name="color" value="#73CE8F"
              @change="${e => this.style.setProperty('--leaf-color', e.target.value)}">
          </div>
        </div>
      </div>
      <pre>
        <code class="lang-html">${htmlText}</code>
        <code class="lang-css">${codeText}</code>
      </pre>
    `;
  }

  firstUpdated(changedProperties) {
    console.debug(this.shadowRoot)
    // syntax highlight
    Prism.highlightAllUnder(this.shadowRoot);

    // variance change event binding
    const radios = this.shadowRoot.querySelectorAll('input[type="radio"][name="variance"]');
    radios.forEach(radio => radio.addEventListener('change', e => {
      this.style.setProperty('--leaf-variance',
        this.shadowRoot.querySelector('input[type="radio"][name="variance"]:checked').value);
    }));
  }
}

customElements.define('leaf-intro', LeafIntro);
