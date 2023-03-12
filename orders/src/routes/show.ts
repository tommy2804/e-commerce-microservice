import express, { Request, Response } from 'express';
import { Order } from '../models/order';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@tr-common/common';

const router = express.Router();

router.get(
  '/api/orders/:orderId',
  requireAuth,
  [
    body('orderId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('orderId is not valid'),
  ],
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('ticket');
    if (!order) {
      throw new NotFoundError('Order not found');
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    res.send(order);
  }
);

export { router as showOrderRouter };
