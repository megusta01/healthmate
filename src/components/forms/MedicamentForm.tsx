import { FormEvent, useState } from 'react'
import { Alert, Button } from '@/components/ui'
import { api, getErrorMessage } from '@/lib/api'
import { toDateInput } from '@/lib/format'
import type { Medicament } from '@/types/api'
import MedicamentFields, {
  emptyMedicament,
  MedicamentFormState,
  toMedicamentPayload,
} from './MedicamentFields'

function fromMedicament(m: Medicament): MedicamentFormState {
  return {
    name: m.name,
    dosage: m.dosage ?? '',
    quantity: String(m.quantity),
    lowStockAt: String(m.lowStockAt),
    status: m.status,
    startDate: toDateInput(m.startDate),
    endDate: toDateInput(m.endDate),
    description: m.description ?? '',
    times: m.reminders.map((r) => r.time),
  }
}

export default function MedicamentForm({
  patientId,
  medicament,
  onSaved,
  onCancel,
}: {
  patientId: string
  medicament?: Medicament
  onSaved: () => void
  onCancel: () => void
}) {
  const [value, setValue] = useState(() =>
    medicament ? fromMedicament(medicament) : emptyMedicament(),
  )
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSaving(true)
    try {
      const payload = toMedicamentPayload(value)
      if (medicament) await api.patch(`/medicaments/${medicament.id}`, payload)
      else await api.post(`/patients/${patientId}/medicaments`, payload)
      onSaved()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && <Alert>{error}</Alert>}
      <MedicamentFields value={value} onChange={setValue} showStatus={!!medicament} />
      <div className="sticky bottom-0 -mx-6 flex justify-end gap-3 border-t border-gray-100 bg-white px-6 py-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" loading={saving}>
          {medicament ? 'Salvar' : 'Adicionar medicamento'}
        </Button>
      </div>
    </form>
  )
}
