import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user object { id, roleId, name, ... }
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }

    const storedUserId = localStorage.getItem('user_id');
    const storedUserRole = localStorage.getItem('user_role');
    const storedUserName = localStorage.getItem('user_name'); // Nuevo: Obtener el nombre del usuario

    console.log("AuthContext useEffect - Stored User ID:", storedUserId);
    console.log("AuthContext useEffect - Stored User Role:", storedUserRole);
    console.log("AuthContext useEffect - Stored User Name:", storedUserName);


    if (storedUserId && storedUserRole) {
      setUser({
        usuario_id: storedUserId,
        rol_id: parseInt(storedUserRole, 10),
        usuario_nombre: storedUserName, // Nuevo: Asignar el nombre del usuario
      });
      console.log("AuthContext useEffect - User set:", {
        usuario_id: storedUserId,
        rol_id: parseInt(storedUserRole, 10),
        usuario_nombre: storedUserName,
      });
    } else {
      console.log("AuthContext useEffect - No stored user found.");
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    console.log("AuthContext login - UserData received:", userData);
    localStorage.setItem('user_id', userData.usuario_id);
    localStorage.setItem('user_role', userData.rol_id);
    localStorage.setItem('user_name', userData.usuario_nombre); // Nuevo: Guardar el nombre del usuario
    if (userData.token) {
      localStorage.setItem('token', userData.token);
      setToken(userData.token);
    }
    console.log("AuthContext login - Storing in localStorage: user_id=", userData.usuario_id, "user_role=", userData.rol_id, "user_name=", userData.usuario_nombre);

    setUser({
      usuario_id: userData.usuario_id,
      rol_id: userData.rol_id,
      usuario_nombre: userData.usuario_nombre, // Nuevo: Asignar el nombre del usuario
    });
    console.log("AuthContext login - User set in state:", {
      usuario_id: userData.usuario_id,
      rol_id: userData.rol_id,
      usuario_nombre: userData.usuario_nombre,
    });
  };

  const logout = () => {
    console.log("AuthContext logout - Clearing localStorage and state.");
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name'); // Nuevo: Eliminar el nombre del usuario
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  const isAdmin = user && user.rol_id === 1;
  const isClient = user && user.rol_id === 2;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin, isClient, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
