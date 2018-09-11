import { Element } from '../../Element.js';
import { Store } from '../../Store.js';

window.store = new Store();

export class TodoApp extends Element {
  constructor() {
    super();
    this.shadowRoot.appendChild(this.template);
  }
}

customElements.define('x-todo-app', TodoApp);
