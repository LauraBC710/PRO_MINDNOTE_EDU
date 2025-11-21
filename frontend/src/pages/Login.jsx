import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/Login.css";
import { login as apiLogin } from "../service/api"; // Renombrar para evitar conflicto
import { useAuth } from "../context/AuthContext"; // Importar useAuth

function Login() {
  const [usuario_correo, setEmail] = useState("");
  const [usuario_contrasena, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin, user: authUser } = useAuth(); // Obtener la función login y el usuario del contexto

  useEffect(() => {
    if (authUser) { // Usar el usuario del contexto para la redirección
      navigate("/dashboard");
    }
  }, [authUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setModalMessage("");

    try {
      const response = await apiLogin(usuario_correo, usuario_contrasena);

      if (response.success) {
        console.log("Login successful, response.data:", response.data); // Añadir console.log
        authLogin({ ...response.data, token: response.token }); // Usar la función login del contexto
        setModalMessage("¡Inicio de sesión exitoso!");
        setShowModal(true);
      } else {
        setModalMessage(response.mensaje || "Correo electrónico o contraseña incorrectos.");
        setShowModal(true);
      }
    } catch (err) {
      setModalMessage("Error al conectar con el servidor.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (modalMessage === "¡Inicio de sesión exitoso!") {
      navigate("/dashboard"); // Usar navigate para una redirección más limpia
    }
  };

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Iniciar Sesión</h2>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="usuario_correo"
            value={usuario_correo}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="usuario_contrasena"
            value={usuario_contrasena}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
        <p className="register-link">
          ¿No tienes cuenta? <Link to="/Register">Regístrate aquí</Link>
        </p>
      </form>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{modalMessage === "¡Inicio de sesión exitoso!" ? "¡Bienvenido!" : "⚠ Error de inicio de sesión"}</h3>
            <p>{modalMessage}</p>
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Login;