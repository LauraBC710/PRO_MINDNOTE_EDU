import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Profile from "../components/Profile";
import Modal from "../components/Modal";
import "./../styles/Tasks.css";

const Tasks = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      navigate("/login");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    tarea_titulo: "",
    tarea_descripcion: "",
    tarea_fechaLimite: "",
    tarea_hora: "",
    estado_id: "",
    prioridad_id: "",
    usuario_id: localStorage.getItem("user_id"),
    tipo_id: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: "", message: "" });
  const [tareas, setTareas] = useState([]);
  const [abiertos, setAbiertos] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false); // 👈 nuevo estado
  const today = new Date().toISOString().split("T")[0];

  const fetchTareas = async () => {
    try {
      const response = await fetch("http://localhost:3002/tareas");
      if (response.ok) {
        const data = await response.json();
        const userId = Number(localStorage.getItem("user_id"));
        const userTasks = data.filter((tarea) => tarea.usuario_id === userId);
        setTareas(userTasks);
      }
    } catch (error) {
      console.error("Error cargando tareas:", error);
    }
  };

  useEffect(() => {
    fetchTareas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/tareas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setModalInfo({
          title: "¡Éxito!",
          message: "Tarea registrada con éxito ✅",
        });
        setModalOpen(true);

        setFormData({
          tarea_titulo: "",
          tarea_descripcion: "",
          tarea_fechaLimite: "",
          tarea_hora: "",
          estado_id: "",
          prioridad_id: "",
          usuario_id: localStorage.getItem("user_id"),
          tipo_id: "",
        });

        fetchTareas();
      } else {
        setModalInfo({
          title: "Error",
          message: "Error al registrar la tarea ❌",
        });
        setModalOpen(true);
      }
    } catch (error) {
      console.error(error);
      setModalInfo({
        title: "Error",
        message: "Error de conexión con el servidor ❌",
      });
      setModalOpen(true);
    }
  };

  const toggleGrupo = (tipo) => {
    setAbiertos((prev) => ({ ...prev, [tipo]: !prev[tipo] }));
  };

  return (
    <div
      className={`dashboard-container ${
        sidebarOpen ? "is-sidebar-open" : ""
      }`}
    >
      {/* Botón hamburguesa */}
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle Sidebar"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setSidebarOpen(false)}
      ></div>

      <Sidebar />
      <div className="dashboard-main">
        <Header ProfileComponent={Profile} />
        <div className="dashboard-content">
          <h2>Gestión de Tareas</h2>

          <div className="tasks-container">
            {/* Formulario */}
            <form className="task-form" onSubmit={handleSubmit}>
              <h2>Registrar Nueva Tarea</h2>
              <input
                type="text"
                name="tarea_titulo"
                value={formData.tarea_titulo}
                onChange={handleChange}
                placeholder="Título de la tarea"
                required
              />

              <textarea
                name="tarea_descripcion"
                value={formData.tarea_descripcion}
                onChange={handleChange}
                placeholder="Descripción de la tarea"
                required
              />

              <label>Fecha Límite:</label>
              <input
                type="date"
                name="tarea_fechaLimite"
                value={formData.tarea_fechaLimite}
                onChange={handleChange}
                min={today}
                required
              />

              <label>Hora:</label>
              <input
                type="time"
                name="tarea_hora"
                value={formData.tarea_hora}
                onChange={handleChange}
                required
              />

              <label>Estado:</label>
              <select
                name="estado_id"
                value={formData.estado_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un estado</option>
                <option value="1">Pendiente</option>
                <option value="2">En Progreso</option>
                <option value="3">Completado</option>
                <option value="4">Cancelada</option>
              </select>

              <label>Prioridad:</label>
              <select
                name="prioridad_id"
                value={formData.prioridad_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione prioridad</option>
                <option value="1">Baja</option>
                <option value="2">Media</option>
                <option value="3">Alta</option>
                <option value="4">Crítica</option>
              </select>

              <label>Tipo:</label>
              <select
                name="tipo_id"
                value={formData.tipo_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione tipo</option>
                <option value="1">Académico</option>
                <option value="2">Personal</option>
                <option value="3">Recordatorio</option>
              </select>

              <button type="submit">Guardar Tarea</button>
            </form>

            {/* Lista de tareas */}
            <div className="tasks-list">
              <h3>📌 Lista de Tareas</h3>
              {tareas.length === 0 ? (
                <p>No tienes tareas registradas.</p>
              ) : (
                (() => {
                  const grupos = {
                    1: { nombre: "Académico 🎓", tareas: [] },
                    2: { nombre: "Personal 👋", tareas: [] },
                    3: { nombre: "Recordatorio ⌚", tareas: [] },
                  };

                  tareas.forEach((t) => {
                    if (grupos[t.tipo_id]) {
                      grupos[t.tipo_id].tareas.push(t);
                    }
                  });

                  return (
                    <div className="accordion">
                      {Object.entries(grupos).map(([tipo, grupo]) => (
                        <div key={tipo} className="accordion-item">
                          <button
                            className="accordion-header"
                            onClick={() => toggleGrupo(tipo)}
                          >
                            {grupo.nombre} ({grupo.tareas.length})
                          </button>

                          {abiertos[tipo] && grupo.tareas.length > 0 && (
                            <ul className="accordion-content">
                              {grupo.tareas.map((tarea) => (
                                <li key={tarea.tarea_id}>
                                  <strong>{tarea.tarea_titulo}</strong> <br />
                                  {tarea.tarea_descripcion} <br />
                                  ⏰{" "}
                                  {new Date(
                                    tarea.tarea_hora
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}{" "}
                                  - 📅{" "}
                                  {new Date(
                                    tarea.tarea_fechaLimite
                                  ).toLocaleDateString()}
                                </li>
                              ))}
                            </ul>
                          )}

                          {abiertos[tipo] && grupo.tareas.length === 0 && (
                            <p className="accordion-empty">
                              No hay tareas en esta categoría.
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })()
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        title={modalInfo.title}
        message={modalInfo.message}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Tasks;
