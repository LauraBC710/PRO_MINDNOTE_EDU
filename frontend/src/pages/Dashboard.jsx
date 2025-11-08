import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Profile from "../components/Profile";
import "../styles/Dashboard.css";
import { useAuth } from "../context/AuthContext"; // Importar useAuth

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth(); // Obtener user y loading del AuthContext

  useEffect(() => {
    // Si el AuthContext ya está cargando, no hacer nada
    if (authLoading) {
      return;
    }

    // Si no hay usuario autenticado, redirigir al login
    if (!user) {
      navigate("/login");
      return;
    }

    // Si el usuario ya está cargado en el contexto, no es necesario hacer la llamada a la API
    // y podemos establecer loading a false
    setLoading(false);

    // La lógica de fetchPerfil ya no es necesaria aquí si el nombre del usuario
    // se obtiene del contexto. Si necesitas otros datos del perfil que no están en el contexto,
    // puedes mantener una versión simplificada de fetchPerfil.
    // Por ahora, la eliminamos para simplificar.

  }, [navigate, user, authLoading]); // Dependencias actualizadas

  // {Sidebar responsive
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768 && sidebarOpen) setSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [sidebarOpen]);

  const toggleSidebar = () => setSidebarOpen((v) => !v);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={`dashboard-container ${sidebarOpen ? "is-sidebar-open" : ""}`}>
      {/* SIDEBAR */}
      <aside id="sidebar" className="sidebar-wrapper">
        <Sidebar />
      </aside>

      {/* Fondo que cierra el sidebar al hacer click */}
      {sidebarOpen && <div className="sidebar-backdrop" onClick={closeSidebar} />}

      {/* CONTENIDO PRINCIPAL */}
      <div className="dashboard-main">
        {/* Botón de menú móvil */}
        <button
          className="sidebar-toggle"
          aria-label="Abrir menú"
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          onClick={toggleSidebar}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Header con componente de perfil */}
        <Header ProfileComponent={Profile} />

        <div className="dashboard-content">
          <h2>
            {loading || authLoading // Usar loading del AuthContext también
              ? "Cargando..."
              : `Bienvenido${user && user.usuario_nombre ? ` ${user.usuario_nombre}` : ""}!`}
          </h2>
          <p>Has iniciado sesión correctamente.</p>

          <div className="cards-container">
            <div className="card">
              <h3>📝 Tareas</h3>
              <p>Organiza y administra tus tareas pendientes.</p>
            </div>
            <div className="card">
              <h3>🔔 Notificaciones</h3>
              <p>Consulta tus últimas alertas y recordatorios.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
