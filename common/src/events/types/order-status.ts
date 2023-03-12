export enum OrderStatus {
  // when the order has been created, but the
  // ticket it is trying to order has not been reserved
  Created = 'created',

  // the ticket the order is trying to order has been reserved
  // or when the user cancelled the order
  // if the order expired before payment
  Cancelled = 'cancelled',

  // the order has successfully reserved the ticket
  AwaitingPayment = 'awaiting:payment',

  // the order has reserved the ticket and the user has
  // provided payment successfully
  Complete = 'complete',
}
