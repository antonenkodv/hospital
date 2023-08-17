import { registerDecorator, ValidationOptions, ValidationArguments, isDate } from 'class-validator';

export function IsTimestampSeconds(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isTimestampSeconds',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return isDate(new Date(value * 1000));
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a valid timestamp in seconds`;
                },
            },
        });
    };
}
