import cn from 'classnames';
import styles from './Button.module.css';
import { IButton } from './Button.interface';

function Button({ children, large, withIcon, ...props }: IButton) {

	return (
		<button {...props} className={cn(props.className, styles['button'], {
			[styles['button_large']]: large,
			[styles['button_with-icon']]: withIcon}
		)}>{children}</button>
	);
}

export default Button;