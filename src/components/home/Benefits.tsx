import styles from '../../styles/Benefits.module.css';

export default function Benefits() {
    return (
        <section className={styles.benefitsSection}>
            <h2 className={styles.title}>Benefícios</h2>
            <ul className={styles.benefitsList}>
                <li>
                    <strong>Melhora da Adesão ao Tratamento:</strong> Lembretes automatizados ajudam os pacientes a tomarem seus medicamentos no horário correto.
                </li>
                <li>
                    <strong>Acompanhamento Facilitado:</strong> Profissionais de saúde podem acompanhar o progresso dos pacientes e ajustar tratamentos conforme necessário.
                </li>
                <li>
                    <strong>Segurança e Privacidade:</strong> Dados sensíveis são protegidos por criptografia e conformidade com regulamentações de proteção de dados.
                </li>
                <li>
                    <strong>Acesso Fácil a Medicamentos:</strong> Parcerias com farmácias permitem aos pacientes adquirir medicamentos facilmente, com indicações de locais de compra e possíveis descontos.
                </li>
                <li>
                    <strong>Relatórios Personalizados:</strong> Profissionais de saúde podem gerar relatórios detalhados sobre o uso de medicamentos, ajudando no monitoramento e ajuste de tratamentos.
                </li>
            </ul>
        </section>
    );
}