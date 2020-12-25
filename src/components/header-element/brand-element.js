import { LitElement, css, html } from "lit-element";
import { all } from "../../styles";

class BrandElement extends LitElement {
  static get styles() {
    return [
      ...all,
      css`
        :host {
          display: block;
          grid-area: brand;
          justify-self: end;
          align-self: center;
          padding-left: 10px;
        }

        h2 {
          font-family: "Roboto", Arial, SansSerif, sans-serif;
        }
      `
    ];
  }

  render() {
    return html`
      <h2>
        <a href="/">
          Zhenyang Hua
        </a>
      </h2>
    `;
  }
}

customElements.define('brand-element', BrandElement);
