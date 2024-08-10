import styles from '../styles/Sidebar.module.css';

export default function Sidebar() {
    return (
        <aside className="w-1/5 bg-gray-100 p-4 h-screen">
            <nav>
                <ul className="space-y-4">
                    <li><a href="#">Pacientes</a></li>
                    <li><a href="#">Notificações</a></li>
                    <li><a href="#">Relatórios</a></li>
                    <li><a href="#">Configurações</a></li>
                    <li><a href="#">Parcerias</a></li>
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