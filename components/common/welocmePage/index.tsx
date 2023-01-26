//libraries
import Image from 'next/image'
import Router from 'next/router'
import { useEffect, useState } from 'react'

//RTK hooks
import { useAppDispatch } from '../../../redux/hooks'

//RTK slice
import {
  setLoginStatus,
  setConnectToLoginsSSOStatus,
} from '../../../slices/commonSlice'

const WelcomePage = () => {
  //instance
  const dispatch = useAppDispatch()
  const [showLoginStatus, setShowLoginStatus] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem('access_token')) {
        dispatch(setLoginStatus(true))
      } else {
        setShowLoginStatus(false)
      }
    }, 1000)
  }, [])

  return (
    <section className="w-screen min-h-screen bg-main bg-cover bg-repeat-none flex justify-center items-center">
      <nav className="fixed top-24">
        <Image width={120} height={120} src="/images/logo.png" alt="logo" />
      </nav>
      <main className="w-full flex flex-col justify-center items-center">
        <p
          className={`text-[20px] font-bold mt-[70px]  text-white w-[200px] text-center delay-700 duration-1000 overflow-hidden ${
            showLoginStatus ? ' opacity-100 h-[100px]' : ' opacity-0  h-0 '
          }`}
        >
          به دی‌جی‌لند اکسپرس خوش آمدید
        </p>
        <button
          onClick={() => {
            localStorage.clear()
            setTimeout(() => {
              Router.replace('/')
              localStorage.setItem('sso_status', 'true')
              dispatch(setConnectToLoginsSSOStatus('true'))
            }, 300)
          }}
          className={`text-[20px] font-normal  text-[#E10A0A] bg-white w-[156px]  rounded-[8px] flex justify-center items-center delay-1000 duration-1000 overflow-hidden ${
            showLoginStatus
              ? 'opacity-0  h-0'
              : ' opacity-100 h-[48px] -mt-[30px]'
          }`}
        >
          ورود
        </button>
      </main>
    </section>
  )
}

export default WelcomePage
