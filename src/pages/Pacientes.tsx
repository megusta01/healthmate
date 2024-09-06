import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "@/components/Header";
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@/components/Modal';
import CadPaciente from '@/components/CadPaciente';
import React from 'react';
import styles from '../styles/pacientes.module.css'; // Importando o CSS module

export default function Pacientes() {
    const [pacientes, setPacientes] = useState<{ id: number; nome: string; email: string; }[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Requisição ao backend para buscar a lista de pacientes
        const fetchPacientes = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pacientes`);
                setPacientes(response.data);
                setError(null); // Reset the error state if the request is successful
            } catch (err) {
                setError('Ocorreu um erro ao buscar os pacientes.');
                console.error(err);
            }
        };

        fetchPacientes();
    }, []);

    const [openModal, setOpenModal] = React.useState(false);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.title}>PACIENTES</h1>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead className={styles.tableHead}>
                            <tr>
                                <th scope="col" className={styles.tableHeaderCell}>Nome</th>
                                <th scope="col" className={styles.tableHeaderCell}>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacientes.length > 0 ? (
                                pacientes.map((paciente) => (
                                    <tr key={paciente.id} className={styles.tableRow}>
                                        <td className={styles.tableCell}>{paciente.nome}</td>
                                        <td className={styles.tableCell}>{paciente.email}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2} className={styles.emptyMessage}>
                                        Não há pacientes
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.newPatientButton} onClick={() => setOpenModal(true)}>
                        NOVO PACIENTE <FontAwesomeIcon icon={faUserPlus} />
                    </button>
                    <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
                        <CadPaciente />
                    </Modal>
                </div>
            </div>
        </>
    );
}
