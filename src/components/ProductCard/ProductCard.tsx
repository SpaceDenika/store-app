import styles from './ProductCard.module.css';
import { IProductCard } from './ProductCard.interface';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addCart, getTotalCartPrice, getTotalProductPrice } from '../../store/cart/cart.slice';
import { MouseEventHandler } from 'react';

function ProductCard({ id, title, rating, category, price, image, product }: IProductCard) {

	const dispatch = useDispatch<AppDispatch>();

	const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		dispatch(addCart(product));
		dispatch(getTotalProductPrice());
		dispatch(getTotalCartPrice());
	};

	return (
		<article className={styles['product-card']}>
			<Link className={styles['product-card__link']} to={`/product/${id}`}>
				<div className={styles['product-card__image-wrapper']}>
					<img className={styles['product-card__image']} src={image} alt={`Изображение ${title}`} />
					<p className={styles['product-card__price']}>{price}
						<span className={styles['product-card__price-span']}>$</span>
					</p>
					<Button onClick={clickHandler} className={styles['product-card__button']} />
					<p className={styles['product-card__rating']}>{rating.toFixed(1)}</p>
				</div>
				<div className={styles['product-card__info']}>
					<h2 className={styles['product-card__title']}>{title}</h2>
					<p className={styles['product-card__category']}>{category}</p>
				</div>
			</Link>
		</article>
	);
}

export default  ProductCard;