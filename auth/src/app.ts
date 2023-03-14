import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler, NotFoundError } from '@tr-common/common';

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

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// handles the case where the route is not found
app.all('*', async () => {
  throw new NotFoundError('');
});

app.use(errorHandler);

export { app };
