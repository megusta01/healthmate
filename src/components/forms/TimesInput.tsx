import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'

/** Lista de horários diários (HH:mm). */
export default function TimesInput({
  value,
  onChange,
}: {
  value: string[]
  onChange: (times: string[]) => void
}) {
  const [draft, setDraft] = useState('')

  const add = () => {
    if (!/^\d{2}:\d{2}$/.test(draft) || value.includes(draft)) return
    onChange([...value, draft].sort())
    setDraft('')
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-700">Horários de administração</span>
      <div className="flex flex-wrap items-center gap-2">
        {value.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 py-1 pl-3 pr-1.5 text-sm font-medium text-brand-800 ring-1 ring-brand-600/20"
          >
            {t}
            <button
              type="button"
              onClick={() => onChange(value.filter((x) => x !== t))}
              className="rounded-full p-0.5 hover:bg-brand-100"
              aria-label={`Remover ${t}`}
            >
              <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
            </button>
          </span>
        ))}
        <div className="flex items-center gap-1">
          <input
            type="time"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                add()
              }
            }}
            className="rounded-lg border border-gray-300 px-2 py-1 text-sm focus:border-brand-500 focus:outline-none"
            aria-label="Novo horário"
          />
          <button
            type="button"
            onClick={add}
            disabled={!draft}
            className="rounded-lg border border-brand-700/40 px-2.5 py-1 text-sm text-brand-800 hover:bg-brand-50 disabled:opacity-40"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1 h-3 w-3" />
            Adicionar
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500">Cada horário gera um lembrete diário.</p>
    </div>
  )
}
