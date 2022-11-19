import express from 'express';
import { Product, ProductStore } from '../models/product';

// model

const store = new ProductStore();

// handlers

const index = async (_req: express.Request, res: express.Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: express.Request, res: express.Response) => {
  const id = req.body.id;
  if (id == undefined) {
    res.status(400);
    res.send('Error 400: Query must contain id field');
  }
  const product = await store.show(id);
  res.json(product);
};

const create = async (req: express.Request, res: express.Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
  };
  if (product.name == undefined || product.price == undefined) {
    res.status(400);
    res.send('Error 400: Query must contain name and price fields');
  }
  try {
    const newProduct = await store.create(product);
    res.json(newProduct);
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
    const deletedProduct = await store.delete(id);
    res.json(deletedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// routes

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
  app.delete('/products/:id', destory);
};

export default productRoutes;
