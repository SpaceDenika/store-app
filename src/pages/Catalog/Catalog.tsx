import styles from './Catalog.module.css';
import Heading from '../../components/Heading/Heading';
import SearchInput from '../../components/SearchInput/SearchInput';
import ProductList from '../../components/ProductList/ProductList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useGetProductsQuery } from '../../store/products/products.api';
import { useEffect, useState } from 'react';
import { IProduct } from '../../models/IProduct';

function Catalog() {
	const { data, isLoading, isError} = useGetProductsQuery('');
	const [searchValue, setSearchValue] = useState<string>('');
	const [filteredProducts, setFilteredProducts] = useState<IProduct[]>();

	const search = () => {
		const filtered = data?.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
		return filtered;
	};
  
	useEffect(() => {
		setFilteredProducts(search());
	}, [searchValue]);

	return(
		<section className={styles['catalog']}>
			<div className={styles['catalog__container']}>
				<header className={styles['catalog__header']}>
					<Heading>Каталог</Heading>
					<SearchInput placeholder='Поиск...' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
				</header>
				{isError && <ErrorMessage />}
				{isLoading && <Loader />}
				{(!isLoading && !isError) && <ProductList products={filteredProducts} />}
			</div>
		</section>
	);
}

export default Catalog;