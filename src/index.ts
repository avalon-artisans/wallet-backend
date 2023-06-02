import express from 'express';
import userRoute from './routes/UserRoute';
import bodyParser from 'body-parser';
import env from './infrastructure/config/environment';
import {Error} from './middlewares/Error';
import {MongoDB} from './infrastructure/MongoDB';
import * as Sentry from '@sentry/node';

Sentry.init({ dsn: env.sentry_dsn });

const app = express();

app.use(bodyParser.urlencoded({
    extended : true
}));

app.use(express.json());

// Routes
app.use('/api/user', userRoute);

// Error reporting
app.use(Error.capture);

// Connection
MongoDB.connect()
    .then(() => {
        app.listen(env.port, () => {
            console.log(`Server started on port ${env.port}`);
        });
    })
    .catch(() => {
        process.exit(1);
    });
