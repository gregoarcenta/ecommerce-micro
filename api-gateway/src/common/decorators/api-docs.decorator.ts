import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { SwaggerOptions } from '../interfaces/swagger-config.interface';

export function ApiDocs(options: SwaggerOptions) {
  const decorators: any[] = [];

  // Operation
  if (options.operation) {
    decorators.push(ApiOperation(options.operation));
  }

  // Consumes
  if (options.consumes) {
    decorators.push(ApiConsumes(options.consumes));
  }

  // Body
  if (options.body) {
    decorators.push(ApiBody(options.body));
  }

  // Params
  if (options.params) {
    options.params.forEach((param) => {
      decorators.push(ApiParam(param));
    });
  }

  // Queries
  if (options.queries) {
    options.queries.forEach((query) => {
      decorators.push(ApiQuery(query));
    });
  }

  // Responses
  if (options.responses) {
    options.responses.forEach((response) => {
      decorators.push(ApiResponse(response));
    });
  }

  return applyDecorators(...decorators);
}
