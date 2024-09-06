/* eslint-disable @next/next/no-html-link-for-pages */
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import styles from '../styles/Relatório.module.css';

export default function Header() {
    return (
        <>
            <header className={styles.header}>
                <Image src="/logo (1).svg" alt="" width={150} height={0} />
                <nav className={styles.nav}>
                    <ul className="flex gap-5">
                        <li><a href="">Pacientes</a></li>
                        <li><a href="">Notificações</a></li>
                        <li><a href="/Relatorios">Relatórios</a></li>
                    </ul>
                </nav>
                <div>
                    <a href="" className={styles.usuario}>
                        <FontAwesomeIcon icon={faCircleUser} width={50} height={50} />
                    </a>
                </div>
            </header>
            <section className={styles.section}>
                <div className={styles.sectionDiv}>
                    <p className={styles.sectionP}>RELATÓRIO</p>
                </div>
            </section>
        </>
    );
}
