import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import axios from "axios";
import { API_URL } from "../service/api"; // Importar API_URL

function Header({ ProfileComponent }) {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      axios.get(`${API_URL}/usuarios/${userId}`) // Usar API_URL
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          setUser(null); // Reset user on error
        });
    } else {
      setUser(null); // Clear user if userId is not in localStorage
    }
  }, []);

  const toggleProfile = () => {
    setProfileOpen(!isProfileOpen);
  };

  return (
    <header className="header">
      <h1>Panel de Control</h1>
      <div className="user-info" onClick={toggleProfile}>
        <p className="button-profile"><span>👤 </span>{user ? user.usuario_nombre : 'Cargando...'}</p>
        {isProfileOpen && ProfileComponent && <ProfileComponent toggleProfile={toggleProfile} />}
      </div>
    </header>
  );
}

export default Header;
