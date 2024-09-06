import styles from '../../styles/Future.module.css';

export default function Future() {
    return(
        <div className={styles.futureFeaturesSection}>
          <h2 className={styles.title}>Funcionalidades Futuras</h2>
          <div className={styles.cardsContainer}>
            <div className={styles.card}>
              <h3>Lembretes automatizados</h3>
              <p>
                Receba notificações por SMS, email e push para garantir que seus pacientes nunca esqueçam de tomar seus medicamentos.
              </p>
            </div>
            <div className={styles.card}>
              <h3>Relatórios Personalizados</h3>
              <p>
                Geração de relatórios detalhados para monitorar o progresso dos tratamentos e compartilhar com médicos.
              </p>
            </div>
            <div className={styles.card}>
              <h3>Segurança e Privacidade</h3>
              <p>
                Proteção de dados sensíveis com criptografia avançada e conformidade com regulamentações de proteção de dados.
              </p>
            </div>
          </div>
        </div>
    )
}