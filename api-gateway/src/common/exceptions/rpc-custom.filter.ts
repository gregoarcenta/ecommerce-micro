import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { envConfig } from '../../config';
import { ErrorResponseDto } from '../dto/response.dto';

@Catch()
export class RpcCustomFilter {
  private readonly logger = new Logger(RpcCustomFilter.name);
  private readonly isDev = envConfig.NODE_ENV === 'development';

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // console.dir(exception, { depth: null, colors: true });

    let { statusCode, error, message, details } = exception as ErrorResponseDto;

    if (!statusCode && exception instanceof HttpException) {
      statusCode = exception.getStatus();
    }

    if (!error && exception instanceof HttpException) {
      error = exception.getResponse()['error'] || 'InternalServerError';
    }

    if (!message && exception instanceof HttpException) {
      message = exception.getResponse()['message'] || 'Internal Server Error';
    }

    if (!details && exception instanceof HttpException) {
      details = exception.stack || undefined;
    }

    this.logger.error(
      `[${request.method}] ${request.url} -> ${statusCode} (${error}): ${message}`,
    );

    const errorResponse: ErrorResponseDto = {
      statusCode,
      error,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
      details: this.isDev ? details : undefined,
    };

    response.status(statusCode).json(errorResponse);
  }
}
