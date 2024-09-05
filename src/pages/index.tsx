import React from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };
  return (
    <>
      <div className="container mx-auto p-4">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <h1 className="text-3xl font-bold">HealthMate</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#home" className="text-blue-600">Início</a></li>
              <li><a href="#features" className="text-blue-600">Funcionalidades</a></li>
              <li><a href="#how-it-works" className="text-blue-600">Como Funciona</a></li>
              <li><a href="#benefits" className="text-blue-600">Benefícios</a></li>
              <li><a href="#testimonials" className="text-blue-600">Depoimentos</a></li>
              <li>
                <button onClick={() => window.location.href = '/Login'} className="text-blue-600">Login</button>
              </li>
              <li>
                <button onClick={() => window.location.href = '/Cadastro'} className="bg-blue-600 text-white py-2 px-4 rounded-lg">Cadastre-se</button>
              </li>
            </ul>
          </nav>
        </header>

        {/* Hero Section */}
        <section id="home" className="text-center py-20">
          <h2 className="text-5xl font-bold mb-6">Bem-vindo ao HealthMate</h2>
          <p className="text-lg mb-8">
            Seu assistente completo para o gerenciamento seguro e eficiente de medicamentos.
          </p>
          <button onClick={() => navigateTo('/signup')} className="bg-blue-600 text-white py-3 px-8 rounded-lg">
            Comece Agora
          </button>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-100">
          <h2 className="text-4xl font-bold text-center mb-12">Funcionalidades</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Lembretes Automatizados</h3>
              <p className="text-gray-600">
                Receba notificações por SMS, email e push para garantir que seus pacientes nunca esqueçam de tomar seus medicamentos.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Relatórios Personalizados</h3>
              <p className="text-gray-600">
                Geração de relatórios detalhados para monitorar o progresso dos tratamentos e compartilhar com médicos.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Segurança e Privacidade</h3>
              <p className="text-gray-600">
                Proteção de dados sensíveis com criptografia avançada e conformidade com regulamentações de proteção de dados.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12">Como Funciona</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-6">
              <h3 className="text-2xl font-bold mb-4">Fácil de Usar</h3>
              <p className="text-gray-600 mb-4">
                HealthMate é projetado para ser intuitivo e fácil de usar, tanto para pacientes quanto para profissionais de saúde. Basta cadastrar os medicamentos, definir horários e deixar o aplicativo cuidar do resto.
              </p>
              <button onClick={() => navigateTo('/signup')} className="bg-blue-600 text-white py-2 px-4 rounded-lg">
                Cadastre-se Agora
              </button>
            </div>
            <div className="md:w-1/2 p-6">
              <img src="/images/how-it-works.png" alt="Como Funciona" className="w-full h-auto" />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-gray-100">
          <h2 className="text-4xl font-bold text-center mb-12">Benefícios</h2>
          <ul className="space-y-4 text-lg text-gray-700 list-disc list-inside">
            <li>Melhora da Adesão ao Tratamento: Lembretes automatizados ajudam os pacientes a tomarem seus medicamentos no horário correto.</li>
            <li>Acompanhamento Facilitado: Profissionais de saúde podem acompanhar o progresso dos pacientes e ajustar tratamentos conforme necessário.</li>
            <li>Segurança e Privacidade: Dados sensíveis são protegidos por criptografia e conformidade com regulamentações de proteção de dados.</li>
            <li>Acesso Fácil a Medicamentos: Parcerias com farmácias permitem aos pacientes adquirir medicamentos facilmente, com indicações de locais de compra e possíveis descontos.</li>
            <li>Relatórios Personalizados: Profissionais de saúde podem gerar relatórios detalhados sobre o uso de medicamentos, ajudando no monitoramento e ajuste de tratamentos.</li>
          </ul>
        </section>

        {/* Future Features Section */}
        <section id="future-features" className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12">Funcionalidades Futuras</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Integração com Dispositivos Wearables</h3>
              <p className="text-gray-600">
                Monitore a saúde dos pacientes em tempo real através da integração com smartwatches e outros dispositivos vestíveis.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Análise Preditiva de Saúde</h3>
              <p className="text-gray-600">
                Utilize inteligência artificial para prever possíveis complicações e ajustar tratamentos preventivamente.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Consultas Virtuais</h3>
              <p className="text-gray-600">
                Agende e realize consultas virtuais diretamente pela plataforma, facilitando o contato entre pacientes e profissionais de saúde.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center">
          <p className="text-gray-600">&copy; 2024 HealthMate - Todos os Direitos Reservados</p>
        </footer>
      </div>
    </>
  );
}
