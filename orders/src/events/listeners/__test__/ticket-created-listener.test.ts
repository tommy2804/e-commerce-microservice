import { TicketCreatedEvent } from '@tr-common/common';
import { TicketCreatedListener } from '../ticket-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  // create an instance if the listener
  const listener = new TicketCreatedListener(natsWrapper.client);
  // create a fake instance
  const data: TicketCreatedEvent['data'] = {
    id: global.generateId(),
    version: 0,
    title: 'concert',
    price: 1000,
    userId: global.generateId(),
  };
  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, data, msg };
};

it('cerate and saves a ticket', async () => {
  const { listener, data, msg } = await setup();
  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  // withe assertions to make sure a ticket wat created!
  const ticket = await Ticket.findById(data.id);

  expect(ticket).toBeDefined();
  expect(ticket?.title).toEqual(data.title);
  expect(ticket?.price).toEqual(data.price);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();
  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  // write assertions to make sure the ack function is called!
  expect(msg.ack).toHaveBeenCalled();
});
