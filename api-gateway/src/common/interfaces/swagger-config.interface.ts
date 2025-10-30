import {
  ApiBodyOptions,
  ApiOperationOptions,
  ApiParamOptions,
  ApiQueryOptions,
  ApiResponseOptions,
} from '@nestjs/swagger';

// Tipo para un endpoint completo
export interface SwaggerOptions {
  operation?: ApiOperationOptions;
  responses?: ApiResponseOptions[];
  body?: ApiBodyOptions;
  params?: ApiParamOptions[];
  queries?: ApiQueryOptions[];
  consumes?: string;
}

// Tipo para toda la configuración del controlador
export type SwaggerConfig = {
  [key: string]: SwaggerOptions;
};
