import React, { useState } from 'react';
import Footer from "@/components/Footer";
import GoogleLogin from "@/components/GoogleLogin";
import Header from "@/components/Header";
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Cadastrar() {
    const [date, setDate] = useState<string>('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter();

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (input.length > 2) {
            input = `${input.slice(0, 2)}/${input.slice(2)}`;
        }
        if (input.length > 5) {
            input = `${input.slice(0, 5)}/${input.slice(5)}`;
        }
        setDate(input);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Botão Cadastrar-se clicado"); 
        try {
            const token = localStorage.getItem('token');
            // Faz a requisição ao backend para criar o novo profissional
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profissional`, {
                nome,
                email,
                telefone,
                senha,
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                // Redireciona para a tela de login após o cadastro
                router.push('/Login');
            } else {
                // Lida com possíveis respostas que não sejam 201
                console.error("Erro inesperado ao cadastrar profissional:", response.data);
            }
        } catch (error) {
            console.error("Erro ao cadastrar profissional:", error);
            // Adicione tratamento de erros aqui, por exemplo, exibir uma mensagem para o usuário
        }
    };

    return (
        <>
            <div className='h-screen'>
                <div className='fixed w-full'>
                    <Header />
                </div>
                <div className="flex justify-center items-center p-16 bg-gray-100 min-h-screen">
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-md w-full space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900">SEJA BEM-VINDO!</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Nome"
                                className="border rounded-lg p-2 w-full"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Sobrenome"
                                className="border rounded-lg p-2 w-full"
                                value={sobrenome}
                                onChange={(e) => setSobrenome(e.target.value)}
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Telefone"
                                className="border rounded-lg p-2 w-full"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="border rounded-lg p-2 w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                className="border rounded-lg p-2 w-full"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Data de Nascimento"
                                className="border rounded-lg p-2 w-full"
                                value={date}
                                onChange={handleDateChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                        >
                            Cadastrar-se
                        </button>
                        <div className="flex justify-center">
                            <GoogleLogin />
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </>
    );
}
