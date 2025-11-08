import React, { useState, useEffect } from 'react';
import './../styles/NewEditUserModal.css';

const NewEditUserModal = ({ user, isOpen, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    usuario_nombre: '',
    usuario_correo: '',
    rol_id: 2,
  });

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

  const handleDeleteClick = () => {
    if (user && onDelete) {
      onDelete(user.usuario_id);
    }
  };

  return (
    <div className="new-modal-overlay">
      <div className="new-modal-content">
        <div className="new-modal-header">
          <h2>Editar Usuario</h2>
          <button onClick={onClose} className="new-close-button">&times;</button>
        </div>
        <div className="new-modal-body">
          <form onSubmit={handleSubmit} className="new-edit-user-form">
            <div className="new-form-group">
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
            <div className="new-form-group">
              <label htmlFor="usuario_correo">Email</label>
              <input
                type="email"
                id="usuario_correo"
                name="usuario_correo"
                disabled
                value={formData.usuario_correo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="new-form-group">
              <label htmlFor="rol_id">Rol</label>
              <select
                id="rol_id"
                name="rol_id"
                value={formData.rol_id}
                onChange={handleChange}
              >
                <option value={1}>Administrador</option>
                <option value={2}>Usuario</option>
              </select>
            </div>
            <div className="new-modal-footer">
              {user && user.usuario_id && (
                <button type="button" className="new-btn-delete" onClick={handleDeleteClick}>Eliminar Usuario</button>
              )}
              <button type="button" className="new-btn-cancel" onClick={onClose}>Cancelar</button>
              <button type="submit" className="new-btn-save">Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewEditUserModal;
