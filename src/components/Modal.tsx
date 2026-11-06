import { ReactNode, useEffect, useId, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  size?: 'md' | 'lg'
}

/** Modal acessível: fecha com Esc ou clicando fora, trava o scroll do fundo. */
export default function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  const titleId = useId()
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-2 sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        // altura limitada à tela: o conteúdo rola por dentro e o topo nunca some
        className={`flex max-h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl outline-none ${
          size === 'lg' ? 'max-w-3xl' : 'max-w-lg'
        }`}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 id={titleId} className="text-lg font-semibold text-gray-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Fechar"
          >
            <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
          </button>
        </header>
        <div className="overflow-y-auto overscroll-contain px-6 pt-5">{children}</div>
      </div>
    </div>
  )
}
