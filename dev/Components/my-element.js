import {LitElement, html} from 'lit-element';

const perClassStyle = html`
  <style>
    :host {
      font-family: 'Courier New', Courier, monospace;
      font-size: 24px; 
    }
  </style>
`;

class MyElement extends LitElement {
  connectedCallback() {
    super.connectedCallback()
  
    console.log('connected')
  }
  render() {
    return html`
      ${perClassStyle}
      <div>
        <slot name="one"></slot>
        <slot name="two"></slot>
      </div>
    `;
  }
}

customElements.define('my-element', MyElement);