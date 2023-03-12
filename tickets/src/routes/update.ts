import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@tr-common/common';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publish';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be provided and must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new NotFoundError('no found ticket');
    }
    if (ticket.orderId) {
      throw new BadRequestError('Cannot edit a reserved ticket');
    }
    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();

    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    //   await ticket.update(req.body);

    res.status(200).send(ticket);
  }
);

export { router as updateTicketRouter };
