import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faExclamationTriangle, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <main className="flex-1 bg-white p-8">
        <section className="mb-4">
          <div className="bg-green-100 p-8 rounded-3xl flex items-center">
            <div className='flex p-14 items-center'>
              <FontAwesomeIcon icon={faListCheck} className='text-4xl' />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Últimos pacientes cadastrados</h2>
              <ul className="mt-2">
                <li>João Silva - 05/08/2024</li>
                <li>Maria Oliveira - 04/08/2024</li>
                <li>Carlos Pereira - 03/08/2024</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-4">
          <div className="bg-gray-200 p-8 rounded-3xl flex items-center">
            <div className='flex p-14 items-center'>
              <FontAwesomeIcon icon={faBell} className='text-4xl' />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Últimas notificações enviadas</h2>
              <ul className="mt-2">
                <li>SMS para João Silva - 05/08/2024 - Enviado</li>
                <li>Email para Maria Oliveira - 04/08/2024 - Pendente</li>
                <li>Push para Carlos Pereira - 03/08/2024 - Enviado</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-4">
          <div className="bg-yellow-100 p-8 rounded-3xl flex items-center">
            <div className='flex p-14 items-center'>
              <FontAwesomeIcon icon={faExclamationTriangle} className='text-4xl' />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Alertas Importantes</h2>
              <ul className="mt-2">
                <li>Medicamento X está próximo do vencimento para João Silva</li>
                <li>Maria Oliveira não tomou a medicação às 14h...</li>
                <li>Atualize suas informações de segurança.</li>
              </ul>
            </div>
          </div>
        </section>


      </main>
    </div>
  );
};

export default Dashboard;
