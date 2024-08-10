import React, { ReactNode } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import CadPaciente from './CadPaciente';


interface ModalProps {
  isOpen: boolean;
  children?: ReactNode;
  setModalOpen: () => void;
}

const BACKGROUND_STYLE: React.CSSProperties = {
  // position: 'fixed',
  // top: '0',
  // bottom: '0',
  // left: '0',
  // right: '0',
  // backgroundColor: 'rgb(0, 0, 0, 0.7)',
  // zIndex: 1000
}

const MODAL_STYLE: React.CSSProperties = {
  // position: 'fixed',
  // top: '50%',
  // right: '50%',
  // transform: 'translate(-50%, -50%)',
  // backgroundColor: 'white',
  // padding: '150px',
  // borderRadius: '4px',
  // zIndex: 1001
}

const Modal: React.FC<ModalProps> = ({ isOpen, setModalOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div style={BACKGROUND_STYLE}>
      <div style={MODAL_STYLE}>
        {children}
        <button className='' onClick={setModalOpen} style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        
      </div>
    </div>
  );
};

export default Modal;
