import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception.status || HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message;

    const payload = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    response.status(status).json(payload);
  }
}
