import express from 'express';
import userRoute from './routes/UserRoute';
import bodyParser from 'body-parser';
import env from './infrastructure/config/environment';

const Sentry = require('@sentry/node');
Sentry.init({ dsn: env.sentry_dsn });

const app = express();

app.use(bodyParser.urlencoded({
    extended : true
}));

// Middleware
app.use(express.json());

// Use the routes
app.use('/api/user', userRoute);

// Start the server
app.listen(env.port, () => {
    console.log(`Server started on port ${env.port}`);
});
