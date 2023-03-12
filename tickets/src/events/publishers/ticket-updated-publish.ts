import { Publisher, Subjects, TicketUpdatedEvent } from '@tr-common/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
