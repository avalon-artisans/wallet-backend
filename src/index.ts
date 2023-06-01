import express from 'express';
import userRoute from './routes/UserRoute';
import bodyParser from 'body-parser';
import env from './infrastructure/config/environment';
import {MongooseConnect} from './infrastructure/MongooseConnect';

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

// Connect to mongoDB
new MongooseConnect();

// Start the server
app.listen(env.port, () => {
    console.log(`Server started on port ${env.port}`);
});
