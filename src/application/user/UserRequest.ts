import Joi, {ValidationResult} from "joi";
import {CustomError} from "../../common/utilities/CustomError";

export class UserRequest {
    static validateRegisterRequest(data: object) {
        const schema = Joi.object({
            name     : Joi.string().required().min(1).max(100),
            email    : Joi.string().email().required().max(100),
            password : Joi.alternatives().try(
                Joi.string().min(8),
                Joi.number().min(8)
            ).required()
        });
        const result = schema.validate(data);
        return UserRequest.checkResult(result);
    }

    static validateCredRequest(data: object) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password : Joi.required()
        });
        const result = schema.validate(data);
        return UserRequest.checkResult(result);
    }

    static validateHeaderRequest(data: object) {
        const schema = Joi.object({
            client_id : Joi.string().required()
        });

        const result = schema.validate(data);
        return UserRequest.checkResult(result);
    }

    private static checkResult(param: object) {
        const result = param as ValidationResult;
        if (!!result.error) {
            const error = result.error.details[0];
            throw new CustomError(error.message, 400, JSON.stringify(error));
        }

        return result.value;
    }
}
