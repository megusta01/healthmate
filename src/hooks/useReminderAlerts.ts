import { useEffect, useRef } from 'react'
import { api } from '@/lib/api'
import { nowTime } from '@/lib/format'
import type { TodayReminder } from '@/types/api'

const REFRESH_MS = 5 * 60_000
const TICK_MS = 20_000

/**
 * Enquanto o app está aberto, mostra uma notificação do navegador
 * no horário de cada lembrete (se o usuário tiver permitido).
 */
export function useReminderAlerts(enabled: boolean) {
  const reminders = useRef<TodayReminder[]>([])
  const fired = useRef(new Set<string>())

  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || !('Notification' in window)) return

    const load = () =>
      api
        .get<TodayReminder[]>('/reminders/today')
        .then(({ data }) => (reminders.current = data))
        .catch(() => undefined)

    const tick = () => {
      if (Notification.permission !== 'granted') return
      const now = nowTime()
      const today = new Date().toDateString()
      for (const r of reminders.current) {
        const key = `${r.id}-${today}`
        if (r.time === now && !fired.current.has(key)) {
          fired.current.add(key)
          new Notification(`💊 ${r.medicament.name} — ${r.medicament.patient.name}`, {
            body: [r.medicament.dosage, r.message].filter(Boolean).join(' · ') || `Horário: ${r.time}`,
            tag: key,
          })
        }
      }
    }

    void load()
    const refresh = setInterval(load, REFRESH_MS)
    const timer = setInterval(tick, TICK_MS)
    return () => {
      clearInterval(refresh)
      clearInterval(timer)
    }
  }, [enabled])
}
