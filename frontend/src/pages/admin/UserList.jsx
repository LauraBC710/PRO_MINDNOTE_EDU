import React, { useState, useEffect, useCallback } from 'react';
import { getUsers, updateUser, deleteUser } from '../../service/api';
import NewEditUserModal from '../../components/NewEditUserModal';
import Header from '../../components/Header'; // Importar el componente Header
import Sidebar from '../../components/Sidebar'; // Importar el componente Sidebar
import Profile from '../../components/Profile'; // Importar el componente Profile
import './../../styles/UserListCards.css'; // Importar el nuevo CSS para las tarjetas
import './../../styles/AdminLayout.css'; // Importar el CSS para el layout de administración
import './../../styles/Modal.css'; // Importar el CSS para el modal genérico

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserListModal, setShowUserListModal] = useState(false); // Estado para el modal de UserList
    const [userListModalMessage, setUserListModalMessage] = useState(''); // Mensaje para el modal de UserList
    const [activeFilter, setActiveFilter] = useState(null); // Nuevo estado para el filtro activo: null para todos, 1 para Admin, 2 para Cliente

    const fetchUsers = useCallback(async (filterRoleId = null) => {
        try {
            const usersData = await getUsers(filterRoleId);
            // Ensure usersData is an array before setting state
            if (Array.isArray(usersData)) {
                setUsers(usersData);
            } else {
                console.error("getUsers did not return an array:", usersData);
                setUsers([]); // Set to empty array to prevent map error
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]); // Set to empty array on error
        }
    }, [getUsers]); // Add getUsers to dependency array

    useEffect(() => {
        fetchUsers(activeFilter);
    }, [fetchUsers, activeFilter]);

    const handleCloseUserListModal = () => {
        setShowUserListModal(false);
        setUserListModalMessage('');
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("¿Está seguro de que quiere eliminar este usuario?");
        if (isConfirmed) {
            try {
                await deleteUser(id);
                setUsers(users.filter(user => user.usuario_id !== id));
                setUserListModalMessage("Usuario eliminado con éxito.");
                setShowUserListModal(true);
                handleCloseModal(); // Cerrar el modal de edición después de eliminar
            } catch (error) {
                console.error("Error al eliminar el usuario:", error);
                setUserListModalMessage("Hubo un error al eliminar el usuario.");
                setShowUserListModal(true);
            }
        }
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    const handleSaveUser = async (userId, data) => {
        try {
            await updateUser(userId, data);
            setUsers(users.map(user =>
                user.usuario_id === userId ? { ...user, ...data } : user
            ));
            setUserListModalMessage("Usuario actualizado con éxito.");
            setShowUserListModal(true);
            handleCloseModal();
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            setUserListModalMessage("Hubo un error al actualizar el usuario.");
            setShowUserListModal(true);
        }
    };

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    return (
        <div className="admin-layout"> {/* Contenedor principal del layout */}
            <Header ProfileComponent={Profile} /> {/* Renderizar el Header y pasar Profile como prop */}
            <div className="admin-content-wrapper"> {/* Nuevo contenedor para Sidebar y Main Content */}
                <Sidebar /> {/* Renderizar el Sidebar */}
                <div className="main-content"> {/* Contenedor para el contenido principal de UserList */}
                    <div className="user-list">
                        <h2 className="user-cards-section-title">Gestionar Usuarios</h2>
                        <div className="filter-buttons">
                            <button
                                className={activeFilter === null ? 'active' : ''}
                                onClick={() => handleFilterChange(null)}
                            >
                                Todos
                            </button>
                            <button
                                className={activeFilter === 1 ? 'active' : ''}
                                onClick={() => handleFilterChange(1)}
                            >
                                Administradores
                            </button>
                            <button
                                className={activeFilter === 2 ? 'active' : ''}
                                onClick={() => handleFilterChange(2)}
                            >
                                Clientes
                            </button>
                        </div>
                        <div className="user-cards-container">
                            {users.map(user => (
                                <div key={user.usuario_id} className="user-card" onClick={() => handleEditClick(user)}>
                                    <h3>{user.usuario_nombre}</h3>
                                    <p><strong>ID:</strong> {user.usuario_id}</p>
                                    <p><strong>Email:</strong> {user.usuario_correo}</p>
                                    <p className="user-role"><strong>Rol:</strong> {user.rol_id === 1 ? 'Administrador' : 'Usuario'}</p>
                                </div>
                            ))}
                        </div>

                        <NewEditUserModal
                            isOpen={isEditModalOpen}
                            user={selectedUser}
                            onClose={handleCloseModal}
                            onSave={handleSaveUser}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>

            {showUserListModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{userListModalMessage.includes("éxito") ? "¡Operación Exitosa!" : "⚠ Error"}</h3>
                        <p>{userListModalMessage}</p>
                        <button onClick={handleCloseUserListModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;
