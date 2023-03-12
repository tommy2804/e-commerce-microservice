import { Publisher, OrderCreatedEvent, Subjects } from '@tr-common/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
