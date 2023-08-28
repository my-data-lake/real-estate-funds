import { INestApplication } from '@nestjs/common';

export const createFunctionHandler =
  (handler: (...args: any) => any, appPromise: Promise<INestApplication>) =>
  async (...args: any[]) => {
    const app = await appPromise;
    await app.init();
    return handler(...args);
  };
