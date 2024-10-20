'use client'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const getTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token')
  }
  return ''
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://auth.enotgpt.ru',
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Bearer ${getTokenFromLocalStorage()}`)

    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: '/api/change_token',
        method: 'POST',
        body: { refresh_token: localStorage.getItem('refresh_token') } // Здесь можно указать тело запроса, если нужно
      },
      api,
      extraOptions
    )
    if (refreshResult.data) {
      localStorage.setItem('access_token', refreshResult.data['access_token'])

      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export const authApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUsersMe: builder.query({
      query: () => `/api/users/me`
    }),
    getDocs: builder.query({
      query: () => `/api/auth/get_code_by_email`
    }),
    loginByEmail: builder.mutation({
      query: (loginInfo) => ({
        url: `/api/auth/get_code_by_email`,
        method: 'POST',
        body: loginInfo
      })
    }),
    getUsersAll: builder.query({
      query: () => `/api/auth/get_code_by_email`
    }),
    registerByEmail: builder.mutation({
      query: (registerInfo) => ({
        url: `/api/registration_by_email`,
        method: 'POST',
        body: registerInfo
      })
    }),
    registerByEmailCodeConfirm: builder.mutation({
      query: (codeInfo) => ({
        url: `/api/registration_confirm_email`,
        method: 'POST',
        body: codeInfo
      })
    }),
    loginByEmailCodeConfirm: builder.mutation({
      query: (codeInfo) => ({
        url: `/api/auth/confirm_email`,
        method: 'POST',
        body: codeInfo
      })
    }),
    getQrCode: builder.query({
      query: () => ({
        url: `/api/auth/qr`
      })
    }),
    getQrLongpoll: builder.query({
      query: (hash) => ({
        url: `/api/qr/longpoll/${hash}`
      })
    })
  })
})

export const {
  useGetUsersMeQuery,
  useGetDocsQuery,
  useLazyGetQrCodeQuery,
  useLazyGetQrLongpollQuery,
  useLoginByEmailMutation,
  useRegisterByEmailMutation,
  useRegisterByEmailCodeConfirmMutation,
  useLoginByEmailCodeConfirmMutation
} = authApi
