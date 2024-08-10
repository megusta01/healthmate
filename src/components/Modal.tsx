import React, { ReactNode } from 'react'

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
  backgroundColor: 'rgb(0, 0, 0, 0.7)',
  zIndex: 1000
}

const MODAL_STYLE: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  right: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '150px',
  borderRadius: '4px',
  zIndex: 1001
}

const Modal: React.FC<ModalProps> = ({ isOpen, setModalOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div style={BACKGROUND_STYLE}>
      <div style={MODAL_STYLE}>
        {children}
        <button onClick={setModalOpen}>X</button>
      </div>
    </div>
  );
};

export default Modal;
