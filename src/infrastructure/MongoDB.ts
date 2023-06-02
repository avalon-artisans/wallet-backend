import mongoose, {ConnectOptions} from 'mongoose';
import env from './config/environment';
import * as Sentry from '@sentry/node';

export class MongoDB {
    static async connect () {
        try {
            let connectionString = `${env.mongo_srv}${env.db_host}/${env.db_name}`;

            if (!!env.db_user && !!env.db_pass) {
                connectionString = `${env.mongo_srv}${env.db_user}:${env.db_pass}@${env.db_host}/${env.db_name}`;
            }

            const options = {
                useNewUrlParser    : true,
                useUnifiedTopology : true,
            } as ConnectOptions;

            await mongoose.connect(connectionString, options);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error(error);
            Sentry.captureException(error);
            throw error;
        }
    }
}
