window.registerTemplate = () => {
  const owner = window.document.currentScript.ownerDocument;
  const template = owner.querySelector('template');
  if (!template) {
    throw new Error('No template in document!');
  }

  if (!window.templates) {
    window.templates = {};
  }

  const name = template.dataset.name;

  if (!name) {
    throw new Error('Template has no name!');
  }

  console.log(`register template: ${name}`);
  window.templates[name] = template.content;
}
