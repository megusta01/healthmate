import { NextRequest, NextResponse } from 'next/server'

/**
 * Rotas antigas (com maiúscula) -> novas. Feito aqui e não em `redirects()`
 * porque o matcher do next.config ignora maiúsculas/minúsculas (causaria loop).
 */
const LEGACY: Record<string, string> = {
  '/Login': '/login',
  '/Cadastro': '/cadastro',
  '/Dashboard': '/dashboard',
  '/Pacientes': '/pacientes',
  '/notificacao': '/notificacoes',
  '/Relatorios': '/relatorios',
  '/Perfil': '/perfil',
}

export function middleware(request: NextRequest) {
  const target = LEGACY[request.nextUrl.pathname]
  if (!target) return NextResponse.next()
  const url = request.nextUrl.clone()
  url.pathname = target
  return NextResponse.redirect(url, 308)
}

export const config = {
  matcher: ['/Login', '/Cadastro', '/Dashboard', '/Pacientes', '/notificacao', '/Relatorios', '/Perfil'],
}
