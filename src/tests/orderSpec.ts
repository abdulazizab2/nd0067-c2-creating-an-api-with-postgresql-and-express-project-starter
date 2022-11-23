import { Order, OrderStore } from '../models/order';
import { Item } from '../../types/item';
// @ts-ignore
import client from '../database';

const order: Order = {
  username: 'abdulaziz',
};
const item: Item = {
  quantity: 1,
  orderId: '2',
  productId: '1',
};

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

describe('Order Endpoints', () => {
  it('should return a result with length equal 1', async () => {
    const result = await store.index();
    expect(result.length).toBe(1);
  });
  it('should return result has a username=abdulaziz', async () => {
    const result = await store.show('1');
    expect(result.username).toBe('abdulaziz');
  });
  it('should return result with length=2 after creating a new item', async () => {
    await store.create(order);
    const result = await store.index();
    expect(result.length).toBe(2);
  });
  it('should return result with length=1 after deleting an item', async () => {
    await store.delete('1');
    const result = await store.index();
    expect(result.length).toBe(1);
  });
  it('should succeed and return a result', async () => {
    const result = await store.addProduct(item);
    expect(result).toBeDefined()
  });
  it('should complete order and update its status from active to complete', async () => {
    await store.completeOrder('2');
    // @ts-ignore
    const conn = await client.connect()
    const sql = 'SELECT * FROM orders WHERE id=($1)'
    const result = await conn.query(sql, ["2"])
    expect(result.rows[0].status).toBe('complete')
  });
});
