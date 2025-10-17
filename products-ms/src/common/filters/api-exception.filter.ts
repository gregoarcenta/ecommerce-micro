import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiErrorResponse } from '../interfaces/api.response';

@Catch()
export class ApiExceptionFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);
  private readonly isDev = process.env.NODE_ENV === 'development';

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';
    let details: any = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const res = exception.getResponse();
      const responseObj =
        typeof res === 'string'
          ? { message: res, error: exception.name }
          : (res as Partial<ApiErrorResponse>);

      error = responseObj.error ?? exception.name;
      message = responseObj.message ?? message;
      if (this.isDev) details = exception.stack;
    } else if (exception instanceof Error) {
      error = exception.name ?? error;
      message = exception.message ?? message;
      details = this.isDev ? exception.stack : undefined;
    }

    message = Array.isArray(message) ? message.join('; ') : message;

    const errorResponse: ApiErrorResponse = {
      statusCode: status,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
      details,
    };

    this.logger.error(
      `[${request.method}] ${request.url} -> ${status} (${error}): ${message}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    response.status(status).json(errorResponse);
  }
}
