import styles from './Input.module.css';
import cn from 'classnames';
import { IInputProps } from './Input.interface';

function Input({ hasError, className, ref, ...props }: IInputProps) {
  return (
    <input
      autoComplete="on"
      ref={ref}
      {...props}
      className={cn(
        styles['input'],
        {
          [styles['input__error']]: hasError,
        },
        className,
      )}
    />
  );
}

export default Input;
