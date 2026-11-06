import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faRightFromBracket, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@/contexts/AuthContext'
import { initials } from '@/lib/format'

const LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/pacientes', label: 'Pacientes' },
  { href: '/notificacoes', label: 'Notificações' },
  { href: '/relatorios', label: 'Relatórios' },
]

export default function Header() {
  const { user, logout } = useAuth()
  const { pathname } = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  useEffect(() => setMobileOpen(false), [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-40 bg-brand-800 print:hidden">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
        <Link href="/dashboard" className="shrink-0">
          <Image src="/logo (1).svg" alt="HealthMate" width={140} height={36} priority />
        </Link>

        <nav className="hidden rounded-full bg-white px-1.5 py-1 md:block" aria-label="Principal">
          <ul className="flex gap-1 text-sm font-medium">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className={`block rounded-full px-4 py-1.5 transition ${
                    isActive(l.href)
                      ? 'bg-brand-500 text-white'
                      : 'text-gray-700 hover:bg-brand-50'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white ring-2 ring-white/30 hover:bg-white/25"
              aria-label="Menu do usuário"
              aria-expanded={menuOpen}
            >
              {user ? initials(user.name) : <FontAwesomeIcon icon={faUser} />}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                <div className="border-b border-gray-100 px-4 py-3">
                  <p className="truncate text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="truncate text-xs text-gray-500">{user?.email}</p>
                </div>
                <Link
                  href="/perfil"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <FontAwesomeIcon icon={faUser} className="w-4 text-gray-400" /> Meu perfil
                </Link>
                <button
                  onClick={() => void logout()}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-700 hover:bg-red-50"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} className="w-4" /> Sair
                </button>
              </div>
            )}
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Abrir navegação"
            aria-expanded={mobileOpen}
          >
            <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-white/10 px-4 pb-3 md:hidden" aria-label="Principal">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`mt-1 block rounded-lg px-3 py-2 text-sm font-medium ${
                isActive(l.href) ? 'bg-brand-500 text-white' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
