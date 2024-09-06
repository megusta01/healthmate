import styles from '../../styles/Welcome.module.css';
import { useRouter } from 'next/router';

export default function Welcome() {
    const router = useRouter();
    return (
        <>
            <div className={styles.welcomeSection}>
                <div className={styles.content}>
                    <h1 className={styles.title}>BEM-VINDO AO HEALTHMATE!</h1>
                    <p className={styles.description}>
                        Seu aliado no cuidado com a saúde! Aqui, você encontra a solução completa para gerenciar
                        seus medicamentos de forma segura e eficiente, garantindo que seus tratamentos estejam
                        sempre em dia e sob controle.
                    </p>
                    <button className={styles.ctaButton} onClick={() => router.push('/Cadastro')}>
                        Comece agora
                    </button>
                </div>
                <div className={styles.imageContainer}>
                    <img
                        src="a39d422a-4242-4430-b1cd-4ca95e838bc9 1.png"
                        alt="Ilustração de consulta médica"
                        className={styles.welcomeImage}
                    />
                </div>
            </div>
        </>
    );
}