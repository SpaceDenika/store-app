import { useEffect, useState } from 'react';

function useDebounce(value: string, delay=1000): string {
	const [debounced, setDebounced] = useState<string>(value);

	useEffect(() => {
		const debounceHandler = setTimeout(() => setDebounced(value), delay);

		return () => clearTimeout(debounceHandler);
	}, [value, delay]);

	return debounced;
}

export default useDebounce;