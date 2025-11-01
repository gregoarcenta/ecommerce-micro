import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  RpcExceptionFilter,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { inspect } from 'node:util';
import { Observable, throwError } from 'rxjs';

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  details?: any;
}

@Catch()
export class AllExceptionFilter implements RpcExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): Observable<any> {
    const { message, details, error, statusCode } =
      this.buildErrorContext(exception);

    const errorMessage = Array.isArray(message) ? message.join('; ') : message;

    this.logger.error(`[ERROR] ${statusCode} -> (${error}): ${errorMessage}`);

    const errorResponse: ErrorResponse = {
      statusCode,
      error,
      message: errorMessage,
      details,
    };

    return throwError(() => errorResponse);
  }

  private buildErrorContext(exception: unknown): ErrorResponse {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return this.handlePrismaError(exception);
    }

    if (exception instanceof HttpException) {
      return this.handleHttpException(exception);
    }

    if (exception instanceof Error) {
      return this.handleUnexpectedError(exception);
    }

    return this.handleUnexpectedError(
      new Error(`Unexpected error type: ${inspect(exception)}`),
    );
  }

  private handlePrismaError(
    exception: Prisma.PrismaClientKnownRequestError,
  ): ErrorResponse {
    const { meta, code } = exception;
    this.logger.debug(`[ERROR] CODE: ${code} -> ${JSON.stringify(meta)}`);

    switch (code) {
      case 'P2000': {
        const column = (meta?.column_name as string) ?? 'field';
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          error: BadRequestException.name,
          message: `Value too long for ${column}`,
        };
      }

      case 'P2001': {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          error: NotFoundException.name,
          message: 'Record not found',
        };
      }

      case 'P2002': {
        const field = (meta?.target as string[])?.[0] ?? 'field';
        return {
          statusCode: HttpStatus.CONFLICT,
          error: ConflictException.name,
          message: `A record with this ${field} already exists`,
        };
      }

      case 'P2003': {
        const field = (meta?.field_name as string) ?? 'unknown field';
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          error: BadRequestException.name,
          message: `Invalid reference: ${field}`,
        };
      }

      case 'P2011': {
        const constraint = (meta?.constraint as string) ?? 'field';
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          error: BadRequestException.name,
          message: `${constraint} cannot be null`,
        };
      }

      case 'P2012': {
        const path = (meta?.path as string) ?? 'field';
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          error: BadRequestException.name,
          message: `Missing required value: ${path}`,
        };
      }

      case 'P2025': {
        const modelName = (meta?.modelName as string) ?? 'Record';

        return {
          statusCode: HttpStatus.NOT_FOUND,
          error: NotFoundException.name,
          message: `${modelName} not found`,
        };
      }

      default: {
        this.logger.warn(
          `Unhandled Prisma error: ${code}`,
          JSON.stringify(meta),
        );

        const cleanMessage =
          exception.message.split('\n').pop()?.trim() ||
          'Database operation failed';

        return {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'DatabaseError',
          message: cleanMessage,
          details: { prismaCode: code, meta, stack: exception.stack },
        };
      }
    }
  }

  private handleHttpException(exception: HttpException): ErrorResponse {
    const res = exception.getResponse();
    const responseObj =
      typeof res === 'string'
        ? { message: res, error: exception.name }
        : (res as Partial<ErrorResponse>);

    return {
      statusCode: exception.getStatus(),
      error: responseObj.error ?? exception.name,
      message: responseObj.message ?? exception.message,
      details: exception.stack,
    };
  }

  private handleUnexpectedError(exception: Error): ErrorResponse {
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: exception.name || 'InternalServerError',
      message: exception.message || 'An unexpected error occurred',
      details: exception.stack,
    };
  }
}
