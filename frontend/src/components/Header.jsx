import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import axios from "axios";

function Header({ ProfileComponent }) {
  const [isProfileOpen, setProfileOpen] = useState(false);
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

  const toggleProfile = () => {
    setProfileOpen(!isProfileOpen);
  };

  return (
    <header className="header">
      <h1>Panel de Control</h1>
      <div className="user-info" onClick={toggleProfile}>
        <p className="button-profile"><span>👤 </span>{user ? user.usuario_nombre : 'Usuario'}</p>
        {isProfileOpen && <ProfileComponent toggleProfile={toggleProfile} />}
      </div>
    </header>
  );
}

export default Header;
