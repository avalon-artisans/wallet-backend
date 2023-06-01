import {ValidationRule} from '../interfaces/ValidationRule';

export class Rules {
    static validate(data: object, rules: { [key: string]: ValidationRule }) {
        for (const field in rules) {
            const rule = rules[field as keyof typeof rules];
            const value = data[field as keyof typeof data];
            if (!rule.validator(value)) {
                throw new Error(rule.message);
            }
        }

        return data;
    }
}
