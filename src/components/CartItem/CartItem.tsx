import styles from './CartItem.module.css';
import cn from 'classnames';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { increase, decrease, removeProduct, getTotalProductPrice, getTotalCartPrice } from '../../store/cart/cart.slice';
import { useDispatch } from 'react-redux';
import { MouseEventHandler, useEffect } from 'react';
import { AppDispatch } from '../../store/store';
import ICartItem from './CartItem.interface';


function CartItem({product}: ICartItem) {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (product.count < 1) {
			dispatch(removeProduct(product));
		}
	}, [product.count]);

	const increaseHandlerClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		dispatch(increase(product));
		dispatch(getTotalProductPrice());
		dispatch(getTotalCartPrice());
	};

	const decreaseHandlerClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		dispatch(decrease(product));
		dispatch(getTotalProductPrice());
		dispatch(getTotalCartPrice());
	};
  
	const removeHandlerClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		dispatch(removeProduct(product));
		dispatch(getTotalCartPrice());
	};

	return(
		<Link className={styles['products-list__link']} to={`/product/${product.id}`}>
			<img className={styles['products-list__image']} src={product.images[0]} alt={product.title} />
			<div className={styles['products-list__info']}>
				<h2 className={styles['products-list__title']}>{product.title}</h2>
				<p className={styles['products-list__price']}>{product.totalPrice}
					<span className={styles['products-list__price-span']}>$</span>
				</p>
			</div>
			<div className={styles['products-list__count-container']}>
				<Button onClick={increaseHandlerClick} className={cn(styles['products-list__button'], styles['products-list__button_plus'])} />
				<p className={styles['products-list__count']}>{product.count}</p>
				<Button onClick={decreaseHandlerClick} className={cn(styles['products-list__button'], styles['products-list__button_minus'])} />
			</div>
			<button onClick={removeHandlerClick} className={cn(styles['products-list__button'], styles['products-list__remove-button'])}></button>
		</Link>
	);
}

export default CartItem;