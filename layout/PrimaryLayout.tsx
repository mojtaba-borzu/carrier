//libraries
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'

//oath dynamic import
const Authsso = dynamic(() => import('../components/auth/Authsso'), {
  ssr: false,
})
const AppContextFc = dynamic(() => import('../components/auth/AppContextFc'), {
  ssr: false,
})

//components
import ErrorPage from '../components/auth/error/ErrorPage'

//RTK slice
import {
  setAccessToken,
  setPermissions,
  setShowErrorPage,
  selectLoginStatus,
  selectAccessToken,
  selectPermissions,
  selectShowErrorPage,
  setConnectToLoginsSSOStatus,
  selectConnectToLoginsSSOStatus,
} from '../slices/commonSlice'

//RTK hooks
import { useAppDispatch, useAppSelector } from '../redux/hooks'

import WelcomePage from '../components/common/welocmePage'
import { ToastContainer } from 'react-toastify'

import axios from 'axios'
import NavBar from '../components/shipment/NavBar'

function PrimaryLayout({ children }) {
  //instance

  const dispatch = useAppDispatch()

  //selectors
  const loginStatus = useAppSelector(selectLoginStatus)
  const accessToken = useAppSelector(selectAccessToken)
  const showErrorPage = useAppSelector(selectShowErrorPage)
  const connectToLoginsSSOStatus = useAppSelector(
    selectConnectToLoginsSSOStatus
  )
  const permissions = useAppSelector(selectPermissions)

  useEffect(() => {
    dispatch(setConnectToLoginsSSOStatus(localStorage.getItem('sso_status')))
    dispatch(setAccessToken(localStorage.getItem('access_token')))
  }, [])

  useEffect(() => {
    if (accessToken) {
      const config = {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
      }
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_IDENTITY_URL}/api/Users/Permissions`,
          config
        )
        .then((response) => {
          dispatch(setPermissions(response?.data?.data))
          dispatch(setShowErrorPage(false))
        })
        .catch((err) => {
          dispatch(setShowErrorPage(true))
          dispatch(setPermissions())
        })
    }
  }, [accessToken])

  return (
    <div className="w-full min-h-screen">
      {connectToLoginsSSOStatus && (
        <>
          {!accessToken && <AppContextFc />}
          {!accessToken && <Authsso />}
        </>
      )}
      {showErrorPage && <ErrorPage />}
      {loginStatus ? (
        !connectToLoginsSSOStatus &&
        accessToken &&
        !showErrorPage &&
        permissions &&
        permissions[0] &&
        (permissions?.find((item) => item.name == 'Express')?.id ? (
          <div className="w-fill h-full">{children}</div>
        ) : (
          <div className="w-full flex justify-center">
            <div
              dir="rtl"
              className="w-full max-w-[768px] flex flex-col justify-start items-center p-[50px] gap-[100px]"
            >
              <NavBar />
              <div className="text-[18px] font-semibold text-red-500 text-center">
                با این اکانت امکان دسترسی به اطلاعات وجود ندارد
              </div>
            </div>
          </div>
        ))
      ) : (
        <WelcomePage />
      )}
      {/* <div className="w-fill h-full">{children}</div> */}
      <ToastContainer />
    </div>
  )
}

export default PrimaryLayout
