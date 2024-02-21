import cn from 'classnames';
import Button from '../Button/Button';
import { IPagination } from './Pagination.interface';
import styles from './Pagination.module.css';


function Pagination({ pagesArray, changePage, currentPage }: IPagination ) {
	return (
		<section className={styles['pagination']}>
			<ul className={styles['pagination__container']}>
				{pagesArray.map(page => (
					<li key={page}>
						<Button onClick={() => changePage(page)} className={cn(styles['pagination__button'], {
							[styles['pagination__button_active']]: currentPage === page
						})}>{page}</Button>
					</li>
				))}
			</ul>
		</section>
	);
}

export default Pagination;