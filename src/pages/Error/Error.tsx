import styles from './Error.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

function Error() {
	const navigate = useNavigate();

	const clickHandler = () => {
		navigate('/');
	};

	return(
		<section className={styles['error-page']}>
			<div className={styles['error-page__container']}>
				<img className={styles['error-page__image']} src={import.meta.env.BASE_URL + '/logo.svg'} alt="Логотип" />
				<p className={styles['error-page__text']}>К сожалению, данной страницы не существует</p>
				<Button onClick={clickHandler} large>Перейти в каталог</Button>
			</div>
		</section>
	);
}

export default Error;