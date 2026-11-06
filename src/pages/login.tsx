import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AuthShell from '@/components/AuthShell'
import GoogleLogin from '@/components/GoogleLogin'
import { Alert, Button, Input } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import { getErrorMessage } from '@/lib/api'

/** Só aceita caminhos internos no ?next= (evita redirecionamento aberto). */
function safeNext(next: unknown) {
  return typeof next === 'string' && next.startsWith('/') && !next.startsWith('//')
    ? next
    : '/dashboard'
}

export default function LoginPage() {
  const { user, loading, login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const goNext = () => router.replace(safeNext(router.query.next))

  useEffect(() => {
    if (!loading && user) void router.replace(safeNext(router.query.next))
  }, [loading, user, router])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(email, password)
      await goNext()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell title="Entrar">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {error && <Alert>{error}</Alert>}
        <Input
          label="E-mail"
          type="email"
          autoComplete="email"
          placeholder="voce@clinica.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Senha"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" loading={submitting} className="mt-2 w-full">
          Entrar
        </Button>
        <p className="text-center text-sm text-gray-600">
          Ainda não tem conta?{' '}
          <Link href="/cadastro" className="font-medium text-brand-700 hover:underline">
            Cadastre-se
          </Link>
        </p>
        <GoogleLogin onSuccess={goNext} onError={setError} />
      </form>
    </AuthShell>
  )
}
