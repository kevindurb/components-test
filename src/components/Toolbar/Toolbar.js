import { Element } from '../../Element.js';

export class Toolbar extends Element {
  constructor() {
    super();
    this.shadowRoot.appendChild(this.template);

    this.onAdd = this.onAdd.bind(this);

    this.addButton = this.shadowRoot.querySelector('#add');
    this.addButton.addEventListener('click', this.onAdd);
  }

  onAdd() {
    console.log(this);
  }
}

customElements.define('x-toolbar', Toolbar);
