import dotenv from 'dotenv';
dotenv.config();

const env = {
    port       : process.env.PORT ?? 3000,
    sentry_dsn : process.env.SENTRY_DSN ?? ''
};

export default env;
