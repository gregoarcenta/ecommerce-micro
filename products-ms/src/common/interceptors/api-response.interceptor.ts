import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api.responses';

@Injectable()
export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        return {
          statusCode: response.statusCode,
          message:
            this.extractMessage(data) ||
            this.getDefaultMessage(response.statusCode),
          data: this.extractData(data),
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      }),
    );
  }
  private extractMessage(data: any): string | undefined {
    if (!data) return undefined;

    if (typeof data === 'string') return data;

    if (data.message) return data.message;

    return undefined;
  }

  private extractData(data: any): any {
    if (!data) return null;

    if (typeof data !== 'object') return null;

    if (data.message && data.data !== undefined) {
      return data.data;
    }

    // Si solo tiene message, no hay data adicional
    if (data.message && Object.keys(data).length === 1) {
      return null;
    }

    // Devuelve todo el objeto
    return data;
  }

  private getDefaultMessage(statusCode: number): string {
    const messages: Record<number, string> = {
      200: 'Success',
      201: 'Created successfully',
      204: 'No content',
      400: 'Bad request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not found',
      500: 'Internal server error',
    };

    return messages[statusCode] || 'Success';
  }
}
