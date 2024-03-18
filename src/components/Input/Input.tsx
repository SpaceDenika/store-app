import { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';

function Input(props: InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input {...props} className={cn(styles['input'], props.className)} />
	);
}

export default Input;