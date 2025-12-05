import React, { useState, useEffect } from 'react';
import type { User, UserFormData } from '../types';
import { Input } from './Input';
import { Select } from './Select';
import { validateUserForm } from '../utils/validation';
import type { ValidationErrors } from '../utils/validation';
import { Button } from './Button';

interface UserFormProps {
  user?: User;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
}

const genderOptions = [
  { value: '', label: 'Select Gender' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Non-binary', label: 'Non-binary' },
  { value: 'Genderqueer', label: 'Genderqueer' },
  { value: 'Agender', label: 'Agender' },
  { value: 'Bigender', label: 'Bigender' },
  { value: 'Polygender', label: 'Polygender' },
  { value: 'Genderfluid', label: 'Genderfluid' },
];

export const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<UserFormData>({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    ip_address: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        gender: user.gender,
        ip_address: user.ip_address,
      });
    }
  }, [user]);

  const handleChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateUserForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="First Name"
        value={formData.first_name}
        onChange={(e) => handleChange('first_name', e.target.value)}
        error={errors.first_name}
        required
      />
      <Input
        label="Last Name"
        value={formData.last_name}
        onChange={(e) => handleChange('last_name', e.target.value)}
        error={errors.last_name}
        required
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
        required
      />
      <Select
        label="Gender"
        value={formData.gender}
        onChange={(e) => handleChange('gender', e.target.value)}
        options={genderOptions}
        error={errors.gender}
        required
      />
      <Input
        label="IP Address"
        value={formData.ip_address}
        onChange={(e) => handleChange('ip_address', e.target.value)}
        error={errors.ip_address}
        placeholder="e.g., 192.168.1.1"
        required
      />
      <div className="flex justify-end gap-2 mt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {user ? 'Update' : 'Create'} User
        </Button>
      </div>
    </form>
  );
};
