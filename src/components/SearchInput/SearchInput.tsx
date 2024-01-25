import { InputHTMLAttributes } from 'react';
import styles from './SearchInput.module.css';

function SearchInput(props: InputHTMLAttributes<HTMLInputElement>) {
	return (
		<label className={styles['search']} htmlFor="search">
			<input className={styles['search__input']} id='search' type="search" {...props} />
		</label>
	);
}

export default SearchInput;