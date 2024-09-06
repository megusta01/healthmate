import React from 'react';
import styles from '../styles/Perfil.module.css';
import { RiContactsFill } from "react-icons/ri";
import { FaBriefcaseMedical } from "react-icons/fa";
import { HiOutlineNewspaper } from "react-icons/hi";
import { BsFillTelephoneFill } from "react-icons/bs";

export default function Perfil() {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <button className={styles.buttonStyle} onClick={() => window.location.href = '/Login'}>Voltar</button>
        <div className={styles.perfil}>
          <img src="/profile-picture.jpg" alt="Perfil" className={styles.profileImage} />
          <h1 className={styles.heading}>Nome</h1>
        </div>
        <div className={styles.button}>
          <button className={styles.botao} onClick={() => window.location.href = '/'}><RiContactsFill />Informações Pessoais</button>
          <button className={styles.botao} onClick={() => window.location.href = '/'}><FaBriefcaseMedical />Medicamentos</button>
          <button className={styles.botao} onClick={() => window.location.href = '/'}><HiOutlineNewspaper />Relatório</button>
          <button className={styles.botao} onClick={() => window.location.href = '/'}><BsFillTelephoneFill />Suporte</button>
        </div>
      </div>
    </div>
  );
}
