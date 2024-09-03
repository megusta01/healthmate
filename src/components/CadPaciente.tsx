import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CadPaciente = () => {
    const [formData, setFormData] = useState({
        nome: '',
        sexo: 'masculino',
        dataNascimento: '',
        email: '',
        rua: '',
        numero: '',
        cidade: '',
        estado: '',
        cep: '',
        telefone: '',
        medicamento: '',
        dosagem: '',
        horario: '',
        observacoes: ''
    });
    
    const router = useRouter();

    // Função genérica para atualizar os campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (input.length > 2) {
            input = `${input.slice(0, 2)}/${input.slice(2)}`;
        }
        if (input.length > 5) {
            input = `${input.slice(0, 5)}/${input.slice(5)}`;
        }
        setFormData({
            ...formData,
            dataNascimento: input
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Desestruturação dos dados
            const { nome, sexo, dataNascimento, email, rua, numero, cidade, estado, cep, telefone, medicamento, dosagem, horario, observacoes } = formData;
            
            const enderecoJson = {
                rua,
                numero,
                cidade,
                estado,
                cep
            };

            console.log("Dados do Paciente:", {
                nome,
                email,
                telefone,
                endereco: enderecoJson,
                senha: "1234567890",
                dataNascimento,
                sexo
            });

            const pacienteResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pacientes`, {
                nome,
                email,
                telefone,
                endereco: enderecoJson,
                senha: "1234567890",
                dataNascimento,
                sexo
            });

            if (pacienteResponse.status === 201) {
                const paciente = pacienteResponse.data;

                console.log("Dados do Medicamento:", {
                    nome: medicamento,
                    descricao: observacoes,
                    dosagem,
                    horario,
                    quantidade: 1,
                    pacienteId: paciente.id,
                });

                const medicamentoResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/medicamentos`, {
                    nome: medicamento,
                    descricao: observacoes,
                    dosagem,
                    horario,
                    quantidade: 1,
                    pacienteId: paciente.id,
                });

                if (medicamentoResponse.status === 201) {
                    alert('Paciente e medicamento cadastrados com sucesso!');
                    setFormData({
                        nome: '',
                        sexo: 'masculino',
                        dataNascimento: '',
                        email: '',
                        rua: '',
                        numero: '',
                        cidade: '',
                        estado: '',
                        cep: '',
                        telefone: '',
                        medicamento: '',
                        dosagem: '',
                        horario: '',
                        observacoes: ''
                    });
                    router.push('/');
                } else {
                    console.error('Erro ao cadastrar medicamento:', medicamentoResponse.data);
                    alert('Erro ao cadastrar medicamento. Por favor, tente novamente.');
                }
            } else {
                console.error('Erro ao cadastrar paciente:', pacienteResponse.data);
                alert('Erro ao cadastrar paciente. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar paciente e medicamento:', error);
            alert('Erro ao cadastrar paciente e medicamento. Por favor, tente novamente.');
        }
    };

    const { nome, sexo, dataNascimento, email, rua, numero, cidade, estado, cep, telefone, medicamento, dosagem, horario, observacoes } = formData;

    return (
        <div>
            <h2 className="text-center text-2xl font-semibold mb-6">Cadastro de Paciente</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome completo"
                        className="border p-2 rounded"
                        value={nome}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="sexo"
                        className="border p-2 rounded"
                        value={sexo}
                        onChange={handleChange}
                        required
                    >
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="outro">Outro</option>
                    </select>
                    <input
                        type="text"
                        name="dataNascimento"
                        placeholder="Data de nascimento"
                        value={dataNascimento}
                        onChange={handleDateChange}
                        maxLength={10}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="border p-2 rounded"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="rua"
                        placeholder="Rua"
                        className="border p-2 rounded"
                        value={rua}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="numero"
                        placeholder="Número"
                        className="border p-2 rounded"
                        value={numero}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="cidade"
                        placeholder="Cidade"
                        className="border p-2 rounded"
                        value={cidade}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="estado"
                        placeholder="Estado"
                        className="border p-2 rounded"
                        value={estado}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="cep"
                        placeholder="CEP"
                        className="border p-2 rounded"
                        value={cep}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="telefone"
                        placeholder="Telefone"
                        className="border p-2 rounded"
                        value={telefone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <hr className="my-6" />

                <h3 className="text-center text-xl font-semibold mb-4">Medicamento</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <input
                        type="text"
                        name="medicamento"
                        placeholder="Nome do medicamento"
                        className="border p-2 rounded"
                        value={medicamento}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="dosagem"
                        placeholder="Dosagem"
                        className="border p-2 rounded"
                        value={dosagem}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="horario"
                        placeholder="Horário de administração"
                        className="border p-2 rounded"
                        value={horario}
                        onChange={handleChange}
                    />
                    <textarea
                        name="observacoes"
                        placeholder="Observações (opcional)"
                        className="border p-2 rounded col-span-2"
                        value={observacoes}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                >
                    Cadastrar Paciente
                </button>
            </form>
        </div>
    );
};

export default CadPaciente;
