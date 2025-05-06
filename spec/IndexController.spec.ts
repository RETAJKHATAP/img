import { app } from '../src/app';
import request from 'supertest';
describe('GET / endpoint test', () => {
  it('Should return status code 200', async () => {
    const result = await request(app).get('/').send();
    expect(result.status).toBe(200);
  });
});
