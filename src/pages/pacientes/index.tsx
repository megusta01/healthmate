import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import AppLayout from '@/components/AppLayout'
import PatientForm from '@/components/forms/PatientForm'
import Modal from '@/components/Modal'
import { Alert, Badge, Button, EmptyState, Loading, PageHeader, Pagination } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import { useApi, useDebounced } from '@/hooks/useApi'
import { ageFrom, GENDER_LABEL } from '@/lib/format'
import type { Paginated, PatientListItem } from '@/types/api'

export default function PacientesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const toast = useToast()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [creating, setCreating] = useState(false)
  const q = useDebounced(search)

  // atalho vindo do dashboard: /pacientes?novo=1
  useEffect(() => {
    if (router.query.novo) setCreating(true)
  }, [router.query.novo])

  useEffect(() => setPage(1), [q])

  const { data, loading, error } = useApi<Paginated<PatientListItem>>(user ? '/patients' : null, {
    q: q || undefined,
    page,
    limit: 15,
  })

  return (
    <AppLayout title="Pacientes">
      <PageHeader
        title="Pacientes"
        subtitle={data ? `${data.meta.total} paciente(s) acompanhados` : undefined}
        action={
          <Button onClick={() => setCreating(true)}>
            <FontAwesomeIcon icon={faUserPlus} /> Novo paciente
          </Button>
        }
      />

      <div className="relative mb-4 max-w-md">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        />
        <input
          type="search"
          placeholder="Buscar por nome, e-mail ou telefone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          aria-label="Buscar pacientes"
        />
      </div>

      {error && <Alert>{error}</Alert>}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {loading && !data ? (
          <Loading />
        ) : data && data.data.length === 0 ? (
          <div className="p-6">
            <EmptyState title={q ? 'Nenhum paciente encontrado' : 'Você ainda não tem pacientes'}>
              {!q && 'Clique em “Novo paciente” para começar.'}
            </EmptyState>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-3">Nome</th>
                  <th className="px-5 py-3">Idade</th>
                  <th className="hidden px-5 py-3 sm:table-cell">Sexo</th>
                  <th className="hidden px-5 py-3 md:table-cell">Contato</th>
                  <th className="px-5 py-3">Medicamentos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data?.data.map((p) => {
                  const age = ageFrom(p.birthDate)
                  return (
                    <tr
                      key={p.id}
                      className="cursor-pointer hover:bg-brand-50/40"
                      onClick={() => void router.push(`/pacientes/${p.id}`)}
                    >
                      <td className="px-5 py-3 font-medium text-gray-900">
                        <Link href={`/pacientes/${p.id}`} onClick={(e) => e.stopPropagation()}>
                          {p.name}
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-gray-600">{age !== null ? `${age} anos` : '—'}</td>
                      <td className="hidden px-5 py-3 text-gray-600 sm:table-cell">
                        {p.gender ? GENDER_LABEL[p.gender] : '—'}
                      </td>
                      <td className="hidden px-5 py-3 text-gray-600 md:table-cell">
                        {p.phone || p.email || '—'}
                      </td>
                      <td className="px-5 py-3">
                        {p.activeMedicaments > 0 ? (
                          <Badge color="green">{p.activeMedicaments} em uso</Badge>
                        ) : (
                          <Badge>nenhum</Badge>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {data && (
        <Pagination page={data.meta.page} totalPages={data.meta.totalPages} onChange={setPage} />
      )}

      <Modal open={creating} onClose={() => setCreating(false)} title="Novo paciente" size="lg">
        <PatientForm
          onCancel={() => setCreating(false)}
          onSaved={(patient) => {
            setCreating(false)
            toast('Paciente cadastrado!')
            void router.push(`/pacientes/${patient.id}`)
          }}
        />
      </Modal>
    </AppLayout>
  )
}
