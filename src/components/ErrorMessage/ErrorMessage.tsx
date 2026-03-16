import cn from 'classnames';
import { IErrorMessageProps } from './ErrorMessage.interface';
import styles from './ErrorMessage.module.css';

function ErrorMessage({ children, className, ...props }: IErrorMessageProps) {
  return (
    <p className={cn(styles['error-message'], className)} {...props}>
      {children}
    </p>
  );
}

export default ErrorMessage;
