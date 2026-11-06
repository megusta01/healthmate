import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faPause } from '@fortawesome/free-solid-svg-icons'
import AppLayout from '@/components/AppLayout'
import { Alert, Badge, Button, EmptyState, Loading, PageHeader } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import { useApi } from '@/hooks/useApi'
import { api, getErrorMessage } from '@/lib/api'
import { nowTime } from '@/lib/format'
import type { TodayReminder } from '@/types/api'

type Permission = NotificationPermission | 'unsupported'

export default function NotificacoesPage() {
  const { user } = useAuth()
  const toast = useToast()
  const { data, loading, error, reload } = useApi<TodayReminder[]>(user ? '/reminders/today' : null)
  const [now, setNow] = useState(nowTime)
  const [permission, setPermission] = useState<Permission>('default')

  useEffect(() => {
    setPermission('Notification' in window ? Notification.permission : 'unsupported')
    const t = setInterval(() => setNow(nowTime()), 30_000)
    return () => clearInterval(t)
  }, [])

  async function pause(r: TodayReminder) {
    try {
      await api.patch(`/reminders/${r.id}`, { isActive: false })
      toast(`Lembrete das ${r.time} pausado. Reative na ficha do paciente.`)
      await reload()
    } catch (err) {
      toast(getErrorMessage(err), 'error')
    }
  }

  // agrupa por horário
  const groups = new Map<string, TodayReminder[]>()
  data?.forEach((r) => groups.set(r.time, [...(groups.get(r.time) ?? []), r]))
  const nextTime = [...groups.keys()].find((t) => t >= now)

  return (
    <AppLayout title="Notificações">
      <PageHeader
        title="Agenda de hoje"
        subtitle="Todos os horários de medicação dos seus pacientes"
        action={
          permission === 'default' && (
            <Button
              variant="secondary"
              onClick={async () => setPermission(await Notification.requestPermission())}
            >
              <FontAwesomeIcon icon={faBell} /> Ativar alertas no navegador
            </Button>
          )
        }
      />

      {permission === 'granted' && (
        <div className="mb-4">
          <Alert tone="info">
            Alertas ativos: com o HealthMate aberto, você recebe uma notificação no horário de cada
            medicação.
          </Alert>
        </div>
      )}
      {permission === 'denied' && (
        <div className="mb-4">
          <Alert tone="info">
            As notificações estão bloqueadas neste navegador. Libere nas configurações do site para
            receber alertas.
          </Alert>
        </div>
      )}

      {error && <Alert>{error}</Alert>}
      {loading && !data && <Loading />}

      {data && data.length === 0 && (
        <EmptyState title="Nenhum lembrete ativo">
          Adicione horários aos medicamentos na ficha de cada paciente.
        </EmptyState>
      )}

      {data && data.length > 0 && (
        <ol className="flex flex-col gap-3">
          {[...groups.entries()].map(([time, items]) => {
            const past = time < now
            const isNext = time === nextTime
            return (
              <li
                key={time}
                className={`flex gap-4 rounded-xl border bg-white p-4 shadow-sm ${
                  isNext ? 'border-brand-500 ring-1 ring-brand-500' : 'border-gray-200'
                } ${past ? 'opacity-60' : ''}`}
              >
                <div className="w-20 shrink-0">
                  <p className="font-mono text-xl font-bold text-gray-900">{time}</p>
                  {isNext && <Badge color="green">Próximo</Badge>}
                  {past && <Badge>Passou</Badge>}
                </div>
                <ul className="flex flex-1 flex-col divide-y divide-gray-100">
                  {items.map((r) => (
                    <li key={r.id} className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900">
                          {r.medicament.name}
                          {r.medicament.dosage && (
                            <span className="font-normal text-gray-500"> · {r.medicament.dosage}</span>
                          )}
                        </p>
                        <p className="text-sm text-gray-600">
                          <Link
                            href={`/pacientes/${r.medicament.patient.id}`}
                            className="hover:text-brand-700 hover:underline"
                          >
                            {r.medicament.patient.name}
                          </Link>
                          {r.medicament.patient.phone && (
                            <a
                              href={`tel:${r.medicament.patient.phone.replace(/\D/g, '')}`}
                              className="ml-2 text-gray-400 hover:text-brand-700"
                            >
                              {r.medicament.patient.phone}
                            </a>
                          )}
                        </p>
                        {r.message && <p className="mt-0.5 text-xs text-gray-500">{r.message}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        {r.medicament.quantity === 0 && <Badge color="red">Sem estoque</Badge>}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => void pause(r)}
                          title="Pausar este lembrete"
                          aria-label={`Pausar lembrete de ${r.medicament.name} às ${r.time}`}
                        >
                          <FontAwesomeIcon icon={faPause} className="h-3 w-3" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ol>
      )}
    </AppLayout>
  )
}
