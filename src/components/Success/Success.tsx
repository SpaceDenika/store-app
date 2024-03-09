import styles from './Success.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

function Success() {
	const navigate = useNavigate();

	const clickHandler = () => {
		navigate('/');
	};

	return (
		<section className={styles['success']}>
			<img className={styles['success__image']} src={import.meta.env.BASE_URL + '/logo.svg'} alt="Логотип" />
			<p className={styles['success__text']}>Ваш заказ успешно оформлен</p>
			<Button className={styles['success__button']} onClick={clickHandler} large>Сделать новый</Button>
		</section>
	);
}

export default Success;