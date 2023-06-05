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
            const validatedRequest = UserRequest.validateRegisterRequest(request.body) as UserInterface;
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

    authUser = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
        try {
            const validatedCredReq = UserRequest.validateCredRequest(request.body);
            const validatedHeaderReq = UserRequest.validateHeaderRequest({
                client_id : request.headers.client_id
            });
            const result = await this.userService.authUser({
                client_id     : validatedHeaderReq.client_id,
                email         : validatedCredReq.email,
                password      : validatedCredReq.password
            });
            response.status(200).json(result);
        } catch (error) {
            const exception = error as CustomError;
            response.status(exception.statusCode ?? 500).json({
                errors: {
                    title: 'Login Failed',
                    detail: exception.message
                }
            });
            next(error);
        }
    }
}
