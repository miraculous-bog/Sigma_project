import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut} from '../../SignIn/authSlice';

const baseQuery = fetchBaseQuery({
baseUrl: 'http://192.168.1.12:8000',
prepareHeaders: (headers, { getState }) => {
	const token = getState()?.auth?.accessToken
	if (token) headers.set('authorization', `Bearer ${token}`)
	return headers
}
})

const baseQueryWithReauth = async (args, api, extra) => {
let result = await baseQuery(args, api, extra)

if (result?.error?.status === 401) {
	const refreshToken = api.getState()?.auth?.refreshToken
	if (!refreshToken) return result

	const refreshRes = await baseQuery(
	{ url: '/authentication/refresh', method: 'POST', body: { refresh_token: refreshToken } },
	api, extra
	)

	if (refreshRes?.data?.access_token) {
	api.dispatch(setCredentials({
		accessToken: refreshRes.data.access_token,
		refreshToken: refreshRes.data.refresh_token ?? refreshToken
	}))
	result = await baseQuery(args, api, extra)
	} else {
	api.dispatch(logOut())
	}
}
return result
}

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({})
})