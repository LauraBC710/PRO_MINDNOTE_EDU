import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { isAdmin } = useAuth();

  return (
    <div className="sidebar">
      <h2>MindNote.EDU</h2>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              🏠 Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasks"
              end
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              📝 Tareas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/notificaciones"
              end
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              🔔 Notificaciones
            </NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                👥 Gestión de Usuarios
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
