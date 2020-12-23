import {LitElement, css, html} from "lit-element";
import Snow from 'effect-snow';

class SnowIntro extends LitElement {
  static get styles() {
    return css`
      #snowbox {
        display: flex;
        flex-wrap: wrap;
        background-color: rgb(1 54 64);
      }

      #snowbox > * {
        flex: 1 1 auto;
      }
      
      pre {
        margin: 0 !important;
        background-color: rgb(1 54 64) !important;
      }
      
      * {
        color: white;
      }
    `;
  }

  render() {
    return html`
      <link rel="stylesheet" href="prism-dark.css">
      <div id="snowbox">
        <div>
          <h1>Like this effect?</h1>
          <p>
            Try the <a target="_blank" href="https://github.com/zhenyanghua/effects">snow effect</a> in your site with three lines of code
          </p>
        </div>
        <pre>
          <code class="lang-js">
const snow = new Snow(element);
snow.start();
snow.stop();
          </code>
        </pre>
      </div>
    `;
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);

    // syntax highlight
    Prism.highlightAllUnder(this.shadowRoot);

    // snow fall
    const container = this.shadowRoot.querySelector('#snowbox');
    const snow = new Snow(container, { intensity: 2 });
    snow.start();
  }
}

customElements.define('snow-intro', SnowIntro);
