import { Publisher, Subjects, TicketCreatedEvent } from '@tr-common/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
