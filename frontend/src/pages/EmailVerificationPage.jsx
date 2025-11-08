import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EmailVerificationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayMessage, setDisplayMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    const message = params.get('message');

    if (status === 'success') {
      setDisplayMessage(message || 'Tu correo electrónico ha sido verificado exitosamente.');
      setIsSuccess(true);
    } else {
      setDisplayMessage(message || 'Hubo un error al verificar tu correo electrónico.');
      setIsSuccess(false);
    }
  }, [location.search]);

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="login-container"> {/* Reutilizando el contenedor de login */}
      <div className="login-box">
        <h2>Verificación de Correo Electrónico</h2>
        <p className={isSuccess ? 'success-message' : 'error-message'}>
          {displayMessage}
        </p>
        <button onClick={handleGoToLogin} className="login-button">
          Ir a Iniciar Sesión
        </button>
      </div>
    </div>
  );
}

export default EmailVerificationPage;
