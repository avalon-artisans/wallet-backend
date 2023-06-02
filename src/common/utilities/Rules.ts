import {ValidationRule} from '../interfaces/ValidationRule';
import {CustomError} from "./CustomError";

export class Rules {
    static validate(data: object, rules: { [key: string]: ValidationRule }) {
        for (const field in rules) {
            const rule = rules[field as keyof typeof rules];
            const value = data[field as keyof typeof data];
            if (!rule.validator(value)) {
                throw new CustomError(rule.message, 400);
            }
        }

        return data;
    }
}
