import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Calendar, User, LogOut } from "lucide-react";

export default function Citas() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tipoAccion, setTipoAccion] = useState("");
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [formData, setFormData] = useState({ titulo: "", descripcion: "" });
  const [accionesGuardadas, setAccionesGuardadas] = useState({});
  const [modalVerOpen, setModalVerOpen] = useState(false);

  // Estado de las citas
  const [citas, setCitas] = useState([
    { id_cita: 1, fecha: "2025-09-15", hora: "10:30 AM", motivo: "Consulta general", estado: "Pendiente", id_paciente: "P001" },
    { id_cita: 2, fecha: "2025-09-16", hora: "02:00 PM", motivo: "Control de visión", estado: "Completada", id_paciente: "P002" },
    { id_cita: 3, fecha: "2025-09-17", hora: "09:00 AM", motivo: "Examen de retina", estado: "Cancelada", id_paciente: "P003" },
  ]);

  // 👉 Nuevo filtro de estado (select superior)
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const abrirModal = (cita, accion) => {
    setCitaSeleccionada(cita);
    setTipoAccion(accion);
    setFormData({ titulo: "", descripcion: "" });
    setModalOpen(true);
  };
  const cerrarModal = () => setModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAccionesGuardadas((prev) => {
      const prevAcciones = prev[citaSeleccionada.id_cita] || { recetas: [], diagnosticos: [] };
      const nuevaAccion =
        tipoAccion === "Receta"
          ? { ...prevAcciones, recetas: [...prevAcciones.recetas, { ...formData }] }
          : { ...prevAcciones, diagnosticos: [...prevAcciones.diagnosticos, { ...formData }] };

      return { ...prev, [citaSeleccionada.id_cita]: nuevaAccion };
    });
    cerrarModal();
  };

  const abrirVerModal = (cita) => {
    setCitaSeleccionada(cita);
    setModalVerOpen(true);
  };
  const cerrarVerModal = () => setModalVerOpen(false);

  const cambiarEstado = (id, nuevoEstado) => {
    setCitas((prev) =>
      prev.map((c) =>
        c.id_cita === id ? { ...c, estado: nuevoEstado } : c
      )
    );
  };

  // 👉 Filtrar las citas según el select superior
  const citasFiltradas = citas.filter(c =>
    filtroEstado === "Todos" ? true : c.estado === filtroEstado
  );

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#E3F2FD" }}>
      {/* SIDEBAR */}
      <aside className="w-72 h-screen bg-gray-900/80 backdrop-blur-md shadow-lg flex flex-col">
        <div className="flex items-center gap-3 p-6 border-b border-white/20">
          <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
          <h1 className="text-lg font-bold text-white">Optialmologic Clinic</h1>
        </div>
        <nav className="flex-1 flex flex-col p-6 gap-4">
          <NavLink to="/homem" className="flex items-center gap-2 text-white hover:text-cyan-300"><Home size={25}/> Inicio</NavLink>
          <NavLink to="/citas" className="flex items-center gap-2 text-white hover:text-cyan-300"><Calendar size={25}/> Citas</NavLink>
          <NavLink to="/usuarios" className="flex items-center gap-2 text-white hover:text-cyan-300"><User size={25}/> Pacientes</NavLink>
        </nav>
        <div className="p-6 border-t border-white/20">
          <button onClick={() => (window.location.href = "./componentes/home")}
            className="flex items-center gap-2 w-full text-white hover:text-red-400">
            <LogOut size={25}/> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 p-10 text-gray-800">
        <h2 className="text-2xl font-semibold mb-6">📅 Gestión de Citas</h2>

        {/* 👉 Nuevo select de filtro de estado */}
        <div className="mb-4 flex items-center gap-2">
          <label className="font-medium text-gray-700">Estado:</label>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-cyan-300"
          >
            <option value="Todos">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Completada">Completada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>

        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                <th className="px-6 py-3">ID Cita</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Hora</th>
                <th className="px-6 py-3">Motivo</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">ID Paciente</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citasFiltradas.map((cita) => (
                <tr key={cita.id_cita} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-3">{cita.id_cita}</td>
                  <td className="px-6 py-3">{cita.fecha}</td>
                  <td className="px-6 py-3">{cita.hora}</td>
                  <td className="px-6 py-3">{cita.motivo}</td>

                  {/* Select para cambiar estado de la fila */}
                  <td className="px-6 py-3">
                    <select
                      value={cita.estado}
                      onChange={(e) => cambiarEstado(cita.id_cita, e.target.value)}
                      className={`border rounded-md px-2 py-1 focus:outline-none ${
                        cita.estado === "Pendiente"
                          ? "text-yellow-700"
                          : cita.estado === "Completada"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Completada">Completada</option>
                      <option value="Cancelada">Cancelada</option>
                    </select>
                  </td>

                  <td className="px-6 py-3">{cita.id_paciente}</td>

                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() => abrirModal(cita, "Receta")}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm shadow"
                    >
                      Agregar Receta
                    </button>
                    <button
                      onClick={() => abrirModal(cita, "Diagnóstico")}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm shadow"
                    >
                      Agregar Diagnóstico
                    </button>
                    <button
                      onClick={() => abrirVerModal(cita)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm shadow"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODALES (sin cambios) */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {tipoAccion} para cita #{citaSeleccionada?.id_cita}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={cerrarModal}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancelar</button>
                <button type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalVerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">
              Detalles de la cita #{citaSeleccionada?.id_cita}
            </h3>
            {(() => {
              const datos = accionesGuardadas[citaSeleccionada?.id_cita] || { recetas: [], diagnosticos: [] };
              return (
                <>
                  <div className="mb-4">
                    <h4 className="font-bold text-blue-600">Recetas</h4>
                    {datos.recetas.length > 0 ? (
                      <ul className="list-disc ml-5">
                        {datos.recetas.map((r, i) => (
                          <li key={i}><strong>{r.titulo}:</strong> {r.descripcion}</li>
                        ))}
                      </ul>
                    ) : <p className="text-gray-500">Sin recetas</p>}
                  </div>
                  <div>
                    <h4 className="font-bold text-green-600">Diagnósticos</h4>
                    {datos.diagnosticos.length > 0 ? (
                      <ul className="list-disc ml-5">
                        {datos.diagnosticos.map((d, i) => (
                          <li key={i}><strong>{d.titulo}:</strong> {d.descripcion}</li>
                        ))}
                      </ul>
                    ) : <p className="text-gray-500">Sin diagnósticos</p>}
                  </div>
                </>
              );
            })()}
            <div className="flex justify-end mt-6">
              <button onClick={cerrarVerModal}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
