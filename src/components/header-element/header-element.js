import { LitElement, css, html } from "lit-element";
import './intro-element';
import './nav-element';
import './skip-link';
import './brand-element';
import { all } from '../../styles';

class HeaderElement extends LitElement {
  static get styles() {
    return [
      ...all,
      css`
        :host {
          display: block;
          background-image: url(/img/header-banner2x.jpg);
          background-image: -webkit-image-set(
            url(/img/header-banner1x.jpg) 1x,
            url(/img/header-banner2x.jpg) 2x
          );
          background-image: image-set(
            url(/img/header-banner1x.jpg) 1x,
            url(/img/header-banner2x.jpg) 2x
          );
          background-repeat: no-repeat;
          background-position: 50% 76px;
          height: 333px;
        }

        :host header {
          height: 100%;
          display: grid;
          grid-template-areas:
            "brand nav"
            "intro intro";
          grid-template-rows: 60px 1fr;
          grid-template-columns:  auto 1fr;
        }

        @media (min-width: 768px) {
          :host header {
            grid-template-areas:
              "brand nav"
              ". intro";
            grid-template-rows: 60px 1fr;
            grid-template-columns: 200px 1fr;
          }
        }
      `
    ];
  }

  render() {
    return html`
      <header>
        <skip-link></skip-link>
        <brand-element></brand-element>
        <nav-element></nav-element>
        <intro-element></intro-element>
      </header>
    `;
  }
}

customElements.define('header-element', HeaderElement);
