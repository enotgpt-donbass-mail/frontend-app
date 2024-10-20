'use client'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import { authApi } from '../api/AuthApi'
import { scoresApi } from '../api/MainApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    authReducer,
    [scoresApi.reducerPath]: scoresApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, scoresApi.middleware])
})

setupListeners(store.dispatch)

export const useAuthStore = () => store.getState().authReducer
