import { Subjects, Publisher, OrderCancelledEvent } from '@tr-common/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
