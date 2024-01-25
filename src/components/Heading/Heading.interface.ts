import { HTMLAttributes, ReactNode } from 'react';

export interface IHeading extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}