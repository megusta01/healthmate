import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  isOpen: boolean;
  children?: ReactNode;
  setModalOpen: () => void;
}

const BACKGROUND_STYLE: React.CSSProperties = {
  position: 'fixed',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const MODAL_STYLE: React.CSSProperties = {
  position: 'relative',
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '8px',
  zIndex: 1001,
  width: '80%',
  maxWidth: '500px'
}

const Modal: React.FC<ModalProps> = ({ isOpen, setModalOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div style={BACKGROUND_STYLE} onClick={setModalOpen}>
      <div style={MODAL_STYLE} onClick={(e) => e.stopPropagation()}>
        <button className='absolute top-4 right-4 text-gray-500 hover:text-gray-700' onClick={setModalOpen}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
