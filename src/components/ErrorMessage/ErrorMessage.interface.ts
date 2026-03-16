import { HTMLAttributes, ReactNode } from 'react';

export interface IErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}
