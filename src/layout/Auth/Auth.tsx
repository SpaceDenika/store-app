import { Outlet } from 'react-router-dom';
import styles from './Auth.module.css';

function Auth() {
	return (
		<div className={styles['auth-layout']}>
			<aside className={styles['auth-layout__sidebar']}>
				<div className={styles['logo__container']}>
					<img className={styles['logo__image']} src={import.meta.env.BASE_URL + '/logo.svg'} alt="Логотип" />
				</div>
			</aside>
			<Outlet />
		</div>
	);
}

export default Auth;