import styles from './Loader.module.css';

function Loader() {
	return (
		<div className={styles['loader']}>
			<p className={styles['loader__text']}>Загрузка данных...</p>
			<div className={styles['loader__animation']}></div>
		</div>
	);
}

export default Loader;