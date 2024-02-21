import styles from './CartList.module.css';
import CartItem from '../CartItem/CartItem';
import ICartList from './CartList.interface';

function CartList({cartProducts}: ICartList) {

	return(
		<ul className={styles['products-list']}>
			{cartProducts.length !== 0 && cartProducts.map((product) => (
				<li key={product.id} className={styles['products-list__item']}>
					<CartItem product={product}/>
				</li>
			))}
			{cartProducts.length === 0 && <p className={styles['products-list__text']}>Товары отсутствуют</p>}
		</ul>
	);
}

export default CartList;