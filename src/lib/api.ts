import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

/**
 * Cliente HTTP da aplicação. Fala com `/api` do próprio front (o Next faz proxy
 * para a API NestJS — ver next.config.mjs). A sessão vive em cookies httpOnly,
 * então nenhum token é guardado em localStorage.
 */
export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

export const SESSION_EXPIRED_EVENT = 'healthmate:session-expired'

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean }

// rotas em que um 401 é resposta "normal" e não deve disparar refresh
const NO_REFRESH = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout', '/auth/google']

let refreshing: Promise<void> | null = null

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetriableConfig | undefined
    const status = error.response?.status

    if (
      status !== 401 ||
      !original ||
      original._retry ||
      NO_REFRESH.some((path) => original.url?.startsWith(path))
    ) {
      throw error
    }

    original._retry = true
    try {
      // várias requisições falhando ao mesmo tempo compartilham um único refresh
      refreshing ??= api.post('/auth/refresh').then(() => undefined)
      await refreshing
    } catch {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT))
      }
      throw error
    } finally {
      refreshing = null
    }
    return api(original)
  },
)

// ─── mensagens de erro ───

const MESSAGES: Record<string, string> = {
  INVALID_CREDENTIALS: 'E-mail ou senha incorretos.',
  EMAIL_ALREADY_REGISTERED: 'Este e-mail já está cadastrado.',
  USER_INACTIVE: 'Sua conta está desativada.',
  GOOGLE_LOGIN_DISABLED: 'Login com Google não está configurado.',
  GOOGLE_TOKEN_INVALID: 'Não foi possível validar sua conta Google.',
  GOOGLE_EMAIL_NOT_VERIFIED: 'Seu e-mail do Google não está verificado.',
  CURRENT_PASSWORD_INVALID: 'Senha atual incorreta.',
  CURRENT_PASSWORD_REQUIRED: 'Informe a senha atual.',
  PATIENT_NOT_FOUND: 'Paciente não encontrado.',
  MEDICAMENT_NOT_FOUND: 'Medicamento não encontrado.',
  ASSESSMENT_EMPTY: 'Preencha ao menos um campo da avaliação.',
  END_DATE_BEFORE_START_DATE: 'A data final deve ser depois da inicial.',
  ALREADY_EXISTS: 'Registro duplicado.',
  ThrottlerException: 'Muitas tentativas. Aguarde um minuto.',
}

export function getErrorMessage(error: unknown, fallback = 'Algo deu errado. Tente novamente.') {
  if (axios.isAxiosError(error)) {
    if (!error.response) return 'Sem conexão com o servidor.'
    if (error.response.status === 429) return MESSAGES.ThrottlerException
    const message = (error.response.data as { message?: string | string[] })?.message
    if (Array.isArray(message)) return message.join(' • ')
    if (message) return MESSAGES[message] ?? message
  }
  return fallback
}
