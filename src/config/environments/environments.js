import 'dotenv/config';
import env from 'env-var';

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  NODE_ENV: env.get('NODE_ENV').required().asString(),
  DB_URI: env.get('DB_URI').required().asString(),
  SECRET_JWT_SEED: env.get('SECRET_JWT_SEED').required().asString(),
  JWT_EXPIRED_IN: env.get('JWT_EXPIRED_IN').required().asString(),
};
