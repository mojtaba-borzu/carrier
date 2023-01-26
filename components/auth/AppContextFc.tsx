//libraries
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useLocation } from 'react-router-dom'

//components
import { AuthService } from './AuthService'

//context

//RTK hooks
import { useAppSelector } from '../../redux/hooks'

//RTK slice
import { selectAccessToken } from '../../slices/commonSlice'

function AppContextFc() {
  const router = useRouter()
  const authService = new AuthService()
  const accessToken = useAppSelector(selectAccessToken)
  const { code } = router.query

  const hasAccessToken = localStorage.getItem('access_token')

  const handleLogin = () => {
    !accessToken && authService.login()
  }

  useEffect(() => {
    if (!accessToken && !code && !hasAccessToken) {
      handleLogin()
    }
  }, [])

  return <></>
}

export default AppContextFc
