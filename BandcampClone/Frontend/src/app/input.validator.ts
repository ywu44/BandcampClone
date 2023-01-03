import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function usernameValidator(): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
        const value = controls.value;
        if (value.length === 0) {
            return { inValid: true, message: 'The input can\'t be empty.' };
        } else {
            return null;
        }
    };
}

export function emailValidator(): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
        const value = controls.value;
        if (value.length === 0) {
            return { inValid: true, message: 'The input can\'t be empty.' };
        }
        if (!value.includes('@')) {
            return { inValid: true, message: 'Email must be right format!' };
        }
        return value.length === 1 && value.includes('@')
            ? { inValid: true, message: "Email can't be empty!" }
            : null;
    };
}

const containsUppercase = (str: string) => /[A-Z]/.test(str);
const containsLowercase = (str: string) => /[a-z]/.test(str);
const containsNumber = (str: string) => /[0-9]/.test(str);

export function passwordValidator(): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
        const value = controls.value;
        if (value.length === 0) {
            return { inValid: true, message: 'The input can\'t be empty.' };
        } else if (!containsLowercase(value)) {
            return { inValid: true, message: 'The password must contain a lowercase letter!' };
        } else if (!containsUppercase(value)) {
            return { inValid: true, message: 'The password must contain a uppercase letter!' };
        } else if (!containsNumber(value)) {
            return { inValid: true, message: 'The password must contain a number!' };
        } else if (value.length <= 4) {
            return { inValid: true, message: 'The password is too short!' };
        } else {
            return null;
        }
    };
}
