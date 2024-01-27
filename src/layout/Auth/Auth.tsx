import { Outlet } from 'react-router-dom';
import styles from './Auth.module.css';

function Auth() {
	return (
		<div className={styles['auth-layout']}>
			<aside>
				<div className={styles['logo__container']}>
					<img className={styles['logo__image']} src="/logo.svg" alt="Логотип" />
				</div>
			</aside>
			<Outlet />
		</div>
	);
}

export default Auth;