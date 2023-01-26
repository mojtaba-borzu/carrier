import '../styles/globals.css'

import type { AppProps } from 'next/app'

import Head from 'next/head'
//RTK stores
import { wrapper } from '../redux/store'
import PrimaryLayout from '../layout/PrimaryLayout'

function CurrierApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>دی‌جی‌لند اکسپرس</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/icon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/icon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />

        <link rel="apple-touch-icon" href="/icons/icon-32x32.png"></link>
        <meta name="theme-color" content="#161212" />
      </Head>
      <PrimaryLayout>
        <Component {...pageProps} />
      </PrimaryLayout>
    </>
  )
}

export default wrapper.withRedux(CurrierApp)
