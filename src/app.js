import express from 'express';

import { router } from './routes/routes.js';

import { enableMorgan } from './config/plugins/morganPlugin.js';
import { globalErrorHandler } from './errors/errorController.js';
import { envs } from './config/environments/environments.js';

const app = express();

app.use(express.json());

if (envs.NODE_ENV === 'development') {
  enableMorgan(app);
}

//routes
app.use('/api/v1', router);

app.use(globalErrorHandler);

export default app;
