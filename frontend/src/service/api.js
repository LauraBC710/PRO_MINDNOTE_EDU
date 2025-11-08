import axios from 'axios';

export const API_URL = 'http://localhost:3002';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { usuario_correo: email, usuario_contrasena: password });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data; // Backend already sends { success: false, mensaje: "..." }
        }
        return { success: false, mensaje: 'Error de conexión o del servidor.' };
    }
};

export const register = async (userData) => {
    try {
        const response = await api.post('/usuarios', userData);
        return { success: true, data: response.data }; // Assuming successful registration returns data
    } catch (error) {
        if (error.response && error.response.data) {
            return { success: false, mensaje: error.response.data.message || 'Error al registrar el usuario.' };
        }
        return { success: false, mensaje: 'Error de conexión o del servidor.' };
    }
};

export const getUsers = async (rol_id = null) => {
    let url = '/usuarios';
    if (rol_id !== null) {
        url = `/usuarios?rol_id=${rol_id}`;
    }
    const response = await api.get(url);
    return response.data;
};

export const updateUser = async (id, userData) => {
    const response = await api.patch(`/usuarios/${id}`, userData);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
};

export default api;
