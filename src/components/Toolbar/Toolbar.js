import { Element } from '../../Element.js';

export class Toolbar extends Element {
  constructor() {
    super();
    this.shadowRoot.appendChild(this.template);

    this.onAdd = this.onAdd.bind(this);

    this.addButton = this.shadowRoot.querySelector('#add');
    this.input = this.shadowRoot.querySelector('[type="text"]');

    this.addButton.addEventListener('click', this.onAdd);
  }

  onAdd() {
    this.store.create('todos', {
      name: this.input.value,
    });

    this.input.value = '';
  }
}

customElements.define('x-toolbar', Toolbar);
