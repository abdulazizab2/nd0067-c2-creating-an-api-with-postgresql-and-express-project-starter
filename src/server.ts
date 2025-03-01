import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './handlers/user';
import productRoutes from './handlers/product';
import orderRoutes from './handlers/order';

const app = express();
const address = 'localhost';
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

// routes
userRoutes(app);
productRoutes(app);
orderRoutes(app);
//

app.listen(port, function () {
  console.log(`starting app on: ${address}:${port}`);
});

export default app;
