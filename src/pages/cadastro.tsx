import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AuthShell from '@/components/AuthShell'
import GoogleLogin from '@/components/GoogleLogin'
import { Alert, Button, Input } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import { getErrorMessage } from '@/lib/api'
import { clean, maskPhone } from '@/lib/format'

export default function CadastroPage() {
  const { user, loading, register } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    license: '',
    password: '',
    confirm: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && user) void router.replace('/dashboard')
  }, [loading, user, router])

  const set = (field: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [field]: field === 'phone' ? maskPhone(e.target.value) : e.target.value }))

  const passwordWeak =
    form.password.length > 0 &&
    (form.password.length < 8 || !/[A-Za-z]/.test(form.password) || !/\d/.test(form.password))
  const mismatch = form.confirm.length > 0 && form.confirm !== form.password

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (passwordWeak || mismatch) return
    setError(null)
    setSubmitting(true)
    try {
      const { confirm: _confirm, ...data } = form
      await register(clean(data))
      await router.replace('/dashboard')
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell title="Criar conta">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <Alert>{error}</Alert>}
        <Input label="Nome completo" autoComplete="name" value={form.name} onChange={set('name')} required />
        <Input
          label="E-mail"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={set('email')}
          required
        />
        <Input label="Telefone" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Especialidade"
            placeholder="Ex.: Enfermagem"
            value={form.specialty}
            onChange={set('specialty')}
          />
          <Input
            label="Registro profissional"
            placeholder="Ex.: COREN-SP 123456"
            value={form.license}
            onChange={set('license')}
          />
        </div>
        <Input
          label="Senha"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={set('password')}
          hint="Mínimo de 8 caracteres, com letras e números."
          error={passwordWeak ? 'Use 8+ caracteres com letras e números.' : undefined}
          required
        />
        <Input
          label="Confirmar senha"
          type="password"
          autoComplete="new-password"
          value={form.confirm}
          onChange={set('confirm')}
          error={mismatch ? 'As senhas não conferem.' : undefined}
          required
        />
        <Button type="submit" loading={submitting} className="mt-2 w-full">
          Criar conta
        </Button>
        <p className="text-center text-sm text-gray-600">
          Já tem conta?{' '}
          <Link href="/login" className="font-medium text-brand-700 hover:underline">
            Entrar
          </Link>
        </p>
        <GoogleLogin onSuccess={() => void router.replace('/dashboard')} onError={setError} />
      </form>
    </AuthShell>
  )
}
