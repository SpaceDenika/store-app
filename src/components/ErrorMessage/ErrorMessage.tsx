import styles from './ErrorMessage.module.css';
// import { IErrorMessage } from './ErrorMessage.interface';

// function ErrorMessage({ message }: IErrorMessage) {
// 	return (
// 		<div className={styles['error-message']}>
// 			<span className={styles['error-message__span']}>Возникла ошибка:</span>
// 			<p className={styles['error-message__message']}>{message}</p>
// 		</div>
// 	);
// }

function ErrorMessage() {
	return (
		<div className={styles['error-message']}>
			<p className={styles['error-message__message']}>Возникла ошибка</p>
		</div>
	);
}

export default ErrorMessage;