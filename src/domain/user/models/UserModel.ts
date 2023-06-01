import mongoose, { Schema, Model } from 'mongoose';
import {UserInterface} from '../../../common/interfaces/UserInterface';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class UserModel {
    private model: Model<UserInterface>;

    constructor() {
        const userSchema = new Schema({
            name       : { type: String, required: true },
            email      : { type: String, required: true, unique: true },
            password   : { type: String, required: true },
            accounts   : { type: Array },
            created_at : { type: Date },
            updated_at : { type: Date },
            deleted_at : { type: Date }
        });
        this.model = mongoose.model<UserInterface>('user', userSchema);
    }

    public async create(user: UserInterface): Promise<any> {
        const result = await this.model.create({
            ...user,
            accounts   : [],
            created_at : dayjs().utc(),
            updated_at : null,
            deleted_at : null
        });

        return {
            user_id : result.id,
            name    : result.name,
            email   : result.email
        };
    }
}
