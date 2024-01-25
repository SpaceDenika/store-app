import styles from './ProductCard.module.css';
import { IProduct } from './ProductCard.interface';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

function ProductCard({ id, title, rating, category, price, image }: IProduct) {
	return (

		<article className={styles['product-card']}>
			<Link className={styles['product-card__link']} to={`/product/${id}`}>
				<div className={styles['product-card__image-wrapper']}>
					<img className={styles['product-card__image']} src={image} alt="Изображение" />
					<p className={styles['product-card__price']}>{price}
						<span className={styles['product-card__price-span']}>$</span>
					</p>
					<Button className={styles['product-card__button']} />
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