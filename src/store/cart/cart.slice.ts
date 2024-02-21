import { createSlice } from '@reduxjs/toolkit';
import { ICartProduct } from '../../models/IProduct';

interface IState {
  cartProducts: ICartProduct[];
  totalCount: number;
  totalCartPrice: number;
}

const initialState: IState = {
	cartProducts: [],
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
		},
		removeProduct: (state, action) => {
			state.cartProducts = state.cartProducts.filter((item) => item.id !== action.payload.id);
		},
		increase: (state, action) => {
			const currentProduct = state.cartProducts.find((product) => product.id === action.payload.id);
			if (currentProduct) {
				currentProduct.count += 1;
			}
		},
		decrease: (state, action) => {
			const currentProduct = state.cartProducts.find((product) => product.id === action.payload.id);
			if (currentProduct) {
				currentProduct.count -= 1;
			}
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
		},
		getTotalCartPrice: (state) => {
			state.totalCartPrice = state.cartProducts.reduce((acc, product) => {
				return acc += product.totalPrice;
			}, 0);
		},
		resetCart: (state) => {
			state.cartProducts = [];
		}
	}
});

export const { addCart, getTotalCount, increase, decrease, removeProduct, getTotalProductPrice, getTotalCartPrice, resetCart } = cartSlice.actions;

export default cartSlice.reducer;