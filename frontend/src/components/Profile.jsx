import React, { useState, useEffect } from "react";
import "./../styles/Profile.css";
import axios from "axios";
import NewEditUserModal from "./NewEditUserModal"; // Importar el modal
import { API_URL } from "../service/api";

function Profile({ toggleProfile }) {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      axios.get(`${API_URL}/usuarios/${userId}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (userId, data) => {
    axios.put(`${API_URL}/usuarios/${userId}`, data)
      .then(response => {
        setUser(response.data); // Actualizar el usuario en el perfil
        handleCloseModal();
      })
      .catch(error => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    <>
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
      {user && (
        <NewEditUserModal
          user={user}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </>
  );
}

export default Profile;
