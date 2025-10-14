import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, } from '@nestjs/common';
import { ApiErrorResponse } from '../interfaces/api.responses';

@Catch()
export class ApiExceptionFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);

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
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        error = exception.name;
      } else if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || message;
        error = (exceptionResponse as any).error || exception.name;

        if (
          (exceptionResponse as any).message &&
          Array.isArray((exceptionResponse as any).message)
        ) {
          details = (exceptionResponse as any).message;
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      error = exception.name;

      // En desarrollo, incluye el stack trace
      if (process.env.NODE_ENV === 'development') {
        details = exception.stack;
      }
    }

    this.logger.error(
      `${request.method} ${request.url} - Status: ${status} - Message: ${message}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    const errorResponse: ApiErrorResponse = {
      statusCode: status,
      message: Array.isArray(message) ? message.join(', ') : message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (details && process.env.NODE_ENV === 'development') {
      errorResponse.details = details;
    }

    response.status(status).json(errorResponse);
  }
}
