import React, { useState, useEffect } from "react";
import "./../styles/Register.css";
import { useNavigate } from "react-router-dom";
import { register } from "../service/api";
import TermsAndConditionsModal from "../components/TermsAndConditionsModal"; // Importar el nuevo modal
import "./../styles/TermsAndConditionsModal.css"; // Importar los estilos del nuevo modal

function Register() {
  const [formData, setFormData] = useState({
    usuario_nombre: "",
    usuario_apellido: "",
    usuario_correo: "",
    usuario_contrasena: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false); // Estado para el modal de términos
  const [termsAccepted, setTermsAccepted] = useState(false); // Nuevo estado para el checkbox
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validarContrasena = (password) => {
    // Min 8 caracteres, al menos 1 letra y 1 número
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarContrasena(formData.usuario_contrasena)) {
      setModalMessage(
        "La contraseña debe tener al menos 8 caracteres, incluir una letra y un número."
      );
      setModalOpen(true);
      return;
    }

    if (!termsAccepted) {
      setModalMessage("Debes aceptar los Términos y Condiciones para registrarte.");
      setModalOpen(true);
      return;
    }

    try {
      const response = await register(formData); // Usar la función register de api.js

      if (response.success) {
        setModalMessage("¡Registro exitoso!");
      } else {
        setModalMessage(response.mensaje || "Error al registrar. Intenta de nuevo.");
      }
    } catch (error) {
      setModalMessage("Error al conectar con el servidor.");
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    if (modalMessage === "¡Registro exitoso!") {
      navigate("/login");
    }
  };

  const openTermsModal = () => {
    setShowTermsModal(true);
  };

  const closeTermsModal = () => {
    setShowTermsModal(false);
    setTermsAccepted(true); // Aceptar los términos al cerrar el modal
  };

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Registrar</h2>
        <label>
          Nombre:
          <input
            type="text"
            name="usuario_nombre"
            value={formData.usuario_nombre}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Apellido:
          <input
            type="text"
            name="usuario_apellido"
            value={formData.usuario_apellido}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="usuario_correo"
            value={formData.usuario_correo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="usuario_contrasena"
            value={formData.usuario_contrasena}
            onChange={handleChange}
            required
          />
        </label>

        <div className="terms-checkbox-container">
          <input
            type="checkbox"
            id="termsAccepted"
            checked={termsAccepted}
            readOnly // Hacer el checkbox de solo lectura
            required
          />
          <label htmlFor="termsAccepted">
            He leído y acepto los{" "}
            <a href="#" onClick={openTermsModal}>
              Términos y Condiciones
            </a>
          </label>
        </div>

        <button type="submit" disabled={!termsAccepted}>Crear cuenta</button>
        
      </form>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

      <TermsAndConditionsModal isOpen={showTermsModal} onClose={closeTermsModal} />
    </div>
  );
}

export default Register;
