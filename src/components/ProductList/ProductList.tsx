import styles from './ProductList.module.css';
import ProductCard from '../ProductCard/ProductCard';
import { IProductList } from './ProductList.interface';

function ProductList({ products }: IProductList) {

	return (
		<ul className={styles['product-list']}>
			{products?.map(product => (
				<li className={styles['product-list__item']} key={product.id}>
					<ProductCard 
						id={product.id}
						title={product.title}
						price={product.price}
						category={product.category}
						rating={product.rating}
						image={product.images[0]}
						product={product}
					/>
				</li>
			))}
		</ul>
	);
}

export default ProductList;