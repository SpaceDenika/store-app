import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct, ServerResponse } from '../../models/IProduct';


export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://dummyjson.com'
	}),
	endpoints: (builder) => ({
		getProducts: builder.query<IProduct[], string>({
			query: () => '/products',
			transformResponse: (response: ServerResponse) => response.products,
			transformErrorResponse: (response) => response.status
		}),
		getProductById: builder.query<IProduct, string | undefined>({
			query: (id) => `/products/${id}`,
			transformErrorResponse: (response) => response.status
		}),
		getProductByTitle: builder.query<IProduct[], string>({
			query: (title) => `/products/search?limit=100&q=${title}`,
			transformResponse: (response: ServerResponse) => response.products
		})
	})
});

export const { useGetProductsQuery, useGetProductByIdQuery, useLazyGetProductByTitleQuery } = productsApi;