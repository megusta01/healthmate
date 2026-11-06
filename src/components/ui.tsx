import {
  ButtonHTMLAttributes,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  useId,
} from 'react'

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

// ─── Button ───

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand-700 text-white hover:bg-brand-800 focus-visible:ring-brand-500',
  secondary:
    'bg-white text-brand-800 border border-brand-700/40 hover:bg-brand-50 focus-visible:ring-brand-500',
  ghost: 'text-gray-600 hover:bg-gray-100 focus-visible:ring-gray-400',
  danger: 'bg-white text-red-700 border border-red-200 hover:bg-red-50 focus-visible:ring-red-400',
}

export function Button({
  variant = 'primary',
  loading,
  className,
  children,
  disabled,
  size = 'md',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  loading?: boolean
  size?: 'sm' | 'md'
}) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-60',
        size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2.5 text-sm',
        VARIANTS[variant],
        className,
      )}
    >
      {loading && <Spinner className="h-4 w-4" />}
      {children}
    </button>
  )
}

// ─── Campos de formulário ───

const fieldClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ' +
  'placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 ' +
  'disabled:bg-gray-50'

interface FieldWrapperProps {
  label: string
  hint?: string
  error?: string
  className?: string
  children: (id: string) => ReactNode
}

function FieldWrapper({ label, hint, error, className, children }: FieldWrapperProps) {
  const id = useId()
  return (
    <div className={cx('flex flex-col gap-1', className)}>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {children(id)}
      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : hint ? (
        <p className="text-xs text-gray-500">{hint}</p>
      ) : null}
    </div>
  )
}

type Common = { label: string; hint?: string; error?: string; wrapperClassName?: string }

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & Common>(
  function Input({ label, hint, error, wrapperClassName, className, ...props }, ref) {
    return (
      <FieldWrapper label={label} hint={hint} error={error} className={wrapperClassName}>
        {(id) => <input id={id} ref={ref} {...props} className={cx(fieldClass, className)} />}
      </FieldWrapper>
    )
  },
)

export function Select({
  label,
  hint,
  error,
  wrapperClassName,
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & Common) {
  return (
    <FieldWrapper label={label} hint={hint} error={error} className={wrapperClassName}>
      {(id) => (
        <select id={id} {...props} className={cx(fieldClass, className)}>
          {children}
        </select>
      )}
    </FieldWrapper>
  )
}

export function TextArea({
  label,
  hint,
  error,
  wrapperClassName,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & Common) {
  return (
    <FieldWrapper label={label} hint={hint} error={error} className={wrapperClassName}>
      {(id) => <textarea id={id} rows={3} {...props} className={cx(fieldClass, className)} />}
    </FieldWrapper>
  )
}

// ─── Layout / feedback ───

export function Card({
  title,
  action,
  children,
  className,
}: {
  title?: ReactNode
  action?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cx('rounded-xl border border-gray-200 bg-white shadow-sm', className)}>
      {(title || action) && (
        <header className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-3.5">
          <h2 className="font-semibold text-gray-800">{title}</h2>
          {action}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  )
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

const BADGE: Record<string, string> = {
  green: 'bg-brand-50 text-brand-700 ring-brand-600/20',
  gray: 'bg-gray-50 text-gray-600 ring-gray-500/20',
  red: 'bg-red-50 text-red-700 ring-red-600/20',
  amber: 'bg-amber-50 text-amber-800 ring-amber-600/20',
  blue: 'bg-sky-50 text-sky-700 ring-sky-600/20',
}

export function Badge({
  color = 'gray',
  children,
}: {
  color?: keyof typeof BADGE
  children: ReactNode
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
        BADGE[color],
      )}
    >
      {children}
    </span>
  )
}

export function Spinner({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg className={cx('animate-spin', className)} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity=".25" strokeWidth="4" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function Loading({ label = 'Carregando…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-12 text-gray-500" role="status">
      <Spinner className="h-5 w-5 text-brand-600" />
      <span className="text-sm">{label}</span>
    </div>
  )
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 px-6 py-10 text-center">
      <p className="font-medium text-gray-700">{title}</p>
      {children && <div className="mt-2 text-sm text-gray-500">{children}</div>}
    </div>
  )
}

export function Alert({ children, tone = 'error' }: { children: ReactNode; tone?: 'error' | 'info' }) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cx(
        'rounded-lg px-4 py-3 text-sm',
        tone === 'error' ? 'bg-red-50 text-red-800' : 'bg-sky-50 text-sky-800',
      )}
    >
      {children}
    </div>
  )
}

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number
  totalPages: number
  onChange: (page: number) => void
}) {
  if (totalPages <= 1) return null
  return (
    <nav className="mt-4 flex items-center justify-end gap-2 text-sm" aria-label="Paginação">
      <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        Anterior
      </Button>
      <span className="text-gray-600">
        {page} de {totalPages}
      </span>
      <Button
        variant="ghost"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Próxima
      </Button>
    </nav>
  )
}
