import request from 'supertest';
import { app } from '../src/app';

describe('GET /upload', () => {
  it('Should return status code 200', async () => {
    const result = await request(app).get('/upload').send();
    expect(result.status).toBe(200);
  });
});
