import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Usamos el componente Modal genérico
import './../styles/EditUserModal.css'; // Estilos dedicados para este modal

const EditUserModal = ({ user, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    usuario_nombre: '',
    usuario_correo: '',
    rol_id: 2,
  });

  // Cuando el usuario cambie, actualizamos el estado del formulario
  useEffect(() => {
    if (user) {
      setFormData({
        usuario_nombre: user.usuario_nombre || '',
        usuario_correo: user.usuario_correo || '',
        rol_id: user.rol_id || 2,
      });
    }
  }, [user]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'rol_id' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm("¿Está seguro de que quiere guardar los cambios?");
    if (isConfirmed) {
      onSave(user.usuario_id, formData);
    }
  };

  return (
    <Modal title="Editar Usuario" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="edit-user-form">
        <div className="form-body">
          <div className="form-group">
            <label htmlFor="usuario_nombre">Nombre</label>
            <input
              type="text"
              id="usuario_nombre"
              name="usuario_nombre"
              value={formData.usuario_nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="usuario_correo">Email</label>
            <input
              type="email"
              id="usuario_correo"
              name="usuario_correo"
              value={formData.usuario_correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rol_id">Rol</label>
            <select
              id="rol_id"
              name="rol_id"
              value={formData.rol_id}
              onChange={handleChange}
            >
              <option value={1}>Administador</option>
              <option value={2}>Usuario</option>
            </select>
          </div>
        </div>
        <div className="form-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn-save">Guardar Cambios</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserModal;
