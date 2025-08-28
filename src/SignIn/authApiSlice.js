import { apiSlice } from '../app/api/apiSlice';
import { setCredentials } from './authSlice';
/** хелпер для x-www-form-urlencoded */
const toForm = (obj) => {
	const p = new URLSearchParams()
	Object.entries(obj).forEach(([k, v]) => p.append(k, String(v)))
	return p
  }
  
  export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
	  login: builder.mutation({
		// ЛИШЕ username і password
		query: ({ username, password }) => ({
		  url: '/authentication/login',
		  method: 'POST',
		  body: toForm({ username, password }),
		  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		}),
		async onQueryStarted(_, { dispatch, queryFulfilled }) {
		  const { data } = await queryFulfilled
		  // бекенд повертає: access_token, token_type, refresh_token
		  dispatch(setCredentials({
			accessToken: data.access_token,
			refreshToken: data.refresh_token
		  }))
		}
	  }),
  
	  refresh: builder.mutation({
		// тут як і було: JSON із refresh_token
		query: ({ refresh_token }) => ({
		  url: '/authentication/refresh',
		  method: 'POST',
		  body: { refresh_token }
		})
	  })
	})
  })
  
  export const { useLoginMutation, useRefreshMutation } = authApiSlice