import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import styles from '../styles/Modal.module.css'; // Importa o arquivo CSS module

interface ModalProps {
  isOpen: boolean;
  children?: ReactNode;
  setModalOpen: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setModalOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={setModalOpen}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
