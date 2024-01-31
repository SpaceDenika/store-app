import styles from './Catalog.module.css';
import Heading from '../../components/Heading/Heading';
import SearchInput from '../../components/SearchInput/SearchInput';
import ProductList from '../../components/ProductList/ProductList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useGetProductsQuery } from '../../store/products/products.api';
import { useCallback, useEffect, useState } from 'react';
import { IProduct } from '../../models/IProduct';

function Catalog() {
	const { data, isLoading, isError} = useGetProductsQuery('');
	const [searchValue, setSearchValue] = useState<string>('');
	const [filteredProducts, setFilteredProducts] = useState<IProduct[] | undefined>(data);

	const search = useCallback(() => {
		const filtered = data?.filter(item => item.title.toLowerCase().startsWith(searchValue.toLowerCase()));
		return filtered;
	}, [data, searchValue]);
  
	useEffect(() => {
		setFilteredProducts(search());
	}, [search]);

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