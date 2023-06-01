export interface ValidationRule {
    validator: (value: any) => boolean;
    message: string;
}
