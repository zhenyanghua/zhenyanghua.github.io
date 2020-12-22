import { LitElement, css, html } from "lit-element";

class BrandElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        grid-area: brand;
        justify-self: end;
        align-self: center;
        padding-left: 10px;
      }
    `;
  }

  render() {
    return html`
      <h2>
        <a href="/">
          Zhenyang's Space
        </a>
      </h2>
    `;
  }
}

customElements.define('brand-element', BrandElement);