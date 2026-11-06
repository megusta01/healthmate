import { FormEvent, useState } from 'react'
import AppLayout from '@/components/AppLayout'
import { Alert, Button, Card, Input, PageHeader, TextArea } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import { api, getErrorMessage } from '@/lib/api'
import { maskPhone } from '@/lib/format'
import type { UserProfile } from '@/types/api'

export default function PerfilPage() {
  const { user } = useAuth()
  return (
    <AppLayout title="Meu perfil">
      <PageHeader title="Meu perfil" subtitle={user?.email} />
      {user && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ProfileForm user={user} />
          <PasswordForm hasPassword={user.hasPassword} />
        </div>
      )}
    </AppLayout>
  )
}

function ProfileForm({ user }: { user: UserProfile }) {
  const { setUser } = useAuth()
  const toast = useToast()
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone ?? '',
    specialty: user.professional?.specialty ?? '',
    license: user.professional?.license ?? '',
    bio: user.professional?.bio ?? '',
  })
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const set = (field: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [field]: field === 'phone' ? maskPhone(e.target.value) : e.target.value }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSaving(true)
    try {
      const { data } = await api.patch<UserProfile>('/users/me', form)
      setUser(data)
      toast('Perfil atualizado.')
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card title="Dados profissionais" className="lg:col-span-2">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {error && (
          <div className="sm:col-span-2">
            <Alert>{error}</Alert>
          </div>
        )}
        <Input label="Nome" value={form.name} onChange={set('name')} required />
        <Input label="Telefone" type="tel" value={form.phone} onChange={set('phone')} />
        <Input label="Especialidade" value={form.specialty} onChange={set('specialty')} />
        <Input label="Registro profissional" value={form.license} onChange={set('license')} />
        <TextArea
          label="Sobre você"
          wrapperClassName="sm:col-span-2"
          value={form.bio}
          maxLength={500}
          onChange={set('bio')}
        />
        <div className="flex justify-end sm:col-span-2">
          <Button type="submit" loading={saving}>
            Salvar
          </Button>
        </div>
      </form>
    </Card>
  )
}

function PasswordForm({ hasPassword }: { hasPassword: boolean }) {
  const { user, setUser } = useAuth()
  const toast = useToast()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSaving(true)
    try {
      await api.patch('/users/me/password', {
        currentPassword: hasPassword ? current : undefined,
        newPassword: next,
      })
      setCurrent('')
      setNext('')
      if (user && !user.hasPassword) setUser({ ...user, hasPassword: true })
      toast('Senha alterada.')
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card title={hasPassword ? 'Alterar senha' : 'Definir senha'}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <Alert>{error}</Alert>}
        {!hasPassword && (
          <p className="text-sm text-gray-500">
            Você entra com o Google. Defina uma senha para também poder entrar com e-mail.
          </p>
        )}
        {hasPassword && (
          <Input
            label="Senha atual"
            type="password"
            autoComplete="current-password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
          />
        )}
        <Input
          label="Nova senha"
          type="password"
          autoComplete="new-password"
          hint="Mínimo de 8 caracteres, com letras e números."
          value={next}
          onChange={(e) => setNext(e.target.value)}
          required
        />
        <Button type="submit" loading={saving} variant="secondary">
          {hasPassword ? 'Alterar senha' : 'Definir senha'}
        </Button>
      </form>
    </Card>
  )
}
