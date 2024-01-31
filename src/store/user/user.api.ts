import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProfile } from '../../models/IProfile';


export const userApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://purpleschool.ru/pizza-api-demo'
	}),
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (body) => ({
				url: '/auth/register',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			})
		}),
		login: builder.mutation({
			query: (body) => ({
				url: '/auth/login',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			})
		}),
		getProfile: builder.query<IProfile, string | null>({
			query: (jwt) => ({
				url: '/user/profile',
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			})
		})
	})
});

export const { useRegisterMutation, useLazyGetProfileQuery, useLoginMutation } = userApi;