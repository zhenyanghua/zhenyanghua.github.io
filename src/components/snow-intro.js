import {LitElement, css, html} from "lit-element";
import Snow from 'effect-snow';
import { all } from "../styles";

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
      ...all,
      css`
        :host {
          display: block;
          background-color: rgb(1 54 64);
        }

        #snowbox {
          padding: 20px;
        }

        #snowbox > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        h2 {
          margin-top: 44px !important;
        }

        .button-group {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 96px;
        }

        pre {
          margin: 0 !important;
          padding: 0 !important;
          background-color: rgb(1 54 64) !important;
          font-size: 1.2rem !important;
        }

        p {
          font-size: 1.2rem;
        }

        a, p {
          color: white !important;
        }

        @media (min-width: 462px) {
          pre {
            display: flex;
            justify-content: center;
          }
        }
      `
    ];
  }

  render() {
    return html`
      <link rel="stylesheet" href="prism-dark.css">
      <div id="snowbox">
        <div>
          <h2>
            <a target="_blank" href="https://github.com/zhenyanghua/effects/tree/main/snow">
              Snow Effect Overlay
            </a>
          </h2>
          <p>
            Try the snow effect in your site with
            three lines of code
          </p>
          <div class="button-group">
            <button class="inverted" @click="${this._startSnow}">start the snow</button>
            <button class="inverted" @click="${this._stopSnow}">stop the snow</button>
          </div>
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
