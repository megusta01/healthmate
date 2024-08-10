import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
        
      {/* Sidebar */}
        <Sidebar />
        {/* Header */}

      {/* Main Content */}
      <main className="flex-1 bg-white p-8">
        {/* Header */}
        

        {/* Welcome */}

        {/* Sections */}
        <section className="mb-4">
          <div className="bg-green-100 p-4 rounded-md">
            <h2 className="text-lg font-semibold">Últimos pacientes cadastrados</h2>
            <ul className="mt-2">
              <li>João Silva - 05/08/2024</li>
              <li>Maria Oliveira - 04/08/2024</li>
              <li>Carlos Pereira - 03/08/2024</li>
            </ul>
          </div>
        </section>

        <section className="mb-4">
          <div className="bg-gray-200 p-4 rounded-md">
            <h2 className="text-lg font-semibold">Últimas notificações enviadas</h2>
            <ul className="mt-2">
              <li>SMS para João Silva - 05/08/2024 - Enviado</li>
              <li>Email para Maria Oliveira - 04/08/2024 - Pendente</li>
              <li>Push para Carlos Pereira - 03/08/2024 - Enviado</li>
            </ul>
          </div>
        </section>

        <section className="mb-4">
          <div className="bg-yellow-100 p-4 rounded-md">
            <h2 className="text-lg font-semibold">Alertas Importantes</h2>
            <ul className="mt-2">
              <li>Medicamento X está próximo do vencimento para João Silva</li>
              <li>Maria Oliveira não tomou a medicação às 14h...</li>
              <li>Atualize suas informações de segurança.</li>
            </ul>
          </div>
        </section>

        {/* Button Novo Paciente */}
        <div className="flex justify-end">
          <button className="bg-green-700 text-white p-3 rounded-md flex items-center">
            Novo Paciente
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
