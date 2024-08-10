import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Modal from "@/components/Modal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import CadPaciente from "@/components/CadPaciente";
import Dashboard from "@/components/Dashboard";



export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="w-3/4 bg-white p-4">
          <Dashboard />

          <div className="flex justify-end">
            <button className="bg-green-700 text-white p-3 rounded-lg flex items-center gap-2" onClick={() => setOpenModal(true)}>
              NOVO PACIENTE <FontAwesomeIcon icon={faUserPlus} />
            </button>
            <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
              <CadPaciente />
            </Modal>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
