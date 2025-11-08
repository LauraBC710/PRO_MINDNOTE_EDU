import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importar useAuth
import "../styles/Sidebar.css"; // Importar el archivo CSS

function Sidebar() {
  const { isAdmin, logout } = useAuth(); // Obtener isAdmin y logout del contexto

  return (
    <div className="sidebar">
      <h2>MindNote.EDU</h2>
      <nav>
        <ul>
          <li><Link to="/dashboard">🏠 Inicio</Link></li>
          <li><Link to="/tasks">📝 Tareas</Link></li>
          <li><Link to="/notificaciones">🔔 Notificaciones</Link></li>
          {isAdmin && ( // Renderizar condicionalmente para administradores
            <li><Link to="/admin"><span>👥</span>Gestión de Usuarios</Link></li>
          )}
          <li>
            <button onClick={logout} className="logout-button">
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
