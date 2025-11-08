import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole, redirectPath = '/login' }) => {
  const { user, loading, isAdmin, isClient } = useAuth();

  if (loading) {
    return <div>Cargando autenticación...</div>; // O un spinner de carga
  }

  if (!user) {
    // Si no hay usuario autenticado, redirigir a la página de login
    return <Navigate to={redirectPath} replace />;
  }

  if (requiredRole) {
    // Si se requiere un rol específico
    if (requiredRole === 'admin' && !isAdmin) {
      // Si se requiere admin y el usuario no lo es, redirigir al dashboard o a una página de no autorizado
      return <Navigate to="/dashboard" replace />; // O a una página de "Acceso Denegado"
    }
    if (requiredRole === 'client' && !isClient) {
      // Si se requiere cliente y el usuario no lo es, redirigir al dashboard o a una página de no autorizado
      return <Navigate to="/dashboard" replace />; // O a una página de "Acceso Denegado"
    }
  }

  return children;
};

export default ProtectedRoute;
