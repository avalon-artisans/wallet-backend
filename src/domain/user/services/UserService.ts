import {UserInterface} from '../../../common/interfaces/UserInterface';
import {UserRepository} from '../repositories/UserRepository';
import bcrypt from 'bcrypt';
import env from '../../../infrastructure/config/environment';

export class UserService {

    private userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    async registerUser (user: UserInterface) {
        user.password = await bcrypt.hash(user.password, env.salt_rounds);

        const result = await this.userRepo.createUser(user);
        return {
            data: result
        };
    }
}
