['light', 'dark'].forEach(theme => {
  const template = document.createElement('template');
  template.innerHTML = `
    <link ref="stylesheet" href="/prism-${theme}.css" />
    <slot></slot>
  `;

  customElements.define(`codeblock-${theme}`, class extends HTMLElement {
    constructor() {
      super();

      let shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      this.shadowRoot.querySelector('slot')
        .assignedNodes().forEach(node => Prism.highlightAllUnder(node));
    }
  });
});
