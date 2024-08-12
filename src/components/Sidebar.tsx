import styles from '../styles/Sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers,
    faBell,
    faRectangleList,
    faGear,
    faHandshake,
    faSignOutAlt,
    faCircleUser
} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
    return (
        <aside className="flex flex-col w-1/5 bg-gray-100 p-4 justify-between">
            <nav>
                <ul className="space-y-4 w-40">
                    <li><a href="#"><FontAwesomeIcon icon={faUsers} className='me-4' />Pacientes</a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faBell} className='me-5' />Notificações</a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faRectangleList} className='me-4' />Relatórios</a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faGear} className='me-5' />Configurações</a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faHandshake} className='me-3' />Parcerias</a></li>
                </ul>
            </nav>
            <div className="flex items-end ">
                <div className='flex items-center'>
                    <div>
                        <a href="#" className="flex items-center p-2 ">
                            <FontAwesomeIcon icon={faCircleUser} className='me-2' />
                            <span> Usuário</span>
                        </a>
                    </div>
                    <button className='ml-12'>
                        <FontAwesomeIcon icon={faSignOutAlt} className='ms-2 text-red-600' />
                    </button>
                </div>
            </div>
        </aside>
    );
}