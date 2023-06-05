import dotenv from 'dotenv';
dotenv.config();

const env = {
    port                 : process.env.PORT ?? 3000,
    sentry_dsn           : process.env.SENTRY_DSN ?? '',
    db_name              : process.env.DB_NAME ?? '',
    db_user              : process.env.DB_USER ?? '',
    db_pass              : process.env.DB_PASS ?? '',
    db_host              : process.env.DB_HOST ?? '',
    mongo_srv            : (process.env.MONGO_SRV === 'false') ? 'mongodb://' : 'mongodb+srv://',
    salt_rounds          : process.env.SALT_ROUNDS ?? 10,
    web_app              : process.env.WEB_CLIENT_ID ?? '',
    mobile_app           : process.env.MOB_CLIENT_ID,
    access_token_expiry  : process.env.ACCESS_TOKEN_EXPIRY ?? '8h',
    refresh_token_expiry : process.env.REFRESH_TOKEN_EXPIRY ?? '30d',
    secret_key           : process.env.SECRET_KEY ?? ''
};

export default env;
