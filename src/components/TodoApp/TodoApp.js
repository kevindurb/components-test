import { Element } from '../../Element.js';
import { Store } from '../../Store.js';

export class TodoApp extends Element {
  constructor() {
    super();
    this.shadowRoot.appendChild(this.template);
    this.store = new Store();
    window.store = this.store;
  }
}

customElements.define('x-todo-app', TodoApp);
