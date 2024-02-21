/* eslint-disable no-mixed-spaces-and-tabs */
import styles from './Cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Heading from '../../components/Heading/Heading';
import { AppDispatch, RootState } from '../../store/store';
import CartList from '../../components/CartList/CartList';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { resetCart } from '../../store/cart/cart.slice';

function Cart() {
	const { cartProducts, totalCartPrice } = useSelector((state: RootState) => state.cart);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const clickHandler = () => {
		navigate('/success');
		dispatch(resetCart());
	};

	return(
		<section className={styles['cart']}>
			<header>
				<Heading>Корзина</Heading>
			</header>
			<CartList cartProducts={cartProducts} />
			{cartProducts.length !== 0 && 
      <div className={styles['cart__wrapper']}>
      	<div className={styles['cart__sum']}>
      		<p className={styles['cart__text']}>Итоговая сумма:</p>
      		<p className={styles['cart__price']}>{totalCartPrice}
      			<span className={styles['cart__price-span']}>$</span>
      		</p>
      	</div>
      	<Button onClick={clickHandler} large>Оформить</Button>
      </div>}
		</section>
	);
}

export default Cart;