import React, { useState } from 'react';
import Footer from "@/components/Footer";
import GoogleLogin from "@/components/GoogleLogin";
import Header from "@/components/Header";

export default function Cadastrar() {
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
        <>
            <div>
                <Header />
            </div>
            <div className="flex justify-center items-center p-16 bg-gray-100">
                <form className="bg-white p-8 rounded-lg shadow-md max-w-md w-full space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">SEJA BEM-VINDO!</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Nome"
                            className="border rounded p-2 w-full"
                        />
                        <input
                            type="text"
                            placeholder="Sobrenome"
                            className="border rounded p-2 w-full"
                        />
                        <input
                            type="tel"
                            placeholder="Telefone"
                            className="border rounded p-2 w-full"
                        />
                        <input
                            type="text"
                            placeholder="Data de nascimento"
                            value={date}
                            onChange={handleDateChange}
                            maxLength={10}
                            className="border rounded p-2 w-full"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="border rounded p-2 w-full"
                        />
                        <input
                            type="email"
                            placeholder="Confirmar email"
                            className="border rounded p-2 w-full"
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            className="border rounded p-2 w-full"
                        />
                        <input
                            type="password"
                            placeholder="Confirmar senha"
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                        >
                            Cadastrar-se
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <GoogleLogin />
                    </div>
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}
