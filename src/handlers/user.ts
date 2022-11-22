import express from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middlewares/verifyAuthToken';
import dotenv from 'dotenv';
dotenv.config();

const secretToken = process.env.TOKEN_SECRET as unknown as string;

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
    res.status(400).json(err);
  }
};

const create = async (req: express.Request, res: express.Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, secretToken);
    res.json(token);
  } catch (err) {
    res.status(400).json('Error 400: User Exists');
  }
};

const login = async (req: express.Request, res: express.Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const loggedIn = await store.login(user);
    var token = jwt.sign({ user: loggedIn }, secretToken);
    res.json(token);
  } catch (err) {
    res.status(400).json({ err });
  }
};

const destroy = async (req: express.Request, res: express.Response) => {
  const username = req.body.username;
  if (username == undefined) {
    res.status(400);
    res.send('Error 400: Query must contain username field');
  }
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
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:username', verifyAuthToken, show);
  app.post('/users', create);
  app.post('/users/login', verifyAuthToken, login);
  app.delete('/users/:username', verifyAuthToken, destroy);
};

export default userRoutes;
