import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { setAccessToken } from '../slices/commonSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_CORE_BASE_URL}`,
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    localStorage.clear()
    location.reload()
    // try to get a new token
    // const refreshResult = await baseQuery('/refresh', api, extraOptions)
    // if (refreshResult.data) {
    //   console.log('refreshResult', refreshResult)
    //   // store the new token
    //   api.dispatch(setAccessToken(refreshResult.data as string))
    //   // retry the initial query
    //   result = await baseQuery(args, api, extraOptions)
    // } else {
    //   api.dispatch(setAccessToken(''))
    // }
  }
  return result
}

export const coreCurrierApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})

// import { HYDRATE } from 'next-redux-wrapper'
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// export const coreCurrierApi = createApi({
//   extractRehydrationInfo(action, { reducerPath }) {
//     if (action.type === HYDRATE) {
//       return action.payload[reducerPath]
//     }
//   },

//   baseQuery: fetchBaseQuery({
//     baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_CORE_BASE_URL}`,
//   }),
//   endpoints: () => ({}),
// })
