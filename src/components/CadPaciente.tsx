import React, {useState} from 'react';

const CadPaciente = () => {
  const [date, setDate] = useState<string>('');

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja número
        if (input.length > 2) {
            input = `${input.slice(0, 2)}/${input.slice(2)}`;
        }
        if (input.length > 5) {
            input = `${input.slice(0, 5)}/${input.slice(5)}`;
        }
        setDate(input);
    };

  return (
    <div>
      <h2 className="text-center text-2xl font-semibold mb-6">Cadastro de Paciente</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input type="text" placeholder="Nome completo" className="border p-2 rounded" />
        <input type="text" placeholder="Sexo" className="border p-2 rounded" />
        <input type="text" placeholder="Data de nascimento" value={date} onChange={handleDateChange} maxLength={10} className="border p-2 rounded" />
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
  );
};

export default CadPaciente;
