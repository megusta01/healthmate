import React from 'react';
import styles from '../../styles/HeaderLP.module.css'; // Importando o arquivo CSS

const Header: React.FC = () => {
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
            <button className={styles.loginBtn} onClick={() => window.location.href = "/Login"}>LOGIN</button>
        </div>
    </header>
);
};

export default Header;
