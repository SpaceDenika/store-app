import styles from './Catalog.module.css';
import { useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import SearchInput from '../../components/SearchInput/SearchInput';
import ProductList from '../../components/ProductList/ProductList';
import IProduct from '../../interfaces/IProduct';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function Menu() {

	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	const getData = async () => {
		try {
			setError('');
			setIsLoading(true);
			const res = await fetch('https://dummyjson.com/products');
			const data = await res.json();
			setProducts(data.products);
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
		getData();
	}, []);

	return(
		<section className={styles['catalog']}>
			<div className={styles['catalog__container']}>
				<header className={styles['catalog__header']}>
					<Heading>Каталог</Heading>
					<SearchInput placeholder='Поиск...' />
				</header>
				{error && <ErrorMessage message={error} />}
				{isLoading && <Loader />}
				{!isLoading && <ProductList products={products} />}
			</div>
		</section>
	);
}

export default Menu;