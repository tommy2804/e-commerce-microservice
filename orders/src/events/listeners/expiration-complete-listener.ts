import { Listener, ExpirationCompleteEvent, Subjects, OrderStatus } from '@tr-common/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
  queueGroupName = queueGroupName;

  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    // Find the order the ticket is reserving
    const order = await Order.findById(data.orderId).populate('ticket');
    // If no order, throw error
    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status === OrderStatus.Complete) {
      return msg.ack();
    }
    // Mark the order as cancelled
    order.set({
      status: OrderStatus.Cancelled,
    });
    await order.save();
    // Publish an order cancelled event
    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
        price: order.ticket.price,
      },
    });
    msg.ack();
  }
}
