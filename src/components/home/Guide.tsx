import styles from '../../styles/Guide.module.css';
import { useRouter } from 'next/router';

export default function Guide() {
  const router = useRouter();
  return (
    <div className={styles.quickGuideSection}>
      <div className={styles.content}>
        <h2 className={styles.title}>Guia Rápido</h2>
        <h3 className={styles.subtitle}>Simplicidade e Eficiência</h3>
        <p className={styles.description}>
          O HealthMate foi cuidadosamente desenvolvido para oferecer uma experiência intuitiva e descomplicada.
          Profissionais de saúde podem cadastrar medicamentos e programar lembretes de forma rápida, enquanto os pacientes
          recebem notificações claras para seguirem seus tratamentos com precisão. O sistema cuida de tudo, desde o
          acompanhamento dos horários até a criação de relatórios detalhados.
        </p>
        <p className={styles.description}>
          Com apenas alguns cliques, você garante que seus pacientes sigam o plano de tratamento corretamente, sem a
          preocupação de esquecer doses importantes. O HealthMate automatiza o processo, mantendo todos informados e no
          controle da saúde.
        </p>
        <button className={styles.ctaButton} onClick={() => router.push('/Cadastro')} >Cadastre-se agora</button>
      </div>
      <div className={styles.imageContainer}>
        <img src="educate 1.png" alt="Ilustração de guia rápido" className={styles.guideImage}/>
      </div>
    </div>
  )
}