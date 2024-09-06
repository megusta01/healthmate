import styles from '../../styles/Features.module.css';

export default function Features() {
    return (
        <div className={styles.section}>
            <div className={styles.featuresSection}>
                <h2 className={styles.title}>Funcionalidades</h2>
                <div className={styles.container}>
                    <div className={styles.imageContainer}>
                        <img
                            src="Fale-conosco_Trabalhe-conosco 1.png"
                            alt="Ilustração de profissionais de saúde"
                            className={styles.featureImage}
                        />
                    </div>
                    <div className={styles.cardsContainer}>
                        <div className={styles.card}>
                            <h3>Acesso Fácil a Medicamentos</h3>
                            <p>
                                Encontre farmácias parceiras diretamente pelo aplicativo para adquirir os medicamentos necessários com rapidez e praticidade.
                            </p>
                        </div>
                        <div className={styles.card}>
                            <h3>Segurança e Privacidade</h3>
                            <p>
                                Proteção de dados sensíveis com criptografia avançada e conformidade com regulamentações de proteção de dados.
                            </p>
                        </div>
                        <div className={styles.card}>
                            <h3>Histórico Completo</h3>
                            <p>
                                Acompanhe o histórico completo de medicamentos e tratamentos, garantindo uma visão clara e detalhada de toda a trajetória do paciente.
                            </p>
                        </div>
                        <div className={styles.card}>
                            <h3>Relatórios Personalizados</h3>
                            <p>
                                Geração de relatórios detalhados para monitorar o progresso dos tratamentos e compartilhar com médicos.
                            </p>
                        </div>
                        <div className={styles.card}>
                            <h3>Lembretes automatizados</h3>
                            <p>
                                Receba notificações por SMS, email e push para garantir que seus pacientes nunca esqueçam de tomar seus medicamentos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}