import cn from 'classnames';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Main.module.css';
import Button from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useLazyGetProfileQuery } from '../../store/user/user.api';
import { useEffect } from 'react';
import { logout, setProfile } from '../../store/user/user.slice';

function Main() {

	const dispatch = useDispatch<AppDispatch>();
	const [getProfile, { data }] = useLazyGetProfileQuery();
	const { jwt, profile } = useSelector((state: RootState) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		getProfile(jwt);
	}, [jwt, getProfile]);

	useEffect(() => {
		dispatch(setProfile(data));
	}, [data, dispatch]);

	const clickHandler = () => {
		dispatch(logout());
		navigate('/auth/login');
	};

	return (
		<div className={styles['main-layout']}>
			<aside className={cn(styles['sidebar'], styles['main-layout__sidebar'])}>
				<div className={styles['sidebar__container']}>
					<section className={styles['sidebar__user-info']}>
						<img src='/siba.jpg' className={styles['sidebar__avatar']} alt="Аватар пользователя" />
						<div className={styles['sidebar__user-info-container']}>
							<p className={styles['sidebar__user-name']}>{profile?.name}</p>
							<p className={styles['sidebar__user-email']}>{profile?.email}</p>
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
					<Button onClick={clickHandler} withIcon className={styles['sidebar__button-exit']}>Выйти</Button>
				</div>
			</aside>
			<main className={styles['main-content']}>
				<Outlet />
			</main>
		</div>
	);
}

export default Main;