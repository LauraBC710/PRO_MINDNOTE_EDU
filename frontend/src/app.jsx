import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext"; // Importar AuthProvider
import ProtectedRoute from "./components/ProtectedRoute"; // Importar ProtectedRoute


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmailVerificationPage from "./pages/EmailVerificationPage"; // Importar el nuevo componente


function AppLayout() {
  const location = useLocation();


  const hiddenRoutes = ["/dashboard", "/tasks", "/admin"];
  const hideNavbar = hiddenRoutes.includes(location.pathname.toLowerCase());

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}

      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          
          {/* Rutas Protegidas */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tasks" 
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider> {/* Envolver AppLayout con AuthProvider */}
        <AppLayout />
      </AuthProvider>
    </Router>
  );
}

export default App;
