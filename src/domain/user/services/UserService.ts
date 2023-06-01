import {UserInterface} from '../../../common/interfaces/UserInterface';
import {UserRepository} from '../repositories/UserRepository';

export class UserService {

    private userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    registerUser (user: UserInterface) {
        return {};
    }
}
