import type { UserFormData } from '../types';

export interface ValidationErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  gender?: string;
  ip_address?: string;
}

export const validateUserForm = (data: UserFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.first_name.trim()) {
    errors.first_name = 'First name is required';
  }

  if (!data.last_name.trim()) {
    errors.last_name = 'Last name is required';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.gender.trim()) {
    errors.gender = 'Gender is required';
  }

  if (!data.ip_address.trim()) {
    errors.ip_address = 'IP address is required';
  } else if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(data.ip_address)) {
    errors.ip_address = 'Invalid IP address format';
  }

  return errors;
};

