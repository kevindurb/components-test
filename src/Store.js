export class Store {
  constructor(storage = window.localStorage) {
    this.storage = storage;
    this.subscribers = [];
  }

  getCollection(name) {
    try {
      return JSON.parse(this.storage.getItem(name) || []);
    } catch (e) {
      // dont worry
    }
    return [];
  }

  setCollection(name, items) {
    this.storage.setItem(name, JSON.stringify(items));
  }

  itemMatchesQuery(item, query) {
    let matches = true;
    for (let q in query) {
      if (query[q] !== item[q]) {
        matches = false;
      }
    }
    return matches;
  }

  create(name, item) {
    const collection = this.getCollection(name);

    this.setCollection(name, [
      ...collection,
      item,
    ]);
  }

  read(name, query = {}) {
    const collection = this.getCollection(name);
    return collection.filter((item) => {
      return this.itemMatchesQuery(item, query);
    });
  }

  update(name, query, updates) {
    const collection = this.getCollection(name);

    const updatedCollection = collection.map((item) => {
      if (this.itemMatchesQuery(item, query)) {
        return Object.assign({}, item, updates);
      }
      return item;
    });

    this.setCollection(name, updatedCollection);
  }

  delete(name, query) {
    const collection = this.getCollection(name);

    const filteredCollection = collection.filter((item) => {
      return !this.itemMatchesQuery(item, query);
    });

    this.setCollection(name, filteredCollection)
  }

  subscribe(name, cb) {
    const subscription = { name, cb };
    this.subscribers.push(subscription);

    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== subscription);
    }
  }

  notify(name) {
    this.subscribers.forEach((sub) => {
      if (sub.name === name) {
        cb();
      }
    });
  }
}
