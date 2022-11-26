import supertest from 'supertest';
import app from '../server';
import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

describe('Test POST with supertest', function () {
  it('', async () => {
    const result = await supertest(app)
      .post('/users')
      .send({ username: 'test_username', password: 'test_password' });
    expect(result.statusCode).toBe(200);
  });
  it('rqe', async () => {
    const result = await supertest(app).get('/products');
    expect(result.statusCode).toBe(200);
  });
});
