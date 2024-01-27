import { LabelHTMLAttributes, ReactNode } from 'react';

export interface ILabel extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}