import * as joi from 'joi';
import path from 'path';

process.loadEnvFile(path.resolve(__dirname, '../../../.env'));

interface EnvConfig {
  NODE_ENV: string;
  APP_NAME: string;
  PORT: number;
  PRODUCTS_HOST: string;
  PRODUCTS_PORT: number;
  AUTH_HOST: string;
  AUTH_PORT: number;

  JWT_SECRET: string;
}

const envSchema = joi
  .object<EnvConfig, true>({
    NODE_ENV: joi.string().valid('development', 'production').required(),
    APP_NAME: joi.string().default('Example Initial App'),
    PORT: joi.number().port().default(3000),
    PRODUCTS_HOST: joi.string().default('localhost'),
    PRODUCTS_PORT: joi.number().port().default(3001),
    AUTH_HOST: joi.string().default('localhost'),
    AUTH_PORT: joi.number().port().default(3002),
    JWT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

export const envConfig: EnvConfig = value;
