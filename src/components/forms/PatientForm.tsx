import { FormEvent, useState } from 'react'
import { Alert, Button, Input, Select, TextArea } from '@/components/ui'
import { api, getErrorMessage } from '@/lib/api'
import { clean, GENDER_LABEL, maskCep, maskPhone, toDateInput } from '@/lib/format'
import type { Gender, Patient, PatientInput } from '@/types/api'
import MedicamentFields, {
  emptyMedicament,
  MedicamentFormState,
  toMedicamentPayload,
} from './MedicamentFields'

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const UFS =
  'AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO'.split(' ')

function initialState(patient?: Patient) {
  return {
    name: patient?.name ?? '',
    email: patient?.email ?? '',
    phone: patient?.phone ?? '',
    gender: (patient?.gender ?? '') as Gender | '',
    birthDate: toDateInput(patient?.birthDate),
    weight: patient?.weight?.toString().replace('.', ',') ?? '',
    height: patient?.height?.toString().replace('.', ',') ?? '',
    bloodType: patient?.bloodType ?? '',
    notes: patient?.notes ?? '',
    street: patient?.address?.street ?? '',
    number: patient?.address?.number ?? '',
    complement: patient?.address?.complement ?? '',
    district: patient?.address?.district ?? '',
    city: patient?.address?.city ?? '',
    state: patient?.address?.state ?? '',
    zipCode: patient?.address?.zipCode ?? '',
  }
}

/**
 * Cadastro/edição de paciente. No cadastro, permite já incluir o primeiro
 * medicamento — tudo vai numa única requisição (transação no backend).
 */
export default function PatientForm({
  patient,
  onSaved,
  onCancel,
}: {
  patient?: Patient
  onSaved: (patient: { id: string }) => void
  onCancel: () => void
}) {
  const editing = !!patient
  const [form, setForm] = useState(() => initialState(patient))
  const [withMedicament, setWithMedicament] = useState(!editing)
  const [medicament, setMedicament] = useState<MedicamentFormState>(emptyMedicament)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const set = (field: keyof typeof form) => (e: { target: { value: string } }) => {
    let v = e.target.value
    if (field === 'phone') v = maskPhone(v)
    if (field === 'zipCode') v = maskCep(v)
    setForm((f) => ({ ...f, [field]: v }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (withMedicament && !editing && !medicament.name.trim()) {
      setError('Informe o nome do medicamento ou desmarque "Incluir medicamento".')
      return
    }
    const { street, number, complement, district, city, state, zipCode, weight, height, gender, ...rest } =
      form
    const address = clean({ street, number, complement, district, city, state, zipCode })
    // no cadastro omitimos campos vazios; na edição enviamos null para limpar o valor salvo
    const empty = editing ? null : undefined
    const num = (v: string) => (v ? Number(v.replace(',', '.')) : empty)
    const payload = {
      ...(editing
        ? Object.fromEntries(Object.entries(rest).map(([k, v]) => [k, v.trim() || null]))
        : clean(rest)),
      gender: gender || empty,
      weight: num(weight),
      height: num(height),
      address: Object.keys(address).length ? address : empty,
    } as PatientInput
    if (!editing && withMedicament) payload.medicaments = [toMedicamentPayload(medicament)]

    setSaving(true)
    try {
      const { data } = editing
        ? await api.patch<Patient>(`/patients/${patient.id}`, payload)
        : await api.post<Patient>('/patients', payload)
      onSaved(data)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && <Alert>{error}</Alert>}

      <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <legend className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-700">
          Dados pessoais
        </legend>
        <Input label="Nome completo *" value={form.name} onChange={set('name')} required wrapperClassName="sm:col-span-2" />
        <Input label="Data de nascimento" type="date" value={form.birthDate} onChange={set('birthDate')} />
        <Select label="Sexo" value={form.gender} onChange={set('gender')}>
          <option value="">Não informado</option>
          {Object.entries(GENDER_LABEL).map(([k, label]) => (
            <option key={k} value={k}>
              {label}
            </option>
          ))}
        </Select>
        <Input label="Telefone" type="tel" value={form.phone} onChange={set('phone')} />
        <Input label="E-mail" type="email" value={form.email} onChange={set('email')} />
        <div className="grid grid-cols-3 gap-4 sm:col-span-2">
          <Input label="Peso (kg)" inputMode="decimal" value={form.weight} onChange={set('weight')} />
          <Input label="Altura (m)" inputMode="decimal" placeholder="1,70" value={form.height} onChange={set('height')} />
          <Select label="Tipo sanguíneo" value={form.bloodType} onChange={set('bloodType')}>
            <option value="">—</option>
            {BLOOD_TYPES.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </Select>
        </div>
      </fieldset>

      <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-6">
        <legend className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-700">
          Endereço
        </legend>
        <Input label="CEP" value={form.zipCode} onChange={set('zipCode')} wrapperClassName="sm:col-span-2" />
        <Input label="Rua" value={form.street} onChange={set('street')} wrapperClassName="sm:col-span-4" />
        <Input label="Número" value={form.number} onChange={set('number')} wrapperClassName="sm:col-span-2" />
        <Input label="Complemento" value={form.complement} onChange={set('complement')} wrapperClassName="sm:col-span-4" />
        <Input label="Bairro" value={form.district} onChange={set('district')} wrapperClassName="sm:col-span-2" />
        <Input label="Cidade" value={form.city} onChange={set('city')} wrapperClassName="sm:col-span-3" />
        <Select label="UF" value={form.state} onChange={set('state')} wrapperClassName="sm:col-span-1">
          <option value="">—</option>
          {UFS.map((uf) => (
            <option key={uf}>{uf}</option>
          ))}
        </Select>
      </fieldset>

      <TextArea label="Observações clínicas" value={form.notes} onChange={set('notes')} />

      {!editing && (
        <fieldset className="rounded-xl border border-gray-200 p-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-gray-800">
            <input
              type="checkbox"
              checked={withMedicament}
              onChange={(e) => setWithMedicament(e.target.checked)}
              className="h-4 w-4 accent-brand-700"
            />
            Incluir medicamento
          </label>
          {withMedicament && (
            <div className="mt-4">
              <MedicamentFields value={medicament} onChange={setMedicament} />
            </div>
          )}
        </fieldset>
      )}

      <div className="sticky bottom-0 -mx-6 flex justify-end gap-3 border-t border-gray-100 bg-white px-6 py-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" loading={saving}>
          {editing ? 'Salvar alterações' : 'Cadastrar paciente'}
        </Button>
      </div>
    </form>
  )
}
