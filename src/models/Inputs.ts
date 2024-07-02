import { ValidationTypes } from '@/lib/utils/validationObjects';
import {
  FieldError,
  FieldValue,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

export interface MainInputProps extends IInputTypes {
  error?: FieldError | undefined | null | 'never';
  // myType?: 'text' | 'number' | 'email' | 'file';
  id?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface IInputTypes {
  myType?: 'number' | 'text' | 'email' | 'file' | 'password';
}

export interface IField extends Pick<MainInputProps, 'myType'> {
  id: string;
  label: string;
  register: UseFormRegister<FieldValue<FieldValues>>;
  error: FieldError | undefined;
  validation: ValidationTypes;
}

export interface IFieldMockUp extends Omit<IField, 'register' | 'error'> {}
