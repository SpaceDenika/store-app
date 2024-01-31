import styles from './Catalog.module.css';
import Heading from '../../components/Heading/Heading';
import SearchInput from '../../components/SearchInput/SearchInput';
import ProductList from '../../components/ProductList/ProductList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useGetProductsQuery } from '../../store/products/products.api';

function Catalog() {
	const { data, isLoading, isError } = useGetProductsQuery('');

	return(
		<section className={styles['catalog']}>
			<div className={styles['catalog__container']}>
				<header className={styles['catalog__header']}>
					<Heading>Каталог</Heading>
					<SearchInput placeholder='Поиск...' />
				</header>
				{isError && <ErrorMessage />}
				{isLoading && <Loader />}
				{(!isLoading && !isError) && <ProductList products={data} />}
			</div>
		</section>
	);
}

export default Catalog;