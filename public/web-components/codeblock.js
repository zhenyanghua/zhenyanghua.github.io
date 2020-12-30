/**
 * @desc
 *  This codeblock implementation uses a one way data flow, which
 *  hides the original user provided code from light dom and
 *  build a scoped style code in the shadow dom. It observes
 *  the changes from the light dom and rebuild the shadow dome.
 *
 * Know limitations
 * Currently implementation is very naive, it clears the shadow
 * dome placeholder and replace the entire content. One better
 * approach could be to make a copy of the light dom first in memory
 * and highlight the clone, then diff it with the one in the
 * shadow dom and swap only the part that is different. This may
 * reduce the flash between render, even though currently it is
 * hard to observe the flash.
 *
 */
import { injectScript } from "../utils/dom";

function registerCodeblock () {
  ['light', 'dark'].forEach(theme => {
    const template = document.createElement('template');
    template.innerHTML = `
    <link rel="stylesheet" href="/prism-${theme}.css" />
    ${theme === 'dark' ?
      `<style>
      :not(pre) > code[class*="language-"], pre[class*="language-"] {
        background: var(--deepBlue);
      }
    </style>`
      : ''}
    <div class="codeblock"></div>
    <slot style="display: none"></slot>
  `;

    customElements.define(`codeblock-${theme}`, class extends HTMLElement {
      constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
      }

      highlight(slot) {
        // scoped stylesheet doesn't apply to the light dom, so we need to copy them back
        // to the shadow dom before prism generates them.
        const codeblock = this.shadowRoot.querySelector('.codeblock');
        codeblock.innerHTML = '';

        for(const node of slot.assignedNodes()) {
          codeblock.appendChild(node.cloneNode(true));
        }
        for(const node of codeblock.childNodes) {
          if (node.nodeName === 'PRE') {
            Prism.highlightAllUnder(node);
          }
        }
      }

      connectedCallback() {
        const slot = this.shadowRoot.querySelector('slot');
        slot.addEventListener('slotchange', () => {
          this.highlight(slot);
          if (this.obs) {
            this.obs.disconnect();
          }
          this.obs = new MutationObserver(((mutations) => {
            for (const mutation of mutations) {
              if (mutation.type === 'characterData') {
                this.highlight(slot);
              }
            }
          }));
          for (const node of slot.assignedNodes()) {
            if (['CODE', 'PRE'].includes(node.nodeName.toUpperCase())) {
              this.obs.observe(node, {
                subtree: true,
                characterData: true
              });
            }
          }
        });
      }

      disconnectedCallback() {
        if (this.obs) {
          this.obs.disconnect();
        }
      }
    });
  });
}

// enter manual mode, must be called before loading prism script
window.Prism = window.Prism || {};
Prism.manual = true;

injectScript('/prism.js').then(registerCodeblock);

