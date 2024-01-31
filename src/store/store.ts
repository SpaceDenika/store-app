import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './products/products.api';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import userReducer from './user/user.slice';
import { userApi } from './user/user.api';


export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		user: userReducer,
		[userApi.reducerPath]: userApi.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware, userApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);