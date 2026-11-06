import '@/styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { ToastProvider } from '@/contexts/ToastContext'

// o CSS do FontAwesome é importado acima (evita ícones gigantes no primeiro render)
config.autoAddCss = false

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

export default function App({ Component, pageProps }: AppProps) {
  const app = (
    <AuthProvider>
      <ToastProvider>
        <Head>
          <title>HealthMate</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </ToastProvider>
    </AuthProvider>
  )

  return GOOGLE_CLIENT_ID ? (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>{app}</GoogleOAuthProvider>
  ) : (
    app
  )
}
