import { ReactNode, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import { useReminderAlerts } from '@/hooks/useReminderAlerts'
import Header from './Header'
import { Loading } from './ui'

/** Casca das telas internas: exige login, mostra o header e dispara alertas de lembrete. */
export default function AppLayout({ title, children }: { title: string; children: ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      void router.replace({ pathname: '/login', query: { next: router.asPath } })
    }
  }, [loading, user, router])

  useReminderAlerts(!!user)

  return (
    <>
      <Head>
        <title>{`${title} · HealthMate`}</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8">
          {loading || !user ? <Loading label="Verificando sessão…" /> : children}
        </main>
      </div>
    </>
  )
}
