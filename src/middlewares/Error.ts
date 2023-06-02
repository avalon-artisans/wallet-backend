import {NextFunction, Request, Response} from 'express';
import * as Sentry from '@sentry/node';

export class Error {
    static capture = (error: Error, request: Request, response: Response, next: NextFunction) => {
        Sentry.captureException(error);
        next(error);
    }
}