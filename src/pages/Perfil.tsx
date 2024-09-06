import React from 'react';
import { RiContactsFill } from "react-icons/ri";
import { FaBriefcaseMedical } from "react-icons/fa";
import { HiOutlineNewspaper } from "react-icons/hi";
import { BsFillTelephoneFill } from "react-icons/bs";

export default function Perfil() {

  const perfil: React.CSSProperties = {
    backgroundColor: '#095947',
    padding: '30px 15px',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
  };

  const nav: React.CSSProperties = {
    border: '0.5px solid #f2f0f0',
    margin: '50px auto',
    width: '60%',
    maxWidth: '800px',
    padding: '0 0 50px 0',
    boxSizing: 'border-box',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
    position: 'relative',
  };

  const heading: React.CSSProperties = {
    fontSize: '2.5em',
    fontWeight: 'bold',
    margin: '0 0 15px 0',
    color: '#fff',
    letterSpacing: '1.5px',
  };

  const profileImage: React.CSSProperties = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    margin: '15px auto',
    display: 'block',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  };

  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    padding: '10px 20px',
    backgroundColor: '#fff',
    color: '#095947',
    border: '1px solid #095947',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  };

  const button: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
    marginTop: '50px',

  };

  const botão: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#fff',
    color: '#095947',
    border: '1px solid #095947',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    width: '600px',
    height: '70px',
    justifyContent: 'flex-start',
    gap: '15px',
  };

  return (
    <div className="nav" style={nav}>
      <button style={buttonStyle} onClick={() => window.location.href = '/Login'}>Voltar</button>
      <div className="perfil" style={perfil}>
        <img src="/profile-picture.jpg" alt="Perfil" style={profileImage} />
        <h1 style={heading}>Nome</h1>
      </div>
      <div style={button}>
        <button style={botão} onClick={() => window.location.href = '/'}><RiContactsFill/>Informações Pessoais</button>
        <button style={botão} onClick={() => window.location.href = '/'}><FaBriefcaseMedical />Medicamentos</button>
        <button style={botão} onClick={() => window.location.href = '/'}><HiOutlineNewspaper />Relatório</button>
        <button style={botão} onClick={() => window.location.href = '/'}><BsFillTelephoneFill />Suporte</button>
      </div>
    </div>
  );
}
