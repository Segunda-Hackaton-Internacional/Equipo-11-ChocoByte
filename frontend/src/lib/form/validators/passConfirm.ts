import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordConfirmationValidator(passwordField: string, passwordConfirmField: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control1 = group.get(passwordField);
    const control2 = group.get(passwordConfirmField);

    if (!control1 || !control2) return null;

    const isMatching = control1.value === control2.value;

    return isMatching ? null : { fieldsMismatch: true };
  };
}
