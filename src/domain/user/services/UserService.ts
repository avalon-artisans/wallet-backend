import {UserInterface} from '../../../common/interfaces/UserInterface';
import {UserRepository} from '../repositories/UserRepository';
import bcrypt from 'bcrypt';
import env from '../../../infrastructure/config/environment';
import {CustomError} from '../../../common/utilities/CustomError';
import {AuthInterface} from '../../../common/interfaces/AuthInterface';
import {Auth} from '../../../common/utilities/Auth';

export class UserService {

    private userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    async registerUser (user: UserInterface) {
        await this.checkIfEmailExist(user.email);
        user.password = await this.hashPassword(user.password);
        const result = await this.userRepo.createUser(user);

        return {
            data: result
        };
    }

    private async checkIfEmailExist(email: string): Promise<any> {
        const result = await this.userRepo.findByEmail(email);
        if (!!result) {
            throw new CustomError(
                'Email already exist',
                409,
                JSON.stringify({context: 'email'})
            );
        }
    }

    private async hashPassword(password: string): Promise<any> {
        return await bcrypt.hash(password, env.salt_rounds);
    }

    async authUser(params: AuthInterface) {
        const result = await this.userRepo.findByEmail(params.email);
        if (!result) {
            throw new CustomError('Incorrect email or password', 401);
        }

        const isMatch = await bcrypt.compare(params.password, result.password);
        if (!isMatch) {
            throw new CustomError('Incorrect email or password', 401);
        }

        const user_agent = Auth.verifyClient(params.client_id);
        const user_info = {
            user_id : result.user_id,
            name    : result.name,
            email   : result.email
        };
        if (user_agent === 'mobile') {
            return {
                data: {
                    ...user_info,
                    access_token: Auth.createToken(user_agent, env.access_token_expiry),
                    refresh_token: Auth.createToken(user_agent, env.refresh_token_expiry)
                }
            };
        }

        return {
            data: {
                ...user_info,
                access_token: Auth.createToken(user_agent, env.access_token_expiry)
            }
        };
    }
}
