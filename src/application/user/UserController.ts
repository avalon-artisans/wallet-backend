import {NextFunction, Request, Response} from 'express';
import {UserService} from '../../domain/user/services/UserService';
import {UserRepositoryMongo} from '../../infrastructure/persistence/mongo/UserRepositoryMongo';
import {UserRequest} from './UserRequest';
import {UserInterface} from '../../common/interfaces/UserInterface';
import {CustomError} from '../../common/utilities/CustomError';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService(new UserRepositoryMongo());
    }

    registerUser = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
        try {
            const validatedRequest = UserRequest.validateRegisterRequest({
                name     : request.body.name ?? '',
                email    : request.body.email ?? '',
                password : request.body.password ?? ''
            }) as UserInterface;

            const result = await this.userService.registerUser(validatedRequest);
            response.status(201).json(result);
        } catch (error) {
            const exception = error as CustomError;
            response.status(exception.statusCode ?? 500).json({
                errors: {
                    title: 'Registration failed',
                    detail: exception.message
                },
            });
            next(error);
        }
    }
}
