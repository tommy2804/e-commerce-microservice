import { Subjects, Publisher, ExpirationCompleteEvent } from '@tr-common/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
