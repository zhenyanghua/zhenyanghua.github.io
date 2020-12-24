import {LitElement, css, html} from "lit-element";
import Snow from 'effect-snow';
import {button} from "../styles";

const codeText = `
// Create a snow scene instance and 
// mount it to the container element
const snow = new Snow(containerElement);
// To start
snow.start();
// To stop 
snow.stop();
`;

class SnowIntro extends LitElement {
  static get styles() {
    return [
      button,
      css`
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
          font-size: 1.2rem !important;
        }
        
        p {
          font-size: 1.2rem;
        }
        
        a {
          background-color: white;
          color: rgb(1 54 64);
          border-radius: 4px;
          padding: 0 4px;
          font-size: 1.1rem;
          font-family: "Roboto", Arial, SansSerif, sans-serif !important;
        }

        * {
          color: white;
        }
      `
    ];
  }

  render() {
    return html`
      <link rel="stylesheet" href="prism-dark.css">
      <div id="snowbox">
        <div>
          <h1>Like this effect?</h1>
          <p>
            Try the <a target="_blank" href="https://github.com/zhenyanghua/effects">effect-snow</a> in your site with
            three lines of code
          </p>
          <button class="inverted" @click="${this._startSnow}">start the snow</button>
          <button class="inverted" @click="${this._stopSnow}">stop the snow</button>
        </div>
        <pre>
          <code class="lang-js">${codeText}</code>
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
    this._snow = new Snow(container, {intensity: 2});
    this._startSnow();
  }

  _startSnow() {
    this._snow.start();
    if (this._nextTimeToStopSnow) {
      clearTimeout(this._nextTimeToStopSnow);
    }
    this._nextTimeToStopSnow = setTimeout(() => {
      this._stopSnow();
      this._nextTimeToStopSnow = null;
    }, 120000);
  }

  _stopSnow() {
    this._snow.stop();
  }
}

customElements.define('snow-intro', SnowIntro);
