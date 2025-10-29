import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
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

    const { statusCode, error, message, details } =
      exception as ErrorResponseDto;

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
