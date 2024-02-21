import { useEffect, useState } from 'react';
import { useLazyGetProductByTitleQuery, useLazyGetLimitedProductsQuery } from '../store/products/products.api';
import { IProduct } from '../models/IProduct';
import usePagination from './usePagination';

interface IUseSearchProducts {
  products: IProduct[] | undefined;
  isSearchLoading: boolean;
  isLoading: boolean;
  isError: boolean;
  pagesArray: number[];
  changePage: (page: number) => void;
  currentPage: number;
  isFetching: boolean;
  isSearchFetching: boolean;
}

function useProducts(searchValue: string, limitCount: number): IUseSearchProducts {
	const { getCountPages, setTotalPages, currentPage, limit, pagesArray, changePage, setCurrentPage } = usePagination(limitCount);
	const [getProducts, { data: initProducts, isLoading, isFetching, isError }] = useLazyGetLimitedProductsQuery();
	const [getSearchProducts, { data: searchProducts, isLoading: isSearchLoading, isFetching: isSearchFetching }] = useLazyGetProductByTitleQuery();

	const [products, setProducts] = useState<IProduct[] | undefined>([]);

	useEffect(() => {
		if (!searchValue) {
			getProducts({limit, currentPage});
		} else if (searchValue) {
			getSearchProducts({title: searchValue, limit, currentPage});
		}
	}, [searchValue, currentPage]);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchValue]);

	useEffect(() => {
		if (!searchValue && initProducts) {
			setProducts(initProducts.products);
			setTotalPages(getCountPages(limit, initProducts.total));
		} else if (searchValue && searchProducts) {
			setProducts(searchProducts.products);
			setTotalPages(getCountPages(limit, searchProducts.total));
		}
	}, [initProducts, searchValue, searchProducts, currentPage]);
		
	return {
		products,
		isSearchLoading,
		isLoading,
		isError,
		pagesArray,
		changePage,
		currentPage,
		isFetching,
		isSearchFetching
	};
}

export default useProducts;