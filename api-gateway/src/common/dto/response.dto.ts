export class ResponseDto<T> {
  statusCode: number;
  message: string;
  data?: T;
  timestamp: string;
  path: string;
}

export class ErrorResponseDto {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
  details?: any;
}
