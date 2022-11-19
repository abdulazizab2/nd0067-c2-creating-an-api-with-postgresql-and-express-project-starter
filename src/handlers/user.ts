import express from 'express';
import { User, UserStore } from '../models/user';

// model

const store = new UserStore();

// handlers

const index = async (_req: express.Request, res: express.Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: express.Request, res: express.Response) => {
  const username = req.body.username;
  if (username == undefined) {
    res.status(400);
    res.send('Error 400: Query must contain username field');
  }
  try {
    const user = await store.show(username);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: express.Request, res: express.Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  if (user.username == undefined || user.password == undefined) {
    res.status(400);
    res.send('Error 400: Query must contain username and password fields');
  }
  try {
    const newUser = await store.create(user);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: express.Request, res: express.Response) => {
  const username = req.body.username;
  try {
    const deletedUser = await store.delete(username);
    res.json(deletedUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// routes

const userRoutes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:username', show);
  app.post('/users', create);
  app.delete('/users/:username', destroy);
};

export default userRoutes;
