import { useState } from 'react';
import { AuthData } from '../types/auth-data'; // путь к твоему типу

type ValidationErrors = Partial<Record<keyof AuthData, string>>;

export const useLoginValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = (form: AuthData): boolean => {
    const newErrors: ValidationErrors = {};

    if (!form.login.trim()) {
      newErrors.login = 'Login cannot be empty';
    }

    if (!form.password.trim()) {
      newErrors.password = 'Password cannot be empty';
    } else {
      const hasLetter = /[A-Za-z]/.test(form.password);
      const hasNumber = /[0-9]/.test(form.password);

      if (!hasLetter || !hasNumber) {
        newErrors.password =
          'Password must contain at least one letter and one number';
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate, setErrors };
};
