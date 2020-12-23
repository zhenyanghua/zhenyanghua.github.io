import {LitElement, css, html} from 'lit-element';
import {hidden} from "../../styles";

class NavElement extends LitElement {
  static get styles() {
    return [
      hidden,
      css`
        :host {
          grid-area: nav;
          justify-self: end;
          align-self: center;
        }

        nav ul {
          display: flex;
          list-style-type: none;
          font-size: 1.4rem;
          text-transform: capitalize;
          padding-inline-start: 0;
        }

        nav li {
          margin: 0 10px;
        }

        @media (min-width: 768px) {
          nav ul {
            margin-right: 60px;
          }
        }
      `
    ];
  }

  render() {
    return html`
      <nav>
        <h2 class="hidden">Main Navigation</h2>
        <ul>
<!--          <li>-->
<!--            <a href="/libraries">libraries</a>-->
<!--          </li>-->
<!--          <li>-->
<!--            <a href="/me">me</a>-->
<!--          </li>-->
<!--          <li>-->
<!--            <a href="/site">site</a>-->
<!--          </li>-->
        </ul>
      </nav>
    `;
  }
}

customElements.define('nav-element', NavElement);