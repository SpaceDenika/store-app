import cn from 'classnames';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Main.module.css';
import Button from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useLazyGetProfileQuery } from '../../store/user/user.api';
import { useEffect, useState } from 'react';
import { logout, setProfile } from '../../store/user/user.slice';
import { getTotalCartPrice, getTotalCount } from '../../store/cart/cart.slice';

function Main() {

	const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
	const dispatch = useDispatch<AppDispatch>();
	const [getProfile, { data }] = useLazyGetProfileQuery();
	const { jwt, profile } = useSelector((state: RootState) => state.user);
	const { cartProducts, totalCount } = useSelector((state: RootState) => state.cart);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getTotalCount());
		dispatch(getTotalCartPrice());
	}, [cartProducts]);

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

	const menuClickHandler = () => {
		setIsOpenMenu(prev => !prev);
	};

	const closeMenuByOverlayClickHandler = () => {
		if (isOpenMenu) {
			setIsOpenMenu(false);
		}
	};

	return (
		<div className={styles['main-layout']}>
			<aside className={cn(styles['sidebar'], styles['main-layout__sidebar'], {
				[styles['main-layout__sidebar_active']]: isOpenMenu
			})}>
				<div className={cn(styles['sidebar__container'], {
					[styles['sidebar__container_active']]: isOpenMenu
				})}>
					<section className={styles['sidebar__user-info']}>
						<img src={import.meta.env.BASE_URL + '/siba.jpg'} className={styles['sidebar__avatar']} alt="Аватар пользователя" />
						<div className={styles['sidebar__user-info-container']}>
							<p className={styles['sidebar__user-name']}>{profile?.name}</p>
							<p className={styles['sidebar__user-email']}>{profile?.email}</p>
						</div>
					</section>
					<nav className={styles['navigation']}>
						<ul className={styles['navigation__list']}>
							<li>
								<NavLink onClick={() => setIsOpenMenu(false)}
									className={({  isActive  }) => cn(styles['navigation__link'], styles['navigation__link_menu'], {
										[styles['navigation__link_active']]: isActive
									})} 
									to={'/'}>
                    Каталог
								</NavLink>
							</li>
							<li>
								<NavLink onClick={() => setIsOpenMenu(false)}
									className={({  isActive  }) => cn(styles['navigation__link'], styles['navigation__link_cart'], {
										[styles['navigation__link_active']]: isActive
									})} 
									to={'/cart'}>
                    Корзина
									{totalCount !== 0 && <span className={styles['navigation__cart-count']}>{totalCount}</span>}
								</NavLink>
							</li>
						</ul>
					</nav>
					<Button onClick={clickHandler} withIcon className={styles['sidebar__button-exit']}>Выйти</Button>
				</div>
			</aside>
			<main onClick={closeMenuByOverlayClickHandler} className={styles['main-content']}>
				<button onClick={menuClickHandler} className={cn(styles['main-content__menu'], {
					[styles['main-content__menu_active']]: isOpenMenu
				})}></button>
				<Outlet />
			</main>
		</div>
	);
}

export default Main;