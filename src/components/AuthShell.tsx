import { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Login.module.css'

/** Layout das telas de login/cadastro (painel verde com logo + cartão). */
export default function AuthShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <Head>
        <title>{`${title} · HealthMate`}</title>
      </Head>
      <div className={styles.loginContainer}>
        <div className={styles.background}>
          <Link href="/" aria-label="Voltar para a página inicial" className="flex w-full justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo (1).svg" alt="HealthMate" className={styles.logo} />
          </Link>
        </div>
        <div className={styles.login}>
          <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
