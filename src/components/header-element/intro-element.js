import { LitElement, css, html } from 'lit-element';

class IntroElement extends LitElement {
  static get styles() {
    return css`
      :host {
        grid-area: intro;
        background-color: rgba(255, 255, 255, 0.9);
        max-width: 320px;
        text-align: center;
        align-self: center;
        font-size: 1.2rem;
        box-sizing: border-box;
        height: 250px;
        display: flex;
        justify-self: center;
        align-items: center;
        --leaf-variance: around;
        --leaf-size: 14;
        --leaf-color: #73CE8F;
        background-image: paint(leaf);
        padding: calc(var(--leaf-size) * 4px);
      }

      @media (min-width: 768px) {
        :host {
          --leaf-size: 16;
          justify-self: end;
          margin: 0 60px 0 0;
        }
      }
    `;
  }

  render() {
    return html`
      <span>
        This is a space that holds a collection of my personal work and ideas
      </span>
    `;
  }
}

customElements.define('intro-element', IntroElement);