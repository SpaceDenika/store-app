import styles from './Catalog.module.css';
import Heading from '../../components/Heading/Heading';
import SearchInput from '../../components/SearchInput/SearchInput';
import ProductList from '../../components/ProductList/ProductList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useGetProductsQuery, useLazyGetProductByTitleQuery } from '../../store/products/products.api';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { IProduct } from '../../models/IProduct';

function Catalog() {
	const { data, isLoading, isError } = useGetProductsQuery('');
	const [searchByTitle, { data: result, isLoading: isSearchLoading }] = useLazyGetProductByTitleQuery();
	const [searchValue, setSearchValue] = useState<string>('');
	const debouncedSearchValue = useDebounce(searchValue, 500);
	const [filteredProducts, setFilteredProducts] = useState<IProduct[] | undefined>(data);

	useEffect(() => {
		if (debouncedSearchValue.length >= 1) {
			searchByTitle(debouncedSearchValue);
			setFilteredProducts(result);
		} else {
			setFilteredProducts(data);
		}
	}, [debouncedSearchValue, data, result, searchByTitle]);

	return(
		<section className={styles['catalog']}>
			<div className={styles['catalog__container']}>
				<header className={styles['catalog__header']}>
					<Heading>Каталог</Heading>
					<SearchInput placeholder='Поиск...' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
				</header>
				{isError && <ErrorMessage />}
				{(isLoading || isSearchLoading) && <Loader />}
				{(!isLoading && !isError) && <ProductList products={filteredProducts} />}
				{filteredProducts?.length === 0 && <p>Ничего не найдено...</p>}
			</div>
		</section>
	);
}

export default Catalog;