import validator from 'validator';
import isLength = validator.isLength;
import isEmail = validator.isEmail;
import {Rules} from '../../common/utilities/Rules';

export class UserRequest {
    static validateRegisterRequest(data: object) {
        const rules = {
            name: {
                validator : (value: string) => isLength(value, { min: 2, max: 100 }),
                message   : 'Name must be between 2 and 100 characters'
            },
            email: {
                validator : isEmail,
                message   : 'Invalid email address'
            },
            password: {
                validator : (value: string) => isLength(value, { min: 8 }),
                message   : 'Password must be at least 8 characters long'
            }
        };

        return Rules.validate(data, rules);
    }
}
