'use client'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const getTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token')
  }
  return ''
}

const authQuery = fetchBaseQuery({
  baseUrl: 'https://auth.enotgpt.ru',
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Bearer ${getTokenFromLocalStorage()}`)

    return headers
  }
})

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://misha.enotgpt.ru',
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Bearer ${getTokenFromLocalStorage()}`)

    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshResult = await authQuery(
      {
        url: '/api/change_token',
        method: 'POST',
        body: { refresh_token: localStorage.getItem('refresh_token') }
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

export const scoresApi = createApi({
  reducerPath: 'scoresApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllScores: builder.query({
      query: () => `/scores/all`
    }),
    getUsersMe: builder.query({
      query: () => `/users/me`
    }),
    updateUserFirstName: builder.query({
      query: (firstName) => ({ url: `/users/edit/first_name?new=${firstName}` })
    }),
    updateUserLastName: builder.query({
      query: (lastName) => ({
        url: `/users/edit/last_name?new=${lastName}`
      })
    }),
    updateUserMiddleName: builder.query({
      query: (middleName) => ({
        url: `/users/edit/middle_name?new=${middleName}`
      })
    }),
    updateUserBirthDate: builder.query({
      query: (birthDate) => ({
        url: `/users/edit/birth_date?new=${birthDate}`
      })
    }),
    updateUserPhoto: builder.query({
      query: (photo) => ({
        url: `/users/edit/photo?new=${photo}`
      })
    }),
    getOperationRoles: builder.query({
      query: () => ({
        url: `/operation_roles/get`
      })
    }),
    getOffices: builder.query({
      query: () => ({
        url: `/offices/get`
      })
    }),
    addOffice: builder.mutation({
      query: (office) => ({
        url: `/offices/post`,
        method: 'POST',
        body: office
      })
    }),
    addOperationRole: builder.mutation({
      query: (operationRole) => ({
        url: `/operation_roles/add`,
        method: 'POST',
        body: operationRole
      })
    }),
    getAllReservedTickets: builder.query({
      query: () => ({
        url: `/reserved/getAll`
      })
    }),
    getOperationWindowByOfficesId: builder.query({
      query: (id) => ({
        url: `/operating_window/get?office_id=${id}`
      })
    }),
    getAllQueue: builder.query({
      query: () => ({
        url: `/queue/get_all`
      })
    }),
    addSubcategory: builder.mutation({
      query: (subcategory) => ({
        url: `/add_subcategory`,
        method: 'POST',
        body: subcategory
      })
    }),
    editActiveWindow: builder.mutation({
      query: (window) => ({
        url: `/operating_window/edit_active`,
        method: 'POST',
        body: window
      })
    }),
    addOperatingWindow: builder.mutation({
      query: (operatingWindow) => ({
        url: `/operating_window/add`,
        method: 'POST',
        body: operatingWindow
      })
    }),
    addOperatingWindowBind: builder.mutation({
      query: (operatingWindowBind) => ({
        url: `/operating_window/bind`,
        method: 'POST',
        body: operatingWindowBind
      })
    }),
    getOperationsByIndex: builder.query({
      query: (index) => ({
        url: `/offices/getOperationsByIndex?index=${index}`
      })
    }),
    editActiveRoles: builder.mutation({
      query: (activeRoles) => ({
        url: `/operating_window_roles/edit_active`,
        method: 'POST',
        body: activeRoles
      })
    }),
    longpoolRequest: builder.mutation({
      query: ({ office_id, pts }) => ({
        url: `/longpoll?office_id=${office_id}&pts=${pts}`,
        method: 'POST'
      })
    }),
    getPts: builder.query({
      query: (office_id) => ({
        url: `/get_pts?office_id=` + office_id,
        method: 'GET'
      })
    }),
    inviteToSession: builder.mutation({
      query: () => ({
        url: `/workers/invite_to_session`,
        method: 'POST'
      })
    })
  })
})

export const {
  useLongpoolRequestMutation,
  useLazyGetPtsQuery,
  useGetAllScoresQuery,
  useGetUsersMeQuery,
  useLazyUpdateUserFirstNameQuery,
  useLazyUpdateUserLastNameQuery,
  useLazyUpdateUserMiddleNameQuery,
  useLazyUpdateUserBirthDateQuery,
  useLazyUpdateUserPhotoQuery,
  useGetOperationRolesQuery,
  useGetOfficesQuery,
  useAddOfficeMutation,
  useAddOperationRoleMutation,
  useGetAllReservedTicketsQuery,
  useGetOperationWindowByOfficesIdQuery,
  useGetAllQueueQuery,
  useAddSubcategoryMutation,
  useEditActiveWindowMutation,
  useAddOperatingWindowMutation,
  useAddOperatingWindowBindMutation,
  useLazyGetOperationsByIndexQuery,
  useEditActiveRolesMutation
} = scoresApi
