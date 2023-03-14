import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@tr-common/common';
import { createChargeRouter } from './routes/new';

const app = express();
// express awair that it is behind a proxy like nginx
// and should trust the proxy to handle the https connection
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(currentUser);
app.use(createChargeRouter);

// handles the case where the route is not found
app.all('*', async () => {
  throw new NotFoundError('');
});

app.use(errorHandler);

export { app };
