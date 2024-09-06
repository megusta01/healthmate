/* eslint-disable @next/next/no-html-link-for-pages */
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import styles from '../styles//header.module.css'; // Importa o CSS module
import { useRouter } from "next/router";

export default function Header() {
    const router = useRouter();

    return (
        <header className={styles.header}>
            <Image src="/logo (1).svg" alt="" width={150} height={0} />
            <nav className={styles.nav}>
                <ul className="flex gap-5">
                    <li><a href="/Dashboard" className={router.pathname === "/Dashboard" ? styles.active : ""}>Dashboard</a></li>
                    <li><a href="/Pacientes" className={router.pathname === "/Pacientes" ? styles.active : ""}>Pacientes</a></li>
                    <li><a href="/notificacao" className={router.pathname === "/notificacao" ? styles.active : ""}>Notificações</a></li> 
                    <li><a href="/Relatorios" className={router.pathname === "/Relatorios" ? styles.active : ""}>Relatórios</a></li>
                </ul>
            </nav>
            <div>
                <a href="" className={styles.usuario}>
                    <FontAwesomeIcon icon={faCircleUser} width={50} height={50} />
                </a>
            </div>
        </header>
    );
}
