import styles from './Catalog.module.css';
import Heading from '../../components/Heading/Heading';
import SearchInput from '../../components/SearchInput/SearchInput';
import ProductList from '../../components/ProductList/ProductList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import useProducts from '../../hooks/useProducts';
import Pagination from '../../components/Pagination/Pagination';

const LIMIT_COUNT = 30;
const DELAY_COUNT = 500;

function Catalog() {
	const [searchValue, setSearchValue] = useState<string>('');
	const debouncedSearchValue = useDebounce(searchValue, DELAY_COUNT);
	const { products, pagesArray, changePage, isLoading, isSearchLoading, isError, currentPage, isFetching, isSearchFetching } = useProducts(debouncedSearchValue, LIMIT_COUNT);

	return(
		<section className={styles['catalog']}>
			<header className={styles['catalog__header']}>
				<Heading>Каталог</Heading>
				<SearchInput placeholder='Поиск...' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
			</header>
			{isError && <ErrorMessage />}
			{(isLoading || isSearchLoading || isFetching || isSearchFetching) && <Loader />}
			{(!isLoading && !isSearchLoading && !isError && !isFetching && !isSearchFetching) && <ProductList products={products} />}
			{(products?.length === 0 && !isFetching && !isSearchFetching) && <p>Ничего не найдено...</p>}
			{(pagesArray.length >= 1 && !isFetching && !isSearchFetching) && <Pagination currentPage={currentPage} changePage={changePage} pagesArray={pagesArray} />}
		</section>
	);
}

export default Catalog;