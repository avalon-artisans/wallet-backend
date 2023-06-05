import env from '../../infrastructure/config/environment';
import {CustomError} from './CustomError';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
export class Auth {

    static createToken (user_agent: string, expiresIn: string) {
        const payload = {
            iat        : dayjs().unix(),
            user_agent : user_agent
        };

        return jwt.sign(payload, env.secret_key, { expiresIn });
    }

    static verifyToken(token: string) {
        try {
            // Verify the access token
            const decoded = jwt.verify(token, env.secret_key);

            console.log(decoded);

            // You can perform additional checks or actions based on the decoded payload
            // For example, check if the token is expired or validate certain claims

        } catch (error) {
            // Access token is invalid or expired
            console.error(error);
        }
    }

    static verifyClient (client_id: string) {
        let user_agent = '';

        if (env.web_app === client_id) {
            user_agent = 'web';
        } else if (env.mobile_app === client_id) {
            user_agent = 'mobile'
        } else {
            throw new CustomError('Unauthorized. Invalid client ID', 401, JSON.stringify({
                context : 'incorrect client id'
            }));
        }

        return user_agent;
    }
}
