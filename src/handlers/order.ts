import express from 'express';
import { Order, OrderStore } from '../models/order';
import { Item } from '../../types/item';
import verifyAuthToken from '../middlewares/verifyAuthToken';

// model

const store = new OrderStore();

// handlers

const index = async (_req: express.Request, res: express.Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(400);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  const id = req.body.id;
  if (id == undefined) {
    res.status(400);
    res.send('Error 400: Query must contain id field');
  }
  try {
    const order = await store.show(id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(400);
  }
};

const create = async (req: express.Request, res: express.Response) => {
  const order: Order = {
    username: req.body.username,
  };
  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destory = async (req: express.Request, res: express.Response) => {
  const id = req.body.id;
  if (id == undefined) {
    res.status(400);
    res.send('Error 400: Query must contain id field');
  }
  try {
    const deletedOrder = await store.delete(id);
    res.json(deletedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: express.Request, res: express.Response) => {
  const item: Item = {
    quantity: req.body.quantity,
    orderId: req.body.orderId,
    productId: req.body.productId,
  };
  try {
    const addedProduct = await store.addProduct(item);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const completeOrder = async (req: express.Request, res: express.Response) => {
  const id = req.body.id;
  if (id == undefined) {
    res.status(400);
    res.send('Error 400: Query must contain id field');
  }
  try {
    const completedOrder = await store.completeOrder(id);
    res.json(completedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// routes

const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken, create);
  app.delete('/orders/:id', verifyAuthToken, destory);
  app.post('/orders/:id/products', verifyAuthToken, addProduct);
  app.put('/orders/:id', verifyAuthToken, completeOrder);
};

export default orderRoutes;
