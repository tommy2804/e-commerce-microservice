import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

it('returns a 404 i the provided id dows not exists', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'test',
      price: 20,
    })
    .expect(404);
});

it('return a 401 if the user is not authenticatied', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'test',
      price: 20,
    })
    .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  const res = await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
    title: 'test',
    price: 20,
  });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'test22',
      price: 1000,
    })
    .expect(401);
});

it('returns a 400 if the user provides na invalid title or price', async () => {
  const cookie = global.signin();
  const res = await request(app)
    .put(`/api/tickets/${new mongoose.Types.ObjectId().toHexString()}`)
    .set('Cookie', cookie)
    .send({
      title: 'test',
      price: 20,
    });
  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 1000,
    })
    .expect(400);
  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'sdafs',
      price: -3,
    })
    .expect(400);
});
it('updates the ticket provided valid inputs', async () => {
  const cookie = global.signin();

  const res = await request(app).post(`/api/tickets`).set('Cookie', cookie).send({
    title: 'test',
    price: 20,
  });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 1000,
    })
    .expect(200);

  const ticketRes = await request(app).get(`/api/tickets/${res.body.id}`).send();
  expect(ticketRes.body.title).toBe('new title');
  expect(ticketRes.body.price).toBe(1000);
});

it('publishes an event', async () => {
  const cookie = global.signin();

  const res = await request(app).post(`/api/tickets`).set('Cookie', cookie).send({
    title: 'test',
    price: 20,
  });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 1000,
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
it('rejects updates if the ticket is reserved', async () => {
  const cookie = global.signin();

  const res = await request(app).post(`/api/tickets`).set('Cookie', cookie).send({
    title: 'test',
    price: 20,
  });
  const ticket = await Ticket.findById(res.body.id);
  ticket!.set({ orderId: global.generateId() });
  await ticket!.save();

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 1000,
    })
    .expect(400);
});
