import { OrderCancelledEvent, Subjects, Listener, OrderStatus } from '@tr-common/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const order = await Order.findOne({
      version: data.version - 1,
      _id: data.id,
    });

    if (!order) {
      throw new Error('Order Not Found');
    }
    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    msg.ack();
  }
}
