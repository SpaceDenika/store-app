import styles from './ErrorMessage.module.css';
import { IErrorMessage } from './ErrorMessage.interface';

function ErrorMessage({ message }: IErrorMessage) {
	return (
		<div className={styles['error-message']}>
			<span className={styles['error-message__span']}>Возникла ошибка:</span>
			<p className={styles['error-message__message']}>{message}</p>
		</div>
	);
}

export default ErrorMessage;