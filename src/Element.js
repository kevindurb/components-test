export class Element extends HTMLElement {
  constructor() {
    super();
    const name = this.constructor.name;
    console.log(`construct ${name}`);
    this.attachShadow({ mode: 'open' });
    this.template = templates[name];
  }

  get store() {
    return window.store;
  }
}
