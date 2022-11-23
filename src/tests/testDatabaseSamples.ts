process.env.ENV = 'test';
// @ts-ignore
import client from '../database';
console.log('Creating Samples for database testing ...');
async function orderSample(): Promise<void> {
  // @ts-ignore
  const conn = await client.connect();
  const sql = 'INSERT INTO orders (status, username) VALUES ($1, $2)';
  await conn.query(sql, ['active', 'abdulaziz']);
  conn.release();
}
async function productSample(): Promise<void> {
  // @ts-ignore
  const conn = await client.connect();
  const sql = 'INSERT INTO products (name, price) VALUES ($1, $2)';
  await conn.query(sql, ['test_item', '9999']);
  conn.release();
}
async function userSample(): Promise<void> {
  // @ts-ignore
  const conn = await client.connect();
  const sql = 'INSERT INTO users (username, password_digest) VALUES ($1, $2)';
  await conn.query(sql, ['abdulaziz', 'foo-password-hashed']);
  conn.release();
}

async function makeSamples(): Promise<void> {
  await userSample();
  await orderSample();
  await productSample();
}

makeSamples();
