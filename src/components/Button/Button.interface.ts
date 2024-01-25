import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  large?: boolean;
  withIcon?: boolean;
}