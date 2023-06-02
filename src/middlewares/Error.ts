import {NextFunction, Request, Response} from 'express';
import * as Sentry from '@sentry/node';
import {CustomError} from '../common/utilities/CustomError';

export class Error {
    static capture = (error: Error, request: Request, response: Response, next: NextFunction) => {
        const log = error as CustomError;
        Sentry.captureException(error);
        Sentry.captureMessage(log.data);
        next(error);
    }
}
