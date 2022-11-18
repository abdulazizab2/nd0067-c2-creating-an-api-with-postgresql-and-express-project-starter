import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const address = 'localhost';
const port = 8000;

app.use(bodyParser.json());

// routes TODO
// productRoutes(app);
// userRoutes(app);
// orderRoutes(app);
//
app.listen(3000, function () {
  console.log(`starting app on: ${address}:${port}`);
});
