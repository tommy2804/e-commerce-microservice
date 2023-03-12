import { Subjects, Publisher, PaymentCreatedEvent } from '@tr-common/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
