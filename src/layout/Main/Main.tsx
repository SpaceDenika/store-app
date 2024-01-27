import cn from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './Main.module.css';
import Button from '../../components/Button/Button';

function Main() {
	return (
		<div className={styles['main-layout']}>
			<aside className={cn(styles['sidebar'], styles['main-layout__sidebar'])}>
				<div className={styles['sidebar__container']}>
					<section className={styles['sidebar__user-info']}>
						<img src='/siba.jpg' className={styles['sidebar__avatar']} alt="Аватар пользователя" />
						<div className={styles['sidebar__user-info-container']}>
							<p className={styles['sidebar__user-name']}>Денис Ершов</p>
							<p className={styles['sidebar__user-email']}>denis.ershov.10@gmail.com</p>
						</div>
					</section>
					<nav className={styles['navigation']}>
						<ul className={styles['navigation__list']}>
							<li>
								<NavLink 
									className={({  isActive  }) => cn(styles['navigation__link'], styles['navigation__link_menu'], {
										[styles['navigation__link_active']]: isActive
									})} 
									to={'/'}>
                    Каталог
								</NavLink>
							</li>
							<li>
								<NavLink 
									className={({  isActive  }) => cn(styles['navigation__link'], styles['navigation__link_cart'], {
										[styles['navigation__link_active']]: isActive
									})} 
									to={'/cart'}>
                    Корзина
								</NavLink>
							</li>
						</ul>
					</nav>
					<Button withIcon className={styles['sidebar__button-exit']}>Выйти</Button>
				</div>
			</aside>
			<main className={styles['main-content']}>
				<Outlet />
			</main>
		</div>
	);
}

export default Main;