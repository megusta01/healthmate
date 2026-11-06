import { FormEvent, ReactNode, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import AppLayout from '@/components/AppLayout'
import ConfirmDialog from '@/components/ConfirmDialog'
import MedicamentForm from '@/components/forms/MedicamentForm'
import PatientForm from '@/components/forms/PatientForm'
import Modal from '@/components/Modal'
import {
  Alert,
  Badge,
  Button,
  Card,
  EmptyState,
  Loading,
  TextArea,
} from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import { useApi } from '@/hooks/useApi'
import { api, getErrorMessage } from '@/lib/api'
import {
  ageFrom,
  bmi,
  formatDate,
  formatDateTime,
  formatNumber,
  GENDER_LABEL,
  initials,
  STATUS_LABEL,
} from '@/lib/format'
import type { Medicament, Patient, Reminder } from '@/types/api'

function Info({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</dt>
      <dd className="mt-0.5 text-sm text-gray-800">{children || '—'}</dd>
    </div>
  )
}

export default function PacientePage() {
  const { user } = useAuth()
  const router = useRouter()
  const toast = useToast()
  const id = typeof router.query.id === 'string' ? router.query.id : null
  const { data: patient, loading, error, reload } = useApi<Patient>(
    user && id ? `/patients/${id}` : null,
  )

  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [medicamentModal, setMedicamentModal] = useState<{ medicament?: Medicament } | null>(null)
  const [medicamentToDelete, setMedicamentToDelete] = useState<Medicament | null>(null)

  if (!patient) {
    return (
      <AppLayout title="Paciente">
        {error ? <Alert>{error}</Alert> : loading ? <Loading /> : null}
      </AppLayout>
    )
  }

  const age = ageFrom(patient.birthDate)
  const address = patient.address
  const addressLine = address
    ? [
        [address.street, address.number].filter(Boolean).join(', '),
        address.complement,
        address.district,
        [address.city, address.state].filter(Boolean).join(' - '),
        address.zipCode,
      ]
        .filter(Boolean)
        .join(' · ')
    : null

  async function toggleReminder(reminder: Reminder) {
    try {
      await api.patch(`/reminders/${reminder.id}`, { isActive: !reminder.isActive })
      await reload()
    } catch (err) {
      toast(getErrorMessage(err), 'error')
    }
  }

  return (
    <AppLayout title={patient.name}>
      <Link
        href="/pacientes"
        className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-700"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" /> Pacientes
      </Link>

      {/* Cabeçalho */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-800 text-lg font-semibold text-white">
            {initials(patient.name)}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
            <p className="text-sm text-gray-500">
              {[
                age !== null && `${age} anos`,
                patient.gender && GENDER_LABEL[patient.gender],
                patient.bloodType && `Tipo ${patient.bloodType}`,
              ]
                .filter(Boolean)
                .join(' · ') || 'Sem dados adicionais'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setEditing(true)}>
            <FontAwesomeIcon icon={faPen} className="h-3.5 w-3.5" /> Editar
          </Button>
          <Button variant="danger" onClick={() => setDeleting(true)}>
            <FontAwesomeIcon icon={faTrash} className="h-3.5 w-3.5" /> Excluir
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Coluna esquerda: dados */}
        <Card title="Dados do paciente" className="lg:col-span-1">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
            <Info label="Nascimento">{formatDate(patient.birthDate)}</Info>
            <Info label="Telefone">{patient.phone}</Info>
            <div className="col-span-2">
              <Info label="E-mail">{patient.email}</Info>
            </div>
            <Info label="Peso">{patient.weight ? `${formatNumber(patient.weight)} kg` : null}</Info>
            <Info label="Altura">{patient.height ? `${formatNumber(patient.height)} m` : null}</Info>
            <Info label="IMC">{bmi(patient.weight, patient.height)}</Info>
            <Info label="Tipo sanguíneo">{patient.bloodType}</Info>
            <div className="col-span-2">
              <Info label="Endereço">{addressLine}</Info>
            </div>
            {patient.notes && (
              <div className="col-span-2">
                <Info label="Observações">
                  <span className="whitespace-pre-line">{patient.notes}</span>
                </Info>
              </div>
            )}
          </dl>
        </Card>

        {/* Coluna direita: medicamentos + avaliações */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card
            title="Medicamentos"
            action={
              <Button size="sm" onClick={() => setMedicamentModal({})}>
                <FontAwesomeIcon icon={faPlus} className="h-3 w-3" /> Adicionar
              </Button>
            }
          >
            {patient.medicaments.length === 0 ? (
              <EmptyState title="Nenhum medicamento cadastrado" />
            ) : (
              <ul className="divide-y divide-gray-100">
                {patient.medicaments.map((m) => {
                  const low = m.status === 'ACTIVE' && m.quantity <= m.lowStockAt
                  return (
                    <li key={m.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900">
                            {m.name}
                            {m.dosage && <span className="font-normal text-gray-500"> · {m.dosage}</span>}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <Badge color={m.status === 'ACTIVE' ? 'green' : 'gray'}>
                              {STATUS_LABEL[m.status]}
                            </Badge>
                            <Badge color={low ? (m.quantity === 0 ? 'red' : 'amber') : 'gray'}>
                              Estoque: {m.quantity}
                            </Badge>
                            {(m.startDate || m.endDate) && (
                              <span className="text-xs text-gray-500">
                                {formatDate(m.startDate)} → {formatDate(m.endDate)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setMedicamentModal({ medicament: m })}
                            aria-label={`Editar ${m.name}`}
                          >
                            <FontAwesomeIcon icon={faPen} className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setMedicamentToDelete(m)}
                            aria-label={`Excluir ${m.name}`}
                          >
                            <FontAwesomeIcon icon={faTrash} className="h-3.5 w-3.5 text-red-600" />
                          </Button>
                        </div>
                      </div>
                      {m.reminders.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {m.reminders.map((r) => (
                            <button
                              key={r.id}
                              onClick={() => void toggleReminder(r)}
                              title={r.isActive ? 'Clique para pausar' : 'Clique para reativar'}
                              className={`rounded-md px-2 py-0.5 font-mono text-xs ring-1 ring-inset transition ${
                                r.isActive
                                  ? 'bg-brand-50 text-brand-800 ring-brand-600/20 hover:bg-brand-100'
                                  : 'bg-gray-50 text-gray-400 line-through ring-gray-300 hover:bg-gray-100'
                              }`}
                            >
                              ⏰ {r.time}
                            </button>
                          ))}
                        </div>
                      )}
                      {m.description && (
                        <p className="mt-2 text-sm text-gray-600">{m.description}</p>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </Card>

          <AssessmentsCard patient={patient} onCreated={reload} />
        </div>
      </div>

      {/* Modais */}
      <Modal open={editing} onClose={() => setEditing(false)} title="Editar paciente" size="lg">
        <PatientForm
          patient={patient}
          onCancel={() => setEditing(false)}
          onSaved={() => {
            setEditing(false)
            toast('Dados atualizados.')
            void reload()
          }}
        />
      </Modal>

      <Modal
        open={!!medicamentModal}
        onClose={() => setMedicamentModal(null)}
        title={medicamentModal?.medicament ? 'Editar medicamento' : 'Novo medicamento'}
        size="lg"
      >
        {medicamentModal && (
          <MedicamentForm
            patientId={patient.id}
            medicament={medicamentModal.medicament}
            onCancel={() => setMedicamentModal(null)}
            onSaved={() => {
              setMedicamentModal(null)
              toast('Medicamento salvo.')
              void reload()
            }}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={!!medicamentToDelete}
        title="Excluir medicamento"
        message={`Excluir "${medicamentToDelete?.name}" e todos os seus lembretes?`}
        onClose={() => setMedicamentToDelete(null)}
        onConfirm={async () => {
          try {
            await api.delete(`/medicaments/${medicamentToDelete!.id}`)
            setMedicamentToDelete(null)
            toast('Medicamento excluído.')
            await reload()
          } catch (err) {
            toast(getErrorMessage(err), 'error')
          }
        }}
      />

      <ConfirmDialog
        open={deleting}
        title="Excluir paciente"
        message={`Excluir ${patient.name}? Medicamentos, lembretes e avaliações também serão apagados. Essa ação não pode ser desfeita.`}
        onClose={() => setDeleting(false)}
        onConfirm={async () => {
          try {
            await api.delete(`/patients/${patient.id}`)
            toast('Paciente excluído.')
            await router.push('/pacientes')
          } catch (err) {
            toast(getErrorMessage(err), 'error')
          }
        }}
      />
    </AppLayout>
  )
}

function AssessmentsCard({ patient, onCreated }: { patient: Patient; onCreated: () => Promise<void> }) {
  const toast = useToast()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ symptoms: '', sideEffects: '', observations: '' })
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSaving(true)
    try {
      await api.post(`/patients/${patient.id}/assessments`, form)
      setForm({ symptoms: '', sideEffects: '', observations: '' })
      setOpen(false)
      toast('Avaliação registrada.')
      await onCreated()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card
      title="Avaliações de saúde"
      action={
        !open && (
          <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
            <FontAwesomeIcon icon={faPlus} className="h-3 w-3" /> Nova avaliação
          </Button>
        )
      }
    >
      {open && (
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4 rounded-lg bg-gray-50 p-4">
          {error && <Alert>{error}</Alert>}
          <TextArea
            label="Sintomas"
            value={form.symptoms}
            onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
          />
          <TextArea
            label="Efeitos colaterais"
            value={form.sideEffects}
            onChange={(e) => setForm({ ...form, sideEffects: e.target.value })}
          />
          <TextArea
            label="Observações / conduta"
            value={form.observations}
            onChange={(e) => setForm({ ...form, observations: e.target.value })}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" loading={saving}>
              Registrar
            </Button>
          </div>
        </form>
      )}

      {patient.assessments.length === 0 ? (
        !open && <EmptyState title="Nenhuma avaliação registrada" />
      ) : (
        <ol className="relative flex flex-col gap-5 border-l-2 border-brand-100 pl-5">
          {patient.assessments.map((a) => (
            <li key={a.id} className="relative">
              <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-white bg-brand-500" />
              <p className="text-xs text-gray-500">
                {formatDateTime(a.createdAt)}
                {a.professional && ` · ${a.professional.user.name}`}
              </p>
              <dl className="mt-1 space-y-1 text-sm">
                {a.symptoms && (
                  <div>
                    <dt className="inline font-medium text-gray-700">Sintomas: </dt>
                    <dd className="inline text-gray-600">{a.symptoms}</dd>
                  </div>
                )}
                {a.sideEffects && (
                  <div>
                    <dt className="inline font-medium text-gray-700">Efeitos colaterais: </dt>
                    <dd className="inline text-gray-600">{a.sideEffects}</dd>
                  </div>
                )}
                {a.observations && (
                  <div>
                    <dt className="inline font-medium text-gray-700">Observações: </dt>
                    <dd className="inline text-gray-600">{a.observations}</dd>
                  </div>
                )}
              </dl>
            </li>
          ))}
        </ol>
      )}
      {patient.assessments.length >= 10 && (
        <Link
          href={`/relatorios?paciente=${patient.id}`}
          className="mt-4 inline-block text-sm font-medium text-brand-700 hover:underline"
        >
          Ver histórico completo
        </Link>
      )}
    </Card>
  )
}
