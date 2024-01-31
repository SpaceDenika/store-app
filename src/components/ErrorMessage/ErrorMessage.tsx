import styles from './ErrorMessage.module.css';

function ErrorMessage() {
	return (
		<div className={styles['error-message']}>
			<p className={styles['error-message__message']}>Возникла ошибка</p>
		</div>
	);
}

export default ErrorMessage;