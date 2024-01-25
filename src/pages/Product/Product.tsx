import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Product.module.css';
import IProduct from '../../interfaces/IProduct';
import Heading from '../../components/Heading/Heading';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function Product() {
	const { id } = useParams();
	const [product, setProduct] = useState<IProduct>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	const getProductData = async () => {
		try {
			setIsLoading(true);
			const res = await fetch(`https://dummyjson.com/product/${id}`);
			const data = await res.json();
			setProduct(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			if (e instanceof Error){
				setError(e.message);
			}
			setIsLoading(false);
			return;
		}
	};

	useEffect(() => {
		getProductData();
	}, []);

	return (<>
		{error && <ErrorMessage message={error} />}
		{isLoading && <Loader />}
		{(!isLoading && !error) && <article className={styles['product']}>
			<div className={styles['product__container']}>
				<header className={styles['product__header']}>
					<Heading>{product?.title}</Heading>
					<p className={styles['product__category']}>{product?.category}</p>
				</header>
				<div className={styles['product__images']}>
					{product?.images.map((image, index) => (
						// Подумать на что поменять key, index не вариант
						<img key={index} className={styles['product__image']} src={image} alt='image' />
					))}
				</div>
				<div className={styles['product__info']}>
					<p className={styles['product__info-text']}><span className={styles['product__span']}>Бренд: </span>{product?.brand}</p>
					<p className={styles['product__info-text']}><span className={styles['product__span']}>Описание: </span>{product?.description}</p>
					<p className={styles['product__info-text']}><span className={styles['product__span']}>Количество на складе: </span>{product?.stock}</p>
					<p className={styles['product__info-text']}><span className={styles['product__span']}>Цена: </span>{product?.price}$</p>
					<p className={styles['product__info-text']}><span className={styles['product__span']}>Рейтинг: </span>{product?.rating}</p>
				</div>
			</div>
		</article>}
	</>
	);
}

export default Product;