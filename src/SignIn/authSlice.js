// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload
      if (accessToken !== undefined) state.accessToken = accessToken
      if (refreshToken !== undefined) state.refreshToken = refreshToken
      if (user !== undefined) state.user = user
    },
    logOut: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
    }
  }
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.accessToken
export const selectRefreshToken = (state) => state.auth.refreshToken
