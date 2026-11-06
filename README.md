# HealthMate

## Sobre

HealthMate é uma aplicação web para facilitar a gestão de medicamentos de pacientes com condições crônicas e agudas.
Voltado principalmente para profissionais de saúde autônomos, o sistema permite o cadastro detalhado de pacientes e
seus medicamentos, com lembretes de horário, alerta de recompra e relatórios de acompanhamento.

## Funcionalidades

- **Cadastro de pacientes** com dados clínicos, endereço e o primeiro medicamento, tudo de uma vez.
- **Medicamentos** com dosagem, período de uso, estoque e vários horários diários.
- **Agenda do dia** (Notificações) com todos os horários de todos os pacientes, e **alertas no navegador** no horário de cada dose.
- **Alerta de estoque baixo** no dashboard, para avisar a hora de recomprar.
- **Avaliações de saúde** (sintomas, efeitos colaterais, conduta) e **relatórios** com busca e impressão/PDF.
- **Login** com e-mail/senha ou Google. Cada profissional vê apenas os próprios pacientes.

## Como rodar

Pré-requisito: a API ([healthmate-backend](../healthmate-backend)) rodando, por padrão em `http://localhost:3333`.

```bash
cp .env.example .env.local
npm install
npm run dev        # http://localhost:3000
```

| Variável | Descrição |
|---|---|
| `API_URL` | URL da API. O Next faz proxy de `/api/*` para ela, então ela não vai para o navegador |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Opcional. Mostra o botão "Continuar com Google" |

> **Por que um proxy?** O navegador só conversa com o próprio front (`/api/...`). Assim os cookies de sessão
> são *first-party*: funcionam em Safari/Chrome sem configuração de CORS ou cookies de terceiros.

### Login com Google (opcional)

1. Google Cloud Console → *APIs & Services* → *Credentials* → **OAuth client ID** do tipo *Web application*.
2. Em *Authorized JavaScript origins*, adicione `http://localhost:3000` e o domínio de produção.
3. Use o mesmo Client ID em `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (front) e `GOOGLE_CLIENT_ID` (API).

## Estrutura

```
src/
  pages/            login, cadastro, dashboard, pacientes/[id], notificacoes, relatorios, perfil
  components/       Header, AppLayout (rota protegida), Modal, ui.tsx (botões, campos, cards…)
  components/forms/ PatientForm, MedicamentForm, TimesInput
  components/home/  landing page
  contexts/         AuthContext (sessão), ToastContext
  hooks/            useApi (GET com loading/erro), useReminderAlerts
  lib/              api.ts (axios + refresh automático), format.ts
  middleware.ts     redireciona as rotas antigas (/Login, /Dashboard…) para as novas
```

## Tecnologias

- **[Next.js 15](https://nextjs.org/)** (Pages Router) + **React 19** + **TypeScript**
- **[Tailwind CSS](https://tailwindcss.com/)** + CSS Modules (landing page)
- **[NestJS](https://nestjs.com/)** + **[Prisma](https://www.prisma.io/)** na API
- **[PostgreSQL](https://www.postgresql.org/)** hospedado no **[Supabase](https://supabase.com/)**

## Deploy (Vercel)

1. Importe o repositório na Vercel.
2. Defina `API_URL` com a URL pública da API (ex.: `https://healthmate-api.onrender.com`).
3. Na API, use `FRONTEND_URL` com o domínio da Vercel e `NODE_ENV=production`.

## Equipe

- **Artur Michael** — Desenvolvedor Frontend · [Email](mailto:arturalvesmorais8@gmail.com) | [GitHub](https://github.com/ArturMichael)
- **Gustavo Figueredo** — Desenvolvedor Full Stack · [Email](mailto:gustavofigueredo86@gmail.com) | [GitHub](https://github.com/megusta01)
- **Pedro Henrique** — Desenvolvedor Backend · [Email](mailto:pedrohrd87@gmail.com) | [GitHub](https://github.com/devpedrohrd)

## Protótipo

- **[Figma](https://www.figma.com/design/oQli8vkHGMpDp2GDk9quwt/Healthmate?node-id=0-1&t=1shZlZYTPLMFCASW-1)**
