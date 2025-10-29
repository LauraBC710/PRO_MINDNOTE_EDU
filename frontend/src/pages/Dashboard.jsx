import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Profile from "../components/Profile";
import "./../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Header ProfileComponent={Profile} />
        <div className="dashboard-content">
          <h2>Bienvenido a Nuestro Sitio</h2>
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

