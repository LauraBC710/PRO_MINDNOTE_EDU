import React, { useState, useEffect } from "react";
import "./../styles/Profile.css";
import axios from "axios";

function Profile({ toggleProfile }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      axios.get(`http://localhost:3002/usuarios/${userId}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  return (
    <div className="profile-container" onClick={(e) => e.stopPropagation()}>
      <span className="close-button" onClick={toggleProfile}>&times;</span>
      <div className="profile-header">
        <h2>Perfil de Usuario</h2>
      </div>
      {user ? (
        <div className="profile-details">
          <p><strong>Nombre:</strong> {user.usuario_nombre}</p>
          <p><strong>Correo:</strong> {user.usuario_correo}</p>
          <p><strong>Rol:</strong> {user.rol_id === 1 ? 'administrador' : 'cliente'}</p>
          <button className="logout-button-profile" onClick={() => {
            localStorage.removeItem('user_id');
            window.location.replace("/login");
          }}>Cerrar Sesión</button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Profile;

