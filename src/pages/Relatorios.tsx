import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPrint } from '@fortawesome/free-solid-svg-icons'
import AppLayout from '@/components/AppLayout'
import { Alert, Button, EmptyState, Loading, PageHeader, Pagination } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import { useApi, useDebounced } from '@/hooks/useApi'
import { formatDateTime } from '@/lib/format'
import type { Assessment, Paginated } from '@/types/api'

export default function RelatoriosPage() {
  const { user } = useAuth()
  const router = useRouter()
  const patientId = typeof router.query.paciente === 'string' ? router.query.paciente : undefined
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const q = useDebounced(search)

  useEffect(() => setPage(1), [q, patientId])

  const { data, loading, error } = useApi<Paginated<Assessment>>(user ? '/assessments' : null, {
    q: q || undefined,
    patientId,
    page,
    limit: 20,
  })

  const patientName = patientId ? data?.data[0]?.patient?.name : undefined

  return (
    <AppLayout title="Relatórios">
      <PageHeader
        title={patientName ? `Relatório — ${patientName}` : 'Relatórios'}
        subtitle="Histórico de avaliações de saúde registradas"
        action={
          <Button variant="secondary" onClick={() => window.print()} className="print:hidden">
            <FontAwesomeIcon icon={faPrint} /> Imprimir / PDF
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3 print:hidden">
        <div className="relative w-full max-w-md">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            placeholder="Buscar por paciente, sintoma ou observação…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            aria-label="Buscar avaliações"
          />
        </div>
        {patientId && (
          <Link href="/relatorios" className="text-sm text-brand-700 hover:underline">
            Ver todos os pacientes
          </Link>
        )}
      </div>

      {error && <Alert>{error}</Alert>}
      {loading && !data && <Loading />}

      {data && data.data.length === 0 && (
        <EmptyState title="Nenhuma avaliação encontrada">
          Registre avaliações na ficha de cada paciente.
        </EmptyState>
      )}

      {data && data.data.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm print:border-0 print:shadow-none">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="w-40 px-5 py-3">Data</th>
                <th className="w-48 px-5 py-3">Paciente</th>
                <th className="px-5 py-3">Avaliação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 align-top">
              {data.data.map((a) => (
                <tr key={a.id} className="break-inside-avoid">
                  <td className="px-5 py-3 text-gray-600">
                    {formatDateTime(a.createdAt)}
                    {a.professional && (
                      <span className="block text-xs text-gray-400">{a.professional.user.name}</span>
                    )}
                  </td>
                  <td className="px-5 py-3 font-medium">
                    <Link href={`/pacientes/${a.patientId}`} className="text-gray-900 hover:text-brand-700">
                      {a.patient?.name}
                    </Link>
                  </td>
                  <td className="space-y-1 px-5 py-3 text-gray-700">
                    {a.symptoms && (
                      <p>
                        <span className="font-medium">Sintomas:</span> {a.symptoms}
                      </p>
                    )}
                    {a.sideEffects && (
                      <p>
                        <span className="font-medium">Efeitos colaterais:</span> {a.sideEffects}
                      </p>
                    )}
                    {a.observations && (
                      <p>
                        <span className="font-medium">Observações:</span> {a.observations}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data && (
        <div className="print:hidden">
          <Pagination page={data.meta.page} totalPages={data.meta.totalPages} onChange={setPage} />
        </div>
      )}
    </AppLayout>
  )
}
