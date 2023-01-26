import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '../redux/store'

export interface CommonState {
  accessToken: string | null
  showErrorPage: boolean
  loginStatus: boolean
  connectToLoginsSSOStatus: string
  permissions
}

const initialState: CommonState = {
  accessToken: '',
  showErrorPage: false,
  loginStatus: false,
  connectToLoginsSSOStatus: '',
  permissions: '',
}

export const layoutSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload
    },
    setShowErrorPage: (state, action: PayloadAction<boolean>) => {
      state.showErrorPage = action.payload
    },
    setLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.loginStatus = action.payload
    },
    setConnectToLoginsSSOStatus: (state, action: PayloadAction<string>) => {
      state.connectToLoginsSSOStatus = action.payload
    },
    setPermissions: (state, action: PayloadAction<string>) => {
      state.permissions = action.payload
    },
  },
})

export const {
  setPermissions,
  setAccessToken,
  setShowErrorPage,
  setLoginStatus,
  setConnectToLoginsSSOStatus,
} = layoutSlice.actions

export const selectAccessToken = (state: AppState) => state.common.accessToken
export const selectShowErrorPage = (state: AppState) =>
  state.common.showErrorPage
export const selectLoginStatus = (state: AppState) => state.common.loginStatus
export const selectConnectToLoginsSSOStatus = (state: AppState) =>
  state.common.connectToLoginsSSOStatus
export const selectPermissions = (state: AppState) => state.common.permissions

export default layoutSlice.reducer
