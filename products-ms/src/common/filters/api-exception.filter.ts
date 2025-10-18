import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from 'generated/prisma';
import { inspect } from 'node:util';
import { ApiErrorResponse } from '../interfaces/api.response';

type ErrorContext = Omit<ApiErrorResponse, 'timestamp' | 'path'>;

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);
  private readonly isDev = process.env.NODE_ENV === 'development';

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorContext = this.buildErrorContext(exception);
    this.logError(request, errorContext);
    this.sendResponse(response, request, errorContext);
  }

  private buildErrorContext(exception: unknown): ErrorContext {
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
  ): ErrorContext {
    const { meta, code } = exception;

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
        const cause = (meta?.cause as string) ?? '';
        const modelMatch = cause.match(/No '(\w+)' record/);
        const modelName = modelMatch?.[1] ?? 'Record';

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
          details: this.isDev
            ? { prismaCode: code, meta, stack: exception.stack }
            : undefined,
        };
      }
    }
  }

  private handleHttpException(exception: HttpException): ErrorContext {
    const res = exception.getResponse();
    const responseObj =
      typeof res === 'string'
        ? { message: res, error: exception.name }
        : (res as Partial<ApiErrorResponse>);

    return {
      statusCode: exception.getStatus(),
      error: responseObj.error ?? exception.name,
      message: responseObj.message ?? exception.message,
      details: this.isDev ? exception.stack : undefined,
    };
  }

  private handleUnexpectedError(exception: Error): ErrorContext {
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: exception.name || 'InternalServerError',
      message: exception.message || 'An unexpected error occurred',
      details: this.isDev ? exception.stack : undefined,
    };
  }

  private logError(request: Request, context: ErrorContext): void {
    const message = Array.isArray(context.message)
      ? context.message.join('; ')
      : context.message;

    this.logger.error(
      `[${request.method}] ${request.url} -> ${context.statusCode} (${context.error}): ${message}`,
    );
  }

  private sendResponse(
    response: Response,
    request: Request,
    context: ErrorContext,
  ): void {
    const message = Array.isArray(context.message)
      ? context.message.join('; ')
      : context.message;

    const errorResponse: ApiErrorResponse = {
      ...context,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(context.statusCode).json(errorResponse);
  }
}
