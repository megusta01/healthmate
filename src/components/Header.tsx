import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

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


    return (
        <header style={HEADER}>
            <Image src="/logo (1).svg" alt="" width={150} height={0} />
            <nav style={NAV}>
                <ul className="flex gap-5">
                    <li><a href="">Dashboard</a></li>
                    <li><a href="">Pacientes</a></li>
                    <li><a href="">Notificações</a></li>
                    <li><a href="">Relatórios</a></li>
                </ul>
            </nav>
            <div >
                <a href="" style={USUARIO}>
                    <FontAwesomeIcon icon={faCircleUser} width={50} height={50} />
                </a>
            </div>
        </header>
    );
}
