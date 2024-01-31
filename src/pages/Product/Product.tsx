import { useParams } from 'react-router-dom';
import styles from './Product.module.css';
import Heading from '../../components/Heading/Heading';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useGetProductByIdQuery } from '../../store/products/products.api';

function Product() {
	const { id } = useParams();

	const { data, isError, isLoading, error } = useGetProductByIdQuery(id);

	return (<>
		{isError && <ErrorMessage message={error} />}
		{isLoading && <Loader />}
		{(!isLoading && !isError) && <article className={styles['product']}>
			<div className={styles['product__container']}>
				<header className={styles['product__header']}>
					<Heading>{data?.title}</Heading>
					<p className={styles['product__category']}>{data?.category}</p>
				</header>
				<div className={styles['product__images']}>
					{data?.images.map((image, index) => (
						// Подумать на что поменять key, index не вариант
						<img key={index} className={styles['product__image']} src={image} alt='image' />
					))}
				</div>
				<div className={styles['product__info']}>
					<p className={styles['product__info-text']}><span className={styles['product__span']}>Бренд: </span>{data?.brand}</p>
					<p className={styles['product__info-text']}><span className={styles['product__span']}>Описание: </span>{data?.description}</p>
					<p className={styles['product__info-text']}><span className={styles['product__span']}>Количество на складе: </span>{data?.stock}</p>
					<p className={styles['product__info-text']}><span className={styles['product__span']}>Цена: </span>{data?.price}$</p>
					<p className={styles['product__info-text']}><span className={styles['product__span']}>Рейтинг: </span>{data?.rating}</p>
				</div>
			</div>
		</article>}
	</>
	);
}

export default Product;