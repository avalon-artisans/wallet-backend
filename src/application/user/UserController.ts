import {Request, Response} from 'express';
import {UserService} from '../../domain/user/services/UserService';
import {UserRepositoryMongo} from '../../infrastructure/persistence/mongo/UserRepositoryMongo';
import * as Sentry from '@sentry/node';
import {UserRequest} from './UserRequest';
import {UserInterface} from '../../common/interfaces/UserInterface';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService(new UserRepositoryMongo());
    }

    async registerUser (request: Request, response: Response): Promise<any> {
        try {
            const validatedRequest = UserRequest.validateRegisterRequest({
                name     : request.body.name ?? '',
                email    : request.body.email ?? '',
                password : request.body.password ?? ''
            }) as UserInterface;

            const result = await this.userService.registerUser(validatedRequest);
            response.status(201).json(result);
        } catch (error) {
            response.status(400).json({
                errors: {
                    title: 'Registration failed',
                    detail: (error as Error).message
                },
            });
            Sentry.captureException(error);
        }
    }
}
