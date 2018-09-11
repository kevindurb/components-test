import { Element } from '../../Element.js';

export class TodoList extends Element {
  constructor() {
    super();
    this.renderList = this.renderList.bind(this);

    this.store.subscribe('todos', this.renderList);
    this.renderList();
  }

  renderList() {
    const items = this.store.read('todos');

    console.log(items);

    this.shadowRoot.innerHTML = '';

    items.forEach((item) => {
      const div = document.createElement('div');
      div.innerHTML = item.name;
      this.shadowRoot.appendChild(div);
    });
  }
}

customElements.define('x-todo-list', TodoList);
