import {UserInterface} from '../../../common/interfaces/UserInterface';

export interface UserRepository {
    createUser(user: UserInterface): Promise<any>;
    findByEmail(email: string): Promise<any>;
}
