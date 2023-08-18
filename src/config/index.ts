import * as dotenv from 'dotenv';
dotenv.config();

// Create a configuration object to hold those environment variables.
const config = {
    // JWT important variables
    jwt: {
        // The secret is used to sign and validate signatures.
        secret: process.env.JWT_SECRET,
        // The audience and issuer are used for validation purposes.
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER
    },
    // The basic API port and prefix configuration values are:
    port: process.env.API_PORT || 3000,
    prefix: process.env.API_PREFIX || 'api',
    oauth_mongodb: {
        host: process.env.MONGO_OAUTH_HOST,
        user: process.env.MONGO_OAUTH_USER,
        pass: process.env.MONGO_OAUTH_PASS,
        port: process.env.MONGO_OAUTH_PORT,
        database: process.env.MONGO_OAUTH_DATABASE
    }
};

// Make our confirmation object available to the rest of our code.
export default config;