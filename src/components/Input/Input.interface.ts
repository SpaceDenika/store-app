import { InputHTMLAttributes, Ref } from 'react';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  ref?: Ref<HTMLInputElement>;
}
