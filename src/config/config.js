import dotenv from 'dotenv';

export const getVariables = (options) => {
    const environment = options.opts().mode;
    // console.log(`Environment: ${environment}`);
    dotenv.config({
        path: environment === 'production' ? './.env.production' : './.env.development'
    });

    // console.log(`PORT: ${process.env.PORT}`);
    // console.log(`MONGO_URL: ${process.env.MONGO_URL}`);
    // console.log(`adminName: ${process.env.ADMIN_NAME}`);
    // console.log(`adminPassword: ${process.env.ADMIN_PASSWORD}`);
    // console.log(`persistence: ${process.env.PERSISTENCE}`);
    // console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

    return {
        BASE_URL: process.env.BASE_URL,
        PORT: process.env.PORT,
        MONGO_URL: process.env.MONGO_URL,
        adminName: process.env.ADMIN_NAME,
        adminPassword: process.env.ADMIN_PASSWORD,
        persistence: process.env.PERSISTENCE,
        googleUser: process.env.GOOGLE_USER,
        googlePass: process.env.GOOGLE_PASSWORD,
        mailingService: process.env.MAILING_SERVICE,
        NODE_ENV: process.env.NODE_ENV,
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
        BREVO_API_KEY: process.env.BREVO_API_KEY
    }
}