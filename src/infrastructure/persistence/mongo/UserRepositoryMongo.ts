import {UserRepository} from '../../../domain/user/repositories/UserRepository';
import {UserInterface} from '../../../common/interfaces/UserInterface';
import {UserModel} from '../../../domain/user/models/UserModel';

export class UserRepositoryMongo implements UserRepository {
    private userModel: UserModel;

    constructor() {
        this.userModel = new UserModel();
    }

    async createUser(user: UserInterface): Promise<any> {
        return this.userModel.create(user);
    }
}
