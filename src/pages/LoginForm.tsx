import styles from '../styles/Login.module.css';

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
                <a  className='cadastrar' href="">Não tem conta? Cadastre-se</a>
              </div>
              <div className={styles.submit}>
                <button type="submit">Entrar</button>
              </div>
              <div className={styles.googleLogin}>
                <button type="button" className={styles.googleButton}>
                  <img src="google.png" alt="Google" className={styles.googleIcon} />
                  Login com o Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
