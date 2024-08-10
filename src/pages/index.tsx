import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Modal from "@/components/Modal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';


export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="w-3/4 bg-white p-4">
          

          <div className="flex justify-end">
            <button className="bg-green-700 text-white p-3 rounded-md flex items-center" onClick={() => setOpenModal(true)}>
              NOVO PACIENTE <FontAwesomeIcon icon="user-plus" />
            </button>
            <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
              CONTEÚDO
              
            </Modal>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
