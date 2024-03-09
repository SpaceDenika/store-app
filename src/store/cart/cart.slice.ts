import { createSlice } from '@reduxjs/toolkit';
import { ICartProduct } from '../../models/IProduct';

interface IState {
  cartProducts: ICartProduct[];
  totalCount: number;
  totalCartPrice: number;
}

const initialState: IState = {
	cartProducts: JSON.parse(localStorage.getItem('cart') as string) ?? [],
	totalCount: 0,
	totalCartPrice: 0
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addCart: (state, action) => {
			if (!state.cartProducts.find((product) => product.id === action.payload.id)) {
				state.cartProducts.push({...action.payload, count: 1});
			} else {
				state.cartProducts.map((product) => {
					if (product.id === action.payload.id) {
						product.count += 1;
						product.price;
					}
				});
			}
			localStorage.setItem('cart', JSON.stringify(state.cartProducts));
		},
		removeProduct: (state, action) => {
			state.cartProducts = state.cartProducts.filter((item) => item.id !== action.payload.id);
			localStorage.setItem('cart', JSON.stringify(state.cartProducts));
		},
		increase: (state, action) => {
			const currentProduct = state.cartProducts.find((product) => product.id === action.payload.id);
			if (currentProduct) {
				currentProduct.count += 1;
				localStorage.setItem('cart', JSON.stringify(state.cartProducts));
			}
		},
		decrease: (state, action) => {
			const currentProduct = state.cartProducts.find((product) => product.id === action.payload.id);
			if (currentProduct) {
				currentProduct.count -= 1;
			}
			localStorage.setItem('cart', JSON.stringify(state.cartProducts));
		},
		getTotalCount: (state) => {
			state.totalCount = state.cartProducts.reduce((acc, product) => {
				return acc += product.count;
			}, 0);
		},
		getTotalProductPrice: (state) => {
			state.cartProducts.map((product) => {
				product.totalPrice = product.price * product.count;
			});
			localStorage.setItem('cart', JSON.stringify(state.cartProducts));
		},
		getTotalCartPrice: (state) => {
			state.totalCartPrice = state.cartProducts.reduce((acc, product) => {
				return acc += product.totalPrice;
			}, 0);
		},
		resetCart: (state) => {
			state.cartProducts = [];
			localStorage.removeItem('cart');
		}
	}
});

export const { addCart, getTotalCount, increase, decrease, removeProduct, getTotalProductPrice, getTotalCartPrice, resetCart } = cartSlice.actions;

export default cartSlice.reducer;