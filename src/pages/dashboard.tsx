import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell,
  faBoxOpen,
  faPills,
  faUsers,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import AppLayout from '@/components/AppLayout'
import { Alert, Badge, Card, EmptyState, Loading, PageHeader } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import { useApi } from '@/hooks/useApi'
import { ageFrom, formatDateTime, nowTime } from '@/lib/format'
import type { DashboardSummary } from '@/types/api'

function Stat({
  icon,
  label,
  value,
  href,
  tone = 'brand',
}: {
  icon: IconDefinition
  label: string
  value: number
  href: string
  tone?: 'brand' | 'amber'
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand-500/50 hover:shadow sm:flex-row sm:items-center sm:gap-4 sm:p-5"
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-lg ${
          tone === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-brand-50 text-brand-700'
        }`}
      >
        <FontAwesomeIcon icon={icon} className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-2xl font-bold text-gray-900">{value}</span>
        <span className="text-sm text-gray-500">{label}</span>
      </span>
    </Link>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { data, loading, error } = useApi<DashboardSummary>(user ? '/dashboard' : null)

  const now = nowTime()
  const upcoming = data?.reminders.filter((r) => r.time >= now).slice(0, 6) ?? []
  // ignora títulos (Dr., Dra., Sr.) na saudação
  const firstName = user?.name.split(/\s+/).find((w) => !w.endsWith('.')) ?? user?.name

  return (
    <AppLayout title="Dashboard">
      <PageHeader
        title={`Olá, ${firstName ?? ''}!`}
        subtitle={new Date().toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })}
      />

      {error && <Alert>{error}</Alert>}
      {loading && !data && <Loading />}

      {data && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            <Stat icon={faUsers} label="Pacientes" value={data.totals.patients} href="/pacientes" />
            <Stat
              icon={faPills}
              label="Medicamentos em uso"
              value={data.totals.activeMedicaments}
              href="/pacientes"
            />
            <Stat
              icon={faBell}
              label="Lembretes hoje"
              value={data.totals.remindersToday}
              href="/notificacoes"
            />
            <Stat
              icon={faBoxOpen}
              label="Estoque baixo"
              value={data.totals.lowStock}
              href="#estoque"
              tone={data.totals.lowStock ? 'amber' : 'brand'}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card
              title="Próximos lembretes"
              action={
                <Link href="/notificacoes" className="text-sm font-medium text-brand-700 hover:underline">
                  Ver agenda
                </Link>
              }
            >
              {upcoming.length === 0 ? (
                <EmptyState title="Nenhum lembrete pelo resto do dia" />
              ) : (
                <ul className="divide-y divide-gray-100">
                  {upcoming.map((r) => (
                    <li key={r.id} className="flex items-center gap-4 py-2.5">
                      <span className="w-14 font-mono text-sm font-semibold text-brand-700">{r.time}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-gray-900">
                          {r.medicament.name}
                          {r.medicament.dosage && (
                            <span className="font-normal text-gray-500"> · {r.medicament.dosage}</span>
                          )}
                        </span>
                        <Link
                          href={`/pacientes/${r.medicament.patient.id}`}
                          className="truncate text-xs text-gray-500 hover:text-brand-700"
                        >
                          {r.medicament.patient.name}
                        </Link>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card
              title="Pacientes recentes"
              action={
                <Link href="/pacientes" className="text-sm font-medium text-brand-700 hover:underline">
                  Ver todos
                </Link>
              }
            >
              {data.recentPatients.length === 0 ? (
                <EmptyState title="Nenhum paciente ainda">
                  <Link href="/pacientes?novo=1" className="font-medium text-brand-700 hover:underline">
                    Cadastrar o primeiro paciente
                  </Link>
                </EmptyState>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {data.recentPatients.map((p) => {
                    const age = ageFrom(p.birthDate)
                    return (
                      <li key={p.id}>
                        <Link
                          href={`/pacientes/${p.id}`}
                          className="flex items-center justify-between py-2.5 text-sm hover:text-brand-700"
                        >
                          <span className="font-medium">{p.name}</span>
                          <span className="text-gray-500">{age !== null ? `${age} anos` : ''}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </Card>

            <div id="estoque">
              <Card title="Estoque baixo — hora de recomprar">
                {data.lowStockMedicaments.length === 0 ? (
                  <EmptyState title="Estoques em dia" />
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {data.lowStockMedicaments.map((m) => (
                      <li key={m.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                        <span className="min-w-0">
                          <span className="block truncate font-medium text-gray-900">
                            {m.name} {m.dosage && <span className="font-normal text-gray-500">· {m.dosage}</span>}
                          </span>
                          <Link
                            href={`/pacientes/${m.patient.id}`}
                            className="text-xs text-gray-500 hover:text-brand-700"
                          >
                            {m.patient.name}
                          </Link>
                        </span>
                        <Badge color={m.quantity === 0 ? 'red' : 'amber'}>
                          {m.quantity === 0 ? 'Esgotado' : `${m.quantity} restantes`}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </div>

            <Card
              title="Avaliações recentes"
              action={
                <Link href="/relatorios" className="text-sm font-medium text-brand-700 hover:underline">
                  Relatórios
                </Link>
              }
            >
              {data.recentAssessments.length === 0 ? (
                <EmptyState title="Nenhuma avaliação registrada" />
              ) : (
                <ul className="divide-y divide-gray-100">
                  {data.recentAssessments.map((a) => (
                    <li key={a.id} className="py-2.5 text-sm">
                      <div className="flex items-center justify-between gap-3">
                        <Link
                          href={`/pacientes/${a.patientId}`}
                          className="font-medium text-gray-900 hover:text-brand-700"
                        >
                          {a.patient?.name}
                        </Link>
                        <span className="text-xs text-gray-500">{formatDateTime(a.createdAt)}</span>
                      </div>
                      <p className="mt-0.5 line-clamp-1 text-gray-600">
                        {a.symptoms || a.sideEffects || a.observations}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
