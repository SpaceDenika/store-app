import { useEffect, useState } from 'react';

function usePagination(limitCount: number) {
	const [limit, setLimit] = useState<number>(limitCount);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [pagesArray, setPagesArray] = useState<number[]>([]);

	useEffect(() => {
		setPagesArray(Array.from({length: totalPages}, (_, index) => index + 1));
	}, [totalPages]);

	const getCountPages = (limit: number, totalCount: number): number => {
		return Math.ceil(totalCount / limit);
	};

	const changePage = (page: number): void => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	return {
		limit,
		setLimit,
		currentPage,
		setCurrentPage,
		totalPages,
		setTotalPages,
		pagesArray,
		getCountPages,
		changePage
	};
}

export default usePagination;