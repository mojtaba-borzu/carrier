//libraries
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

//context
import { useAppDispatch } from '../../redux/hooks'
import {
  setAccessToken,
  setConnectToLoginsSSOStatus,
  setLoginStatus,
  setShowErrorPage,
} from '../../slices/commonSlice'

function Authsso() {
  //instance
  const dispatch = useAppDispatch()
  const router = useRouter()

  //context
  const { code, state } = router.query
  // const searchParams = new URLSearchParams(search);
  // const code = searchParams.get("code");
  // const state = searchParams.get("state");

  useEffect(() => {
    if (code) {
      const verifier: any = localStorage.getItem(`oidc.${state}`)
      const ver = JSON.parse(verifier)
      const config: any = {
        headers: {
          accept: '*/*',
          'CONTENT-TYPE': 'application/x-www-form-urlencoded',
          Authorization: undefined,
        },
      }

      const data: any = {
        client_id: `${process.env.NEXT_PUBLIC_SSO_CLIENT_ID}`,
        code: code,
        code_verifier: verifier && ver.code_verifier,
        redirect_uri: `${process.env.NEXT_PUBLIC_SSO_BASE_URL}`,
        grant_type: 'authorization_code',
        scope:
          'Dgland_IdentityAccess_api backoffice openid profile roles email Shopping_Prod',
      }

      const formBody: any = []
      for (const property in data) {
        const encodedKey = encodeURIComponent(property)
        const encodedValue = encodeURIComponent(data[property])
        formBody.push(encodedKey + '=' + encodedValue)
      }
      const formbodyMain = formBody.join('&')

      axios
        .post('https://oauth.dgland.tech/connect/token', formbodyMain, config)
        .then((response) => {
          localStorage.setItem('sso_status', '')
          dispatch(setConnectToLoginsSSOStatus(''))
          localStorage.setItem('access_token', response?.data?.access_token)
          dispatch(setAccessToken(localStorage.getItem('access_token')))
          dispatch(setShowErrorPage(false))
        })
        .catch((err) => dispatch(setShowErrorPage(true)))
    }
  }, [code])
  return <></>
}

export default Authsso
