import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styles from '../../styles/HeaderLP.module.css'; // Importando o arquivo CSS

const Header: React.FC = () => {
const { user } = useAuth();
return (
    <header className={styles.header}>
        <div className={styles.container}>
            {/* Logo */}
            <div className={styles.logo}>
                <img src="/logo (1).svg" alt="Logo" className={styles.logoImg} />
            </div>

            {/* Menu */}
            <nav className={styles.menu}>
                <a href="#features" className={styles.menuItem}>
                    FUNCIONALIDADES
                </a>
                <a href="#benefits" className={styles.menuItem}>
                    GUIA RÁPIDO
                </a>
                <a href="#about" className={styles.menuItem}>
                    BENEFÍCIOS
                </a>
            </nav>

            {/* Botão de Login */}
            <Link className={styles.loginBtn} href={user ? "/dashboard" : "/login"}>{user ? "MEU PAINEL" : "LOGIN"}</Link>
        </div>
    </header>
);
};

export default Header;
