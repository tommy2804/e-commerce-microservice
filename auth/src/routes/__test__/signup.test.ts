import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      firstName: 'test',
      lastName: 'test',
    })
    .expect(201);
});

it('return a 400 with invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'dsfadsfa',
      password: 'password',
      firstName: 'test',
      lastName: 'test',
    })
    .expect(400);
});

it('return a 400 with invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'dsfadsfa',
      password: 'p',
      firstName: 'test',
      lastName: 'test',
    })
    .expect(400);
});

it('return a 400 with missing email and pass', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
    })
    .expect(400);
  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'password',
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      firstName: 'test',
      lastName: 'test',
    })
    .expect(201);
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      firstName: 'test',
      lastName: 'test',
    })
    .expect(400);
});
it('sets a cookie after succeful signup', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      firstName: 'test',
      lastName: 'test',
    })
    .expect(201);
  expect(res.get('Set-Cookie')).toBeDefined();
});
