import * as joi from 'joi';
import path from 'path';

process.loadEnvFile(path.resolve(__dirname, '../../../.env'));

interface EnvConfig {
  AUTH_HOST: string;
  AUTH_PORT: number;
}

const envSchema = joi
  .object<EnvConfig, true>({
    AUTH_HOST: joi.string().default('localhost'),
    AUTH_PORT: joi.number().port().default(3002),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

export const envConfig: EnvConfig = value;
