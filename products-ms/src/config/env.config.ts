import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').required(),
  APP_NAME: Joi.string().default('Example Initial App'),
  PORT: Joi.number().port().default(3000),
  DATABASE_URL: Joi.string().required(),
});
