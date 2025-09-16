import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Calendar, User, LogOut } from "lucide-react";

export default function Citas() {
  // Datos de ejemplo
  const citas = [
    { id_cita: 1, fecha: "2025-09-15", hora: "10:30 AM", motivo: "Consulta general", estado: "Pendiente", id_paciente: "P001" },
    { id_cita: 2, fecha: "2025-09-16", hora: "02:00 PM", motivo: "Control de visión", estado: "Completada", id_paciente: "P002" },
    { id_cita: 3, fecha: "2025-09-17", hora: "09:00 AM", motivo: "Examen de retina", estado: "Cancelada", id_paciente: "P003" },
  ];

  // Estado para filtrar
  const [filtroEstado, setFiltroEstado] = useState("");

  // Filtrar las citas según la opción seleccionada
  const citasFiltradas = filtroEstado
    ? citas.filter((cita) => cita.estado === filtroEstado)
    : citas;

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#E3F2FD" }}>
      {/* SIDEBAR */}
      <aside className="w-72 h-screen bg-gray-900/80 backdrop-blur-md shadow-lg flex flex-col">
        <div className="flex items-center gap-3 p-6 border-b border-white/20">
          <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
          <h1 className="text-lg font-bold text-white leading-tight">
            Optialmologic Clinic
          </h1>
        </div>

        {/* LINKS */}
        <nav className="flex-1 flex flex-col p-6 gap-4">
          <NavLink to="/homem" className="flex items-center gap-2 text-white hover:text-cyan-300">
            <Home size={25} /> Inicio
          </NavLink>
          <NavLink to="/citas" className="flex items-center gap-2 text-white hover:text-cyan-300">
            <Calendar size={25} /> Citas
          </NavLink>
          <NavLink to="/usuarios" className="flex items-center gap-2 text-white hover:text-cyan-300">
            <User size={25} /> Pacientes
          </NavLink>
        </nav>

        {/* BOTÓN CERRAR SESIÓN */}
        <div className="p-6 border-t border-white/20">
          <button
            onClick={() => { window.location.href = "/home"; }}
            className="flex items-center gap-2 w-full text-white hover:text-red-400"
          >
            <LogOut size={25} /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 p-10 text-gray-800">
        <h2 className="text-2xl font-semibold mb-6">📅 Gestión de Citas</h2>

        {/* FILTRO DE ESTADO */}
        <div className="mb-6 flex items-center gap-4">
          <label htmlFor="estado" className="font-semibold text-gray-700">
            Estado:
          </label>
          <select
            id="estado"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Completada">Completada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>

        {/* TABLA DE CITAS */}
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
              </tr>
            </thead>
            <tbody>
              {citasFiltradas.map((cita) => (
                <tr key={cita.id_cita} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-3">{cita.id_cita}</td>
                  <td className="px-6 py-3">{cita.fecha}</td>
                  <td className="px-6 py-3">{cita.hora}</td>
                  <td className="px-6 py-3">{cita.motivo}</td>
                  <td
                    className={`px-6 py-3 font-semibold ${
                      cita.estado === "Pendiente"
                        ? "text-yellow-600"
                        : cita.estado === "Completada"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {cita.estado}
                  </td>
                  <td className="px-6 py-3">{cita.id_paciente}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
