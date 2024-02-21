import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct, ServerResponse } from '../../models/IProduct';


export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://dummyjson.com'
	}),
	endpoints: (builder) => ({
		getProductById: builder.query<IProduct, string | undefined>({
			query: (id) => `/products/${id}`,
			transformErrorResponse: (response) => response.status
		}),
		getProductByTitle: builder.query<ServerResponse, {title: string, limit: number, currentPage: number}>({
			query: ({title, limit, currentPage}) => ({
				url: '/products/search',
				params: {
					limit: limit,
					skip: (currentPage - 1) * limit,
					q: title
				}
			})
		}),
		getLimitedProducts: builder.query<ServerResponse, {limit: number, currentPage: number}>({
			query: ({limit, currentPage}) => ({
				url: '/products',
				params: {
					limit: limit,
					skip: (currentPage - 1) * limit
				}
			})
		})
	})
});

export const { useGetProductByIdQuery, useLazyGetProductByTitleQuery, useLazyGetLimitedProductsQuery } = productsApi;