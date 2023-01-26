//libraries
import '@reduxjs/toolkit'

//base api call
import { coreCurrierApi } from '../coreCurriersApi'

//types
import {
  GetListForCarrierPreloadInterface,
  GetListForCarrierResponseInterface,
  GetSummaryInfoResponseStatus,
  PostTrackingCodeResendPreloadInterface,
  PostTrackingCodeResendResponseInterface,
  putMarkAsDeliveredPreloadInterface,
  putMarkAsDeliveredResponseInterface,
} from './dashboardType'

const apiWithTag = coreCurrierApi.enhanceEndpoints({
  addTagTypes: ['delivered'],
})
export const dashboardApi = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    getSummaryInfo: build.query<GetSummaryInfoResponseStatus, void>({
      query() {
        return {
          url: `/Carriers/GetSummaryInfo`,
          method: 'GET',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      },
      providesTags: ['delivered'],
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   await queryFulfilled
      //     .then((res) => {
      //       console.log(res)
      //     })
      //     .catch(() => {
      //       console.log(arg)
      //       arg
      //     })
      // },
    }),
    getListForCarrier: build.query<
      GetListForCarrierResponseInterface,
      GetListForCarrierPreloadInterface
    >({
      query(params) {
        return {
          url: `/Shipments/GetListForCarrier`,
          method: 'GET',
          params: params,
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      },
      providesTags: ['delivered'],
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   await queryFulfilled
      //     .then((res) => {
      //       console.log(res)
      //     })
      //     .catch(() => {
      //       console.log(arg)
      //       arg
      //     })
      // },
    }),
    putMarkAsDelivered: build.mutation<
      putMarkAsDeliveredResponseInterface,
      putMarkAsDeliveredPreloadInterface
    >({
      query(body) {
        return {
          url: `/Shipments/MarkAsDelivered`,
          method: 'PUT',
          body: body,
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      },
      invalidatesTags: ['delivered'],

      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   await queryFulfilled
      //     .then((res) => {
      //       console.log(res)
      //     })
      //     .catch(() => {
      //       console.log(arg)
      //       arg
      //     })
      // },
    }),
    postTrackingCodeResend: build.mutation<
      PostTrackingCodeResendResponseInterface,
      PostTrackingCodeResendPreloadInterface
    >({
      query(body) {
        return {
          url: `/Shipments/TrackingCodeResend`,
          method: 'POST',
          body: body,
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      },

      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   await queryFulfilled
      //     .then((res) => {
      //       console.log(res)
      //     })
      //     .catch(() => {
      //       console.log(arg)
      //       arg
      //     })
      // },
    }),
  }),
})

export const {
  useGetSummaryInfoQuery,
  useGetListForCarrierQuery,
  usePutMarkAsDeliveredMutation,
  usePostTrackingCodeResendMutation,
} = dashboardApi
