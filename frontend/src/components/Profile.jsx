import React, { useState, useEffect } from "react";
import "./../styles/Profile.css";
import axios from "axios";

function Profile({ toggleProfile }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      axios.get(`http://localhost:3001/usuarios/${userId}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  return (
    <div className="profile-container">
      <span className="close-button" onClick={toggleProfile}>&times;</span>
      <div className="profile-header">
        <h2>Perfil de Usuario</h2>
      </div>
      {user ? (
        <div className="profile-details">
          <p><strong>Nombre:</strong> {user.usuario_nombre}</p>
          <p><strong>Correo:</strong> {user.usuario_correo}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Profile;

