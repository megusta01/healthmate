import styles from '../styles/Login.module.css';
import GoogleLogin from '@/components/GoogleLogin';

export default function LoginForm() {
  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.background}>
          <img src="Frame-cópia.png" alt="Healthmate Logo" className={styles.logo} />
        </div>
        <div className={styles.login}>
          <form action="">
            <div className={styles.container}>
              <h2 className={styles.title}>LOGIN</h2>
              <div className={styles.inputContainer}>
                <input type="text" placeholder="Digite seu email..." className={styles.inputField} />
              </div>
              <div className={styles.inputContainer}>
                <input type="password" placeholder="Digite sua senha..." className={styles.inputField} />
              </div>
              <div>
                <a  className='cadastrar' href="Cadastro">Não tem conta? Cadastre-se</a>
              </div>
              <div className={styles.submit}>
                <button type="submit">Entrar</button>
              </div>
              <div className={styles.googleLogin}>
                <GoogleLogin />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
