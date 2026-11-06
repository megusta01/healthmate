import { GoogleLogin as GoogleButton } from '@react-oauth/google'
import { useAuth } from '@/contexts/AuthContext'
import { getErrorMessage } from '@/lib/api'

/**
 * Botão oficial do Google Identity Services. Só aparece se
 * NEXT_PUBLIC_GOOGLE_CLIENT_ID estiver configurado.
 */
export default function GoogleLogin({
  onSuccess,
  onError,
}: {
  onSuccess: () => void
  onError: (message: string) => void
}) {
  const { loginWithGoogle } = useAuth()
  if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) return null

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full items-center gap-3 text-xs text-gray-400">
        <span className="h-px flex-1 bg-gray-200" /> ou <span className="h-px flex-1 bg-gray-200" />
      </div>
      <GoogleButton
        text="continue_with"
        onSuccess={async ({ credential }) => {
          if (!credential) return onError('Resposta inválida do Google.')
          try {
            await loginWithGoogle(credential)
            onSuccess()
          } catch (err) {
            onError(getErrorMessage(err))
          }
        }}
        onError={() => onError('Não foi possível entrar com o Google.')}
      />
    </div>
  )
}
