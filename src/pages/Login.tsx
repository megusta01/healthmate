import styles from '../styles/Login.module.css';
import GoogleLogin from '@/components/GoogleLogin';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Faz a requisição ao backend para validar o login
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
        email,
        senha,
      });

      if (response.status === 200) {
        // Armazena o token no localStorage
        localStorage.setItem('token', response.data.token);
        
        // Redireciona o usuário para a tela de dashboard ou a tela desejada
        router.push('/Dashboard'); 
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      // Exibe uma mensagem de erro para o usuário
    }
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.background}>
          <img src="logo (1).svg" alt="Healthmate Logo" className={styles.logo} />
        </div>
        <div className={styles.login}>
          <form onSubmit={handleSubmit}>
            <div className={styles.container}>
              <h2 className={styles.title}>LOGIN</h2>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Digite seu email..."
                  className={styles.inputField}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="password"
                  placeholder="Digite sua senha..."
                  className={styles.inputField}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
              <div className={styles.esqueceuSenha}>
                <a className='esqueceuSenha' href="/EsqueceuSenha">Esqueceu a senha?</a>
              </div>
              <div className={styles.submit}>
                <button type="submit">Entrar</button>
              </div>
              <div className={styles.submitCad}>
                <button type="button" onClick={() => router.push('/Cadastro')}>Cadastrar</button>
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
