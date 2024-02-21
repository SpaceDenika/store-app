import { useNavigate, useParams } from 'react-router-dom';
import styles from './Product.module.css';
import Heading from '../../components/Heading/Heading';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useGetProductByIdQuery } from '../../store/products/products.api';
import Button from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { addCart, getTotalCartPrice, getTotalProductPrice } from '../../store/cart/cart.slice';

function Product() {
	const { cartProducts } = useSelector((state: RootState) => state.cart);
	const { id } = useParams();
	const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();

	const { data: product, isError, isLoading, isFetching } = useGetProductByIdQuery(id);

	const isProductInCart = () => {
		const productInCart = cartProducts.find((cartProduct) => cartProduct.id === product?.id);

		if (productInCart) {
			return `В корзине ${productInCart.count} шт.`;
		} 
		return 'В корзину';
	};

	const clickHandler = () => {
		dispatch(addCart(product));
		dispatch(getTotalProductPrice());
		dispatch(getTotalCartPrice());
	};

	const exitButtonClickHandler = () => {
		navigate('/');
	};

	return (<>
		{isError && <ErrorMessage />}
		{(isLoading ||isFetching) && <Loader />}
		{(!isLoading && !isError && !isFetching) && <article className={styles['product']}>
			<header className={styles['product__header']}>
				<button onClick={exitButtonClickHandler} className={styles['product__button-exit']} />
				<div className={styles['product__header-info']}>
					<Heading>{product?.title}</Heading>
					<p className={styles['product__category']}>{product?.category}</p>
				</div>
			</header>
			<div className={styles['product__images']}>
				{product?.images.map((image) => (
					<img key={image} className={styles['product__image']} src={image} alt='image' />
				))}
			</div>
			<div className={styles['product__info']}>
				<p className={styles['product__info-text']}><span className={styles['product__span']}>Бренд: </span>{product?.brand}</p>
				<p className={styles['product__info-text']}><span className={styles['product__span']}>Описание: </span>{product?.description}</p>
				<p className={styles['product__info-text']}><span className={styles['product__span']}>Количество на складе: </span>{product?.stock}</p>
				<p className={styles['product__info-text']}><span className={styles['product__span']}>Цена: </span>{product?.price}$</p>
				<p className={styles['product__info-text']}><span className={styles['product__span']}>Рейтинг: </span>{product?.rating}</p>
			</div>
			<Button onClick={clickHandler} className={styles['product__button-cart']}>{isProductInCart()}</Button>
		</article>}
	</>
	);
}

export default Product;