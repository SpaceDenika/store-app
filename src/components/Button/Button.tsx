import cn from 'classnames';
import styles from './Button.module.css';
import { IButtonProps } from './Button.interface';

function Button({ children, large, withIcon, isLoading, ...props }: IButtonProps) {
  return (
    <button
      disabled={isLoading}
      {...props}
      className={cn(props.className, styles['button'], {
        [styles['button_large']]: large,
        [styles['button_with-icon']]: withIcon,
      })}
    >
      {children}
      {isLoading && <span className={styles['button_loader']} aria-hidden="true"></span>}
    </button>
  );
}

export default Button;
