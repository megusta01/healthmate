import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import CadPaciente from '@/components/CadPaciente';
import React from 'react';

const Dashboard = () => {
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <main className="w-3/4 bg-white p-4">
          <div className="flex justify-end">
            <button className="bg-green-900 text-white p-3 rounded-2xl flex items-center gap-2" onClick={() => setOpenModal(true)}>
              NOVO PACIENTE <FontAwesomeIcon icon={faUserPlus} />
            </button>
            <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
              <CadPaciente />
            </Modal>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
