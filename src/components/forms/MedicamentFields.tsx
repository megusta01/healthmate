import { Input, Select, TextArea } from '@/components/ui'
import { STATUS_LABEL } from '@/lib/format'
import type { MedicamentStatus } from '@/types/api'
import TimesInput from './TimesInput'

export interface MedicamentFormState {
  name: string
  dosage: string
  quantity: string
  lowStockAt: string
  status: MedicamentStatus
  startDate: string
  endDate: string
  description: string
  times: string[]
}

export const emptyMedicament = (): MedicamentFormState => ({
  name: '',
  dosage: '',
  quantity: '',
  lowStockAt: '5',
  status: 'ACTIVE',
  startDate: '',
  endDate: '',
  description: '',
  times: [],
})

/** Converte o estado do formulário no payload da API. */
export function toMedicamentPayload(m: MedicamentFormState) {
  return {
    name: m.name.trim(),
    dosage: m.dosage.trim() || undefined,
    description: m.description.trim() || undefined,
    quantity: m.quantity === '' ? undefined : Number(m.quantity),
    lowStockAt: m.lowStockAt === '' ? undefined : Number(m.lowStockAt),
    status: m.status,
    startDate: m.startDate || undefined,
    endDate: m.endDate || undefined,
    times: m.times,
  }
}

export default function MedicamentFields({
  value,
  onChange,
  showStatus,
}: {
  value: MedicamentFormState
  onChange: (value: MedicamentFormState) => void
  showStatus?: boolean
}) {
  const set =
    <K extends keyof MedicamentFormState>(field: K) =>
    (e: { target: { value: string } }) =>
      onChange({ ...value, [field]: e.target.value as MedicamentFormState[K] })

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input label="Medicamento *" value={value.name} onChange={set('name')} required />
      <Input label="Dosagem" placeholder="Ex.: 50 mg, 1 comprimido" value={value.dosage} onChange={set('dosage')} />
      <Input
        label="Estoque (unidades)"
        type="number"
        min={0}
        value={value.quantity}
        onChange={set('quantity')}
      />
      <Input
        label="Avisar recompra com"
        type="number"
        min={0}
        value={value.lowStockAt}
        onChange={set('lowStockAt')}
        hint="Alerta quando o estoque chegar a este número."
      />
      <Input label="Início" type="date" value={value.startDate} onChange={set('startDate')} />
      <Input label="Fim" type="date" value={value.endDate} onChange={set('endDate')} />
      {showStatus && (
        <Select label="Situação" value={value.status} onChange={set('status')}>
          {Object.entries(STATUS_LABEL).map(([k, label]) => (
            <option key={k} value={k}>
              {label}
            </option>
          ))}
        </Select>
      )}
      <div className="sm:col-span-2">
        <TimesInput value={value.times} onChange={(times) => onChange({ ...value, times })} />
      </div>
      <TextArea
        label="Instruções / observações"
        wrapperClassName="sm:col-span-2"
        value={value.description}
        onChange={set('description')}
      />
    </div>
  )
}
