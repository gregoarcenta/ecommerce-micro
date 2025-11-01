import { SwaggerConfig } from '../common';

export const authSwaggerConfig: SwaggerConfig = {
  register: {
    operation: {
      summary: 'Register',
      description: 'Register a new user',
    },
    body: {
      description: 'User registration details',
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', format: 'password', minLength: 6 },
        },
        required: ['name', 'email', 'password'],
      },
    },
    responses: [
      {
        status: 201,
        description: 'User registered successfully',
        schema: {
          example: {
            statusCode: 201,
            message: 'User created successfully',
            data: {
              access_token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMzA4ZjE3NS1iZTI0LTRlOGUtOWUyMy1mZGM0OGIzZDk0OWYiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc2MjAyNTk2NSwiZXhwIjoxNzYyNjMwNzY1fQ.kNrBRPlyAS9_Jqn5URRUOYHT5ovNqsd3v7i8pFI7qto',
              user: {
                id: 'b308f175-be24-4e8e-9e23-fdc48b3d949f',
                email: 'user@example.com',
                name: 'string',
                role: 'USER',
              },
            },
            timestamp: '2025-11-01T19:39:25.018Z',
            path: '/api/auth/register',
          },
        },
      },
      {
        status: 409,
        description: 'Email already exists',
        schema: {
          example: {
            statusCode: 409,
            error: 'ConflictException',
            message: 'A record with this email already exists',
            path: '/api/auth/register',
            timestamp: '2025-11-01T19:40:08.463Z',
          },
        },
      },
      {
        status: 400,
        description: 'Validation error',
        schema: {
          example: {
            statusCode: 400,
            error: 'BadRequestException',
            message: 'Validation failed',
            path: '/api/auth/register',
            timestamp: '2025-11-01T19:39:25.018Z',
            details: {},
          },
        },
      },
    ],
  },
  login: {
    operation: {
      summary: 'Login',
      description: 'Login to the application',
    },
    body: {
      description: 'User credentials',
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', format: 'password', minLength: 6 },
        },
      },
    },
    responses: [
      {
        status: 200,
        description: 'Login successful',
        schema: {
          example: {
            statusCode: 200,
            message: 'User logged in successfully',
            data: {
              access_token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5NzFiOWRkMi1jOTc2LTRmZWItOGIyNS05OTQ4YTA1M2ZkYmQiLCJlbWFpbCI6ImdyZWdvYXJjZW50YUBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc2MjAyNTcyMCwiZXhwIjoxNzYyNjMwNTIwfQ.o0kAsCglRiJ7MSZ-P8uzuZVQjoCmI0-oLlzXAxEjaGA',
              user: {
                id: '971b9dd2-c976-4feb-8b25-9948a053fdbd',
                email: 'gregoarcenta@gmail.com',
                name: 'gregory arcentales',
                role: 'USER',
              },
            },
            timestamp: '2025-11-01T19:35:20.398Z',
            path: '/api/auth/login',
          },
        },
      },
      {
        status: 401,
        description: 'Invalid credentials',
        schema: {
          example: {
            statusCode: 401,
            error: 'UnauthorizedException',
            message: 'Invalid credentials',
            path: '/api/auth/login',
            timestamp: '2025-11-01T19:35:20.398Z',
          },
        },
      },
    ],
  },
  checkStatus: {
    operation: {
      summary: 'Check Status',
      description: 'Check the status of the authenticated user',
    },
    responses: [
      {
        status: 200,
        description: 'Return a new status of the authenticated user',
        schema: {
          example: {
            statusCode: 200,
            message: 'Success',
            data: {
              access_token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5NzFiOWRkMi1jOTc2LTRmZWItOGIyNS05OTQ4YTA1M2ZkYmQiLCJlbWFpbCI6ImdyZWdvYXJjZW50YUBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc2MjAyNjIwOCwiZXhwIjoxNzYyNjMxMDA4fQ.1vZITkpDtHETwuDeDSMinM-WVnrig9uFlSw_7ErjaZw',
              user: {
                id: '971b9dd2-c976-4feb-8b25-9948a053fdbd',
                email: 'gregoarcenta@gmail.com',
                name: 'gregory arcentales',
                role: 'USER',
              },
            },
            timestamp: '2025-11-01T19:43:28.905Z',
            path: '/api/auth/check-status',
          },
        },
      },
      {
        status: 401,
        description: 'Unauthorized',
        schema: {
          example: {
            statusCode: 401,
            error: 'UnauthorizedException',
            message: 'Unauthorized',
            path: '/api/auth/status',
            timestamp: '2025-11-01T19:35:20.398Z',
          },
        },
      },
    ],
  },
};
