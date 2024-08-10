export default function LoginForm() {
  return (
    <>
      <div>
        <div>
          <h1 className="text-2xl">Bem-vindo ao HealthMate</h1>
          <p>
            O HealthMate é um sistema de gerenciamento de pacientes e
            consultas. Com ele você pode cadastrar pacientes, agendar
            consultas, emitir relatórios e muito mais.
          </p>
        </div>
        <div>
          <h1 className="text-2xl">Faça seu login</h1>
          <form>
            <div>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu e-mail"
              />
            </div>
            <div>
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Digite sua senha"
              />
            </div>
            <button type="submit">Entrar</button>
            <button>
              Login com Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
}