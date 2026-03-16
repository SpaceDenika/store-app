import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  large?: boolean;
  withIcon?: boolean;
  isLoading: boolean;
}
