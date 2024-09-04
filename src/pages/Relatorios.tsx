/* eslint-disable @next/next/no-html-link-for-pages */
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Footer from '../components/Footer';

export default function Header() {

    const HEADER: React.CSSProperties = {
        backgroundColor: '#095947',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '15px 0',
        gap: '90px'
    }

    const NAV: React.CSSProperties = {
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        color: '#000',
        backgroundColor: '#fff',
        borderRadius: '30px',
        padding: '0px 20px'
    }

    const USUARIO: React.CSSProperties = {
        height: '36px',
        width: '36px',
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        fontSize: '36px',
    }

    const SECTION: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '50px 0',
        backgroundColor: '#f5f5f5',
    }

    const SECTION_DIV: React.CSSProperties = {
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: '30px 40px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }

    const SECTION_P: React.CSSProperties = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        padding: '5px 300px 30px 300px',
    }

    return (
        <>
            <header style={HEADER}>
                <Image src="/logo (1).svg" alt="" width={150} height={0} />
                <nav style={NAV}>
                    <ul className="flex gap-5">
                        <li><a href="">Pacientes</a></li>
                        <li><a href="">Notificações</a></li>
                        <li><a href="/Relatorios">Relatórios</a></li>
                    </ul>
                </nav>
                <div>
                    <a href="" style={USUARIO}>
                        <FontAwesomeIcon icon={faCircleUser} width={50} height={50} />
                    </a>
                </div>
            </header>
            <section style={SECTION}>
                <div style={SECTION_DIV}>
                    <p style={SECTION_P}>RELATÓRIO</p>
                </div>
            </section>
            <Footer />
        </>
    );
}


  