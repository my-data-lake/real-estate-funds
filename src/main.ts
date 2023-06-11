import { IS_CLOUD_FUNCTION, PORT } from './config/env';
import { createApp } from './config/setup/create-app';
import express from 'express';
import { createFunctionHandler } from './config/setup/create-function-handler';

const server = express();

const appPromise = createApp(server);

export const cloudFunctionHandler = createFunctionHandler(server, appPromise);

if (!IS_CLOUD_FUNCTION) {
  const port = PORT || 3000;
  appPromise
    .then((app) => app.listen(port))
    .then(() => {
      console.log(`Listening on port ${port}`);
    });
}
