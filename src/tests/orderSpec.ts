import supertest from 'supertest';
import app from '../server';
import { Order, OrderStore } from '../models/order';
import { Product, ProductStore } from '../models/product';
import { User, UserStore } from '../models/user';
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
const productStore = new ProductStore();
const product: Product = {
  name: 'new_item',
  price: 200,
};
const userStore = new UserStore();
const user: User = {
  username: 'test_user',
  password: 'test_password',
};

const orderStore = new OrderStore();

describe('Order Functions', () => {
  it('should have an index method', () => {
    expect(orderStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(orderStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderStore.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(orderStore.delete).toBeDefined();
  });
  it('should have an addProduct method', () => {
    expect(orderStore.addProduct).toBeDefined();
  });
  it('should have a completeOrder method', () => {
    expect(orderStore.completeOrder).toBeDefined();
  });
});

describe('Order Model', () => {
  it('should return a result with length equal 1', async () => {
    const result = await orderStore.index();
    expect(result.length).toBe(1);
  });
  it('should return result has a username=abdulaziz', async () => {
    const result = await orderStore.show('1');
    expect(result.username).toBe('abdulaziz');
  });
  it('should return result with length=2 after creating a new item', async () => {
    await orderStore.create(order);
    const result = await orderStore.index();
    expect(result.length).toBe(2);
  });
  it('should return result with length=1 after deleting an item', async () => {
    await orderStore.delete('1');
    const result = await orderStore.index();
    expect(result.length).toBe(1);
  });
  it('should succeed and return a result', async () => {
    const result = await orderStore.addProduct(item);
    expect(result).toBeDefined();
  });
  it('should complete order and update its status from active to complete', async () => {
    await orderStore.completeOrder('2');
    // @ts-ignore
    const conn = await client.connect();
    const sql = 'SELECT * FROM orders WHERE id=($1)';
    const result = await conn.query(sql, ['2']);
    expect(result.rows[0].status).toBe('complete');
  });
});

describe('Product Functions', () => {
  it('should have an index method', () => {
    expect(productStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(productStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(productStore.create).toBeDefined();
  });
});

describe('Product Model', () => {
  it('should return a result with length equal 1', async () => {
    const result = await productStore.index();
    expect(result.length).toBe(1);
  });
  it('should return a result with a product name test_item', async () => {
    const result = await productStore.show('1');
    expect(result.name).toBe('test_item');
  });
  it('should return result with length=2 after creating a new product', async () => {
    await productStore.create(product);
    const result = await productStore.index();
    expect(result.length).toBe(2);
  });
});

describe('User Model', () => {
  it('should have an index method', () => {
    expect(userStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(userStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(userStore.create).toBeDefined();
  });
  it('should have a login method', () => {
    expect(userStore.login).toBeDefined();
  });
});

describe('User Model', () => {
  it('should return a result with length equal 2', async () => {
    const result = await userStore.index();
    expect(result.length).toBe(2);
  });
  it('should return a result with a username=abdulaziz', async () => {
    const result = await userStore.show('abdulaziz');
    expect(result.username).toBe('abdulaziz');
  });
  it('should return result with length=3 after creating a new product', async () => {
    await userStore.create(user);
    const result = await userStore.index();
    expect(result.length).toBe(3);
  });
  it('should login successfully', async () => {
    const user: User = {
      username: 'test_user',
      password: 'test_password',
    };
    const result = await userStore.login(user);
    expect(result).not.toBeNull();
  });
});
