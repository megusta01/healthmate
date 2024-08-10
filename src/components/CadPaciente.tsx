import React from 'react';

const CadPaciente = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg w-1/2 p-8 shadow-lg relative">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <i className="fas fa-times"></i>
        </button>
        <h2 className="text-center text-2xl font-semibold mb-6">Cadastro de Paciente</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="Nome completo" className="border p-2 rounded" />
          <input type="text" placeholder="Sexo" className="border p-2 rounded" />
          <input type="date" placeholder="Data de nascimento" className="border p-2 rounded" />
          <input type="email" placeholder="Email" className="border p-2 rounded" />
          <input type="text" placeholder="Endereço" className="border p-2 rounded" />
          <input type="tel" placeholder="Telefone" className="border p-2 rounded" />
        </div>

        <hr className="my-6" />

        <h3 className="text-center text-xl font-semibold mb-4">Medicamento</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="Nome do medicamento" className="border p-2 rounded" />
          <input type="text" placeholder="Dosagem" className="border p-2 rounded" />
          <input type="text" placeholder="Frequência" className="border p-2 rounded" />
          <input type="text" placeholder="Duração" className="border p-2 rounded" />
          <input type="text" placeholder="Horários" className="border p-2 rounded" />
          <textarea placeholder="Observações (opcional)" className="border p-2 rounded col-span-2"></textarea>
        </div>
        
        <div className="flex justify-end">
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CadPaciente;
