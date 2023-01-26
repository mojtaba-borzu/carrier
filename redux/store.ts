import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'

//wrapper
import { createWrapper } from 'next-redux-wrapper'

//api call
import { coreCurrierApi } from '../service/coreCurriersApi'

//slice
import commonReducer from '../slices/commonSlice'

const rootReducer = combineReducers({
  [coreCurrierApi.reducerPath]: coreCurrierApi.reducer,

  common: commonReducer,
})

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (gDM) => gDM().concat(coreCurrierApi.middleware),
  })

const store = makeStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false })
