import { ReactNode } from 'react';
import { LinkProps } from 'react-router';

export interface INavButton extends LinkProps {
  children?: ReactNode;
  large?: boolean;
  withIcon?: boolean;
}
