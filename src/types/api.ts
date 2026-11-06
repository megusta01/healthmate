// Tipos espelhando as respostas da API (healthmate-backend)

export type Role = 'ADMIN' | 'PROFESSIONAL' | 'PATIENT'
export type Gender = 'MALE' | 'FEMALE' | 'OTHER'
export type MedicamentStatus = 'ACTIVE' | 'CONCLUDED' | 'CANCELED'

export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string | null
  role: Role
  hasPassword: boolean
  googleLinked: boolean
  createdAt: string
  professional: {
    id: string
    specialty: string | null
    license: string | null
    bio: string | null
    avatarUrl: string | null
  } | null
}

export interface Address {
  street?: string
  number?: string
  complement?: string
  district?: string
  city?: string
  state?: string
  zipCode?: string
}

export interface Reminder {
  id: string
  medicamentId: string
  time: string
  message: string | null
  isActive: boolean
}

export interface Medicament {
  id: string
  patientId: string
  name: string
  description: string | null
  dosage: string | null
  quantity: number
  lowStockAt: number
  status: MedicamentStatus
  startDate: string | null
  endDate: string | null
  createdAt: string
  reminders: Reminder[]
}

export interface Assessment {
  id: string
  patientId: string
  symptoms: string | null
  sideEffects: string | null
  observations: string | null
  createdAt: string
  patient?: { id: string; name: string }
  professional?: { user: { name: string } } | null
}

export interface PatientListItem {
  id: string
  name: string
  email: string | null
  phone: string | null
  gender: Gender | null
  birthDate: string | null
  createdAt: string
  activeMedicaments: number
}

export interface Patient {
  id: string
  name: string
  email: string | null
  phone: string | null
  gender: Gender | null
  birthDate: string | null
  weight: number | null
  height: number | null
  bloodType: string | null
  address: Address | null
  notes: string | null
  createdAt: string
  medicaments: Medicament[]
  assessments: Assessment[]
}

export interface TodayReminder extends Reminder {
  medicament: {
    id: string
    name: string
    dosage: string | null
    quantity: number
    patient: { id: string; name: string; phone: string | null }
  }
}

export interface Paginated<T> {
  data: T[]
  meta: { total: number; page: number; limit: number; totalPages: number }
}

export interface DashboardSummary {
  totals: {
    patients: number
    activeMedicaments: number
    lowStock: number
    remindersToday: number
  }
  recentPatients: { id: string; name: string; birthDate: string | null; createdAt: string }[]
  lowStockMedicaments: {
    id: string
    name: string
    dosage: string | null
    quantity: number
    lowStockAt: number
    patient: { id: string; name: string }
  }[]
  recentAssessments: Assessment[]
  reminders: TodayReminder[]
}

// ─── payloads ───

export interface MedicamentInput {
  name: string
  description?: string
  dosage?: string
  quantity?: number
  lowStockAt?: number
  status?: MedicamentStatus
  startDate?: string
  endDate?: string
  times?: string[]
}

export interface PatientInput {
  name: string
  email?: string
  phone?: string
  gender?: Gender
  birthDate?: string
  weight?: number
  height?: number
  bloodType?: string
  address?: Address
  notes?: string
  medicaments?: MedicamentInput[]
}
