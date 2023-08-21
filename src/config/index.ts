import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    jwt: {
        secret: process.env.JWT_SECRET,
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER
    },
    port: process.env.API_PORT || 3000,
    prefix: process.env.API_PREFIX || 'api',
    oauth_mongodb: {
        host: process.env.MONGO_OAUTH_HOST || '127.0.0.1',
        user: process.env.MONGO_OAUTH_USER || 'root',
        pass: process.env.MONGO_OAUTH_PASS || 'soporte',
        port: process.env.MONGO_OAUTH_PORT || 27017,
        database: process.env.MONGO_OAUTH_DATABASE || 'admin'
    }
};

export default config;