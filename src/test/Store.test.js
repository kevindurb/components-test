import { test, assert, spy } from './test.js';
import { Store } from '../Store.js';

test('Store.js', () => {
  test('a collection that doesnt exist should return an empty array', () => {
    window.localStorage.clear();
    const store = new Store();
    const collection = store.read('newcollection');

    assert(Array.isArray(collection), 'collection is array');
    assert(collection.length === 0, 'collection is empty');
  });

  test('adding an item to a collection', () => {
    window.localStorage.clear();
    const store = new Store();
    store.create('anothers', { id: 1, name: 'kevin' });
    const collection = store.read('anothers');
    assert(collection.length === 1, 'collection has an item');
    assert(collection[0].name === 'kevin', 'the item is the one I expect');
  });

  test('reading with a query', () => {
    window.localStorage.clear();
    const store = new Store();
    store.create('users', { id: 1, name: 'kevin' });
    store.create('users', { id: 2, name: 'doug' });
    store.create('users', { id: 3, name: 'trey' });
    store.create('users', { id: 4, name: 'joel' });

    const collection = store.read('users', { name: 'kevin' });
    assert(collection.length === 1, 'collection has an item');
    assert(collection[0].name === 'kevin', 'the item is the one I expect');
  });

  test('it can delete items', () => {
    window.localStorage.clear();
    const store = new Store();
    store.create('users', { id: 1, name: 'kevin' });
    store.create('users', { id: 2, name: 'doug' });
    store.create('users', { id: 3, name: 'trey' });
    store.create('users', { id: 4, name: 'joel' });

    store.delete('users', { id: 1 });
    const collection = store.read('users');
    assert(collection.length === 3, 'collection has 3 items');
  });

  test('it can update items', () => {
    window.localStorage.clear();
    const store = new Store();
    store.create('users', { id: 1, name: 'kevin' });
    store.create('users', { id: 2, name: 'doug' });
    store.create('users', { id: 3, name: 'trey' });
    store.create('users', { id: 4, name: 'joel' });

    store.update('users', { id: 1 }, { name: 'alex' });
    const collection = store.read('users', { id: 1 });
    assert(collection[0].name === 'alex', 'item has new name');
  });

  test('it updates the subscribers when a create happens', () => {
    window.localStorage.clear();
    const onChange = spy();
    const store = new Store();
    store.subscribe('users', onChange);

    store.create('users', {});

    assert(onChange.calls.length === 1, 'subscription called once');
  });

  test('it doesnt update if unsubscribed', () => {
    window.localStorage.clear();
    const onChange = spy();
    const store = new Store();
    const unsubscribe = store.subscribe('users', onChange);

    unsubscribe();

    store.create('users', {});

    assert(onChange.calls.length === 0, 'didnt call subscription');
  });
});
