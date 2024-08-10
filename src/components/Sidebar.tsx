import styles from '../styles/Sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBell, faRectangleList, faGear, faHandshake } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
    return (
        <aside className="w-1/5 bg-gray-100 p-4">
            <nav>
                <ul className="space-y-4">
                    <li><a href="#"><FontAwesomeIcon icon={faUsers} />Pacientes</a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faBell} />Notificações</a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faRectangleList} />Relatórios</a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faGear} />Configurações</a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faHandshake} />Parcerias</a></li>
                </ul>
            </nav>
            <div className="mt-auto">
                <a href="#" className="flex items-center p-2 text-red-600">
                    <span>Usuário</span>
                    <i className="ml-2 logout-icon"></i>
                </a>
            </div>
        </aside>
    );
}