import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useRouter } from 'next/router'
import { api, SESSION_EXPIRED_EVENT } from '@/lib/api'
import type { UserProfile } from '@/types/api'

export interface RegisterInput {
  name: string
  email: string
  password: string
  phone?: string
  specialty?: string
  license?: string
}

interface AuthContextValue {
  user: UserProfile | null
  /** true enquanto verifica a sessão ao abrir o app */
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: (credential: string) => Promise<void>
  register: (input: RegisterInput) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: UserProfile) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    api
      .get<UserProfile>('/auth/me')
      .then(({ data }) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  // refresh falhou em alguma requisição -> sessão acabou
  useEffect(() => {
    const onExpired = () => setUser(null)
    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired)
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await api.post<UserProfile>('/auth/login', { email, password })
    setUser(data)
  }, [])

  const loginWithGoogle = useCallback(async (credential: string) => {
    const { data } = await api.post<UserProfile>('/auth/google', { credential })
    setUser(data)
  }, [])

  const register = useCallback(async (input: RegisterInput) => {
    const { data } = await api.post<UserProfile>('/auth/register', input)
    setUser(data)
  }, [])

  const logout = useCallback(async () => {
    await api.post('/auth/logout').catch(() => undefined)
    // navega antes de limpar o usuário, senão a tela protegida redireciona com ?next=
    await router.push('/login')
    setUser(null)
  }, [router])

  const value = useMemo(
    () => ({ user, loading, login, loginWithGoogle, register, logout, setUser }),
    [user, loading, login, loginWithGoogle, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth precisa estar dentro de <AuthProvider>')
  return ctx
}
