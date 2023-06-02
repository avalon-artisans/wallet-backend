import {UserInterface} from '../../../common/interfaces/UserInterface';
import {UserRepository} from '../repositories/UserRepository';
import bcrypt from 'bcrypt';
import env from '../../../infrastructure/config/environment';
import {CustomError} from '../../../common/utilities/CustomError';

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
            throw new CustomError('Email already exist', 409);
        }
    }

    private async hashPassword(password: string): Promise<any> {
        return await bcrypt.hash(password, env.salt_rounds);
    }
}
