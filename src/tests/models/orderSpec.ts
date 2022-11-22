import { OrderStore } from '../../models/order';

const store = new OrderStore();

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });
  it('should have an addProduct method', () => {
    expect(store.addProduct).toBeDefined();
  });
  it('should have a completeOrder method', () => {
    expect(store.completeOrder).toBeDefined();
  });
});
