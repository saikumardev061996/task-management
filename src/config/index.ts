import { config } from 'dotenv';
import { resolve } from 'path';

// TODO: get path from env.
// option to load conf from Param store as well
config({ path: resolve(__dirname, '../../.env') });

export const LOG_LEVEL = process.env?.LOG_LEVEL ?? 'debug';
export const LOG_DIRECTORY = process.env?.LOG_DIRECTORY ?? './logs';

export const PORT = process.env.PORT || 8001;
export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || 'test_jwt_a';
export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || 'test_jwt_r';
export const JWT_ACCESS_TOKEN_EXPIRY_TIME = parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY_TIME || '') || (6 * 60 * 60);
export const JWT_REFRESH_TOKEN_EXPIRY_TIME = parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRY_TIME || '') || (30 * 24 * 60 * 60);
export const CORS_ORIGIN_URLS = process.env.CORS_ORIGIN || '*';
export const API_CALL_LOG_FORMAT = process.env.API_CALL_LOG_FORMAT ||
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]';
export const REQUEST_BODY_LIMIT = parseInt(process.env.REQUEST_BODY_LIMIT || '100');
export const CONF_DIR_PATH = process.env.CONF_DIR_PATH || resolve('./config/');
export const OTP_EXPIRY_TIME = 6000

export const MONGO_DATABASE = {
    URL: process.env.MONGO_URL || '',
    address: process.env.MONGO_DATABASE_ADDRESS || '127.0.0.1',
    port: process.env.MONG_DATABASE_PORT || 27017,
    username: encodeURIComponent(process.env.MONGO_DATABASE_USERNAME),
    password: encodeURIComponent(process.env.MONGO_DATABASE_PASSWORD),
    name: process.env.MONGO_DATABASE_NAME || 'test',
};

export const PG_DATABASE = {
    host: process.env.SQL_DATABASE_HOST || 'localhost',
    port: parseInt(process.env.SQL_DATABASE_PORT || '5432'),
    username: process.env.SQL_DATABASE_USERNAME,
    password: process.env.SQL_DATABASE_PASSWORD,
    db_name: process.env.SQL_DATABASE_NAME || 'task',
    options: process.env.SQL_DATABASE_OPTIONS || "-c search_path=test_schm",
    pool_size: parseInt(process.env.SQL_DATABASE_POOL_SIZE || '30'),
};

