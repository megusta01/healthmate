import { useCallback, useEffect, useRef, useState } from 'react'
import { api, getErrorMessage } from '@/lib/api'

/**
 * GET simples com estado de carregamento/erro e `reload()`.
 * Passe `null` como url para não buscar (ex.: id ainda indefinido).
 */
export function useApi<T>(url: string | null, params?: Record<string, unknown>) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(!!url)
  const key = JSON.stringify(params ?? {})
  const requestId = useRef(0)

  const load = useCallback(async () => {
    if (!url) return
    const id = ++requestId.current
    setLoading(true)
    try {
      const res = await api.get<T>(url, { params: JSON.parse(key) })
      // ignora respostas antigas (ex.: busca digitada rápido)
      if (id === requestId.current) {
        setData(res.data)
        setError(null)
      }
    } catch (err) {
      if (id === requestId.current) setError(getErrorMessage(err))
    } finally {
      if (id === requestId.current) setLoading(false)
    }
  }, [url, key])

  useEffect(() => {
    void load()
  }, [load])

  return { data, error, loading, reload: load, setData }
}

export function useDebounced<T>(value: T, delay = 350) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}
