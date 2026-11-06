import type { Gender, MedicamentStatus } from '@/types/api'

/** Datas "puras" (DATE) chegam como meia-noite UTC — formatar em UTC evita "voltar um dia". */
export function formatDate(iso: string | null | undefined) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

/** "2026-11-05T..." -> "2026-11-05" para <input type="date"> */
export function toDateInput(iso: string | null | undefined) {
  return iso ? iso.slice(0, 10) : ''
}

export function ageFrom(birthDate: string | null | undefined) {
  if (!birthDate) return null
  const birth = new Date(birthDate)
  const now = new Date()
  let age = now.getUTCFullYear() - birth.getUTCFullYear()
  const beforeBirthday =
    now.getUTCMonth() < birth.getUTCMonth() ||
    (now.getUTCMonth() === birth.getUTCMonth() && now.getUTCDate() < birth.getUTCDate())
  if (beforeBirthday) age--
  return age
}

export const GENDER_LABEL: Record<Gender, string> = {
  MALE: 'Masculino',
  FEMALE: 'Feminino',
  OTHER: 'Outro',
}

export const STATUS_LABEL: Record<MedicamentStatus, string> = {
  ACTIVE: 'Em uso',
  CONCLUDED: 'Concluído',
  CANCELED: 'Suspenso',
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => w && !w.endsWith('.')) // ignora títulos (Dr., Dra.)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join('')
}

export function bmi(weight: number | null, height: number | null) {
  if (!weight || !height) return null
  return formatNumber(weight / (height * height), 1)
}

export function formatNumber(value: number, maxDecimals = 2) {
  return value.toLocaleString('pt-BR', { maximumFractionDigits: maxDecimals })
}

/** "HH:mm" do relógio local */
export function nowTime() {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function maskPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function maskCep(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 8)
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d
}

/** Remove strings vazias (a API rejeita "" em campos validados). */
export function clean<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== '' && v !== undefined && v !== null),
  ) as T
}
