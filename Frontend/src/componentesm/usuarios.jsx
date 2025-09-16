import { NavLink } from "react-router-dom";
import { Home, Calendar, User, Settings, LogOut } from "lucide-react";

export default function Usuarios() {
  const usuarios = [
    { id: 1, nombre: "Juan Pérez", correo: "juan@example.com", rol: "Paciente", estado: "Activo" },
    { id: 2, nombre: "Ana Gómez", correo: "ana@example.com", rol: "Médico", estado: "Inactivo" },
    { id: 3, nombre: "Carlos Ruiz", correo: "carlos@example.com", rol: "Administrador", estado: "Activo" },
  ];

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#E3F2FD" }}>
      {/* SIDEBAR */}
      <aside className="w-72 h-screen bg-gray-900/80 backdrop-blur-md shadow-lg flex flex-col">
        {/* LOGO Y NOMBRE */}
        <div className="flex items-center gap-3 p-6 border-b border-white/20">
          <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
          <h1 className="text-lg font-bold text-white whitespace-normal leading-tight">
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
            <User size={25} /> Usuarios
          </NavLink>
          <NavLink to="/ajustes" className="flex items-center gap-2 text-white hover:text-cyan-300">
            <Settings size={25} /> Ajustes
          </NavLink>
        </nav>

        {/* BOTÓN CERRAR SESIÓN */}
        <div className="p-6 border-t border-white/20">
          <button
            onClick={() => {
              window.location.href = "./componentes/home";
            }}
            className="flex items-center gap-2 w-full text-white hover:text-red-400"
          >
            <LogOut size={25} /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 p-10 text-gray-800">
        <h2 className="text-2xl font-semibold mb-6">👥 Gestión de Usuarios</h2>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                <th className="px-6 py-3 border-b">ID</th>
                <th className="px-6 py-3 border-b">Nombre</th>
                <th className="px-6 py-3 border-b">Correo</th>
                <th className="px-6 py-3 border-b">Rol</th>
                <th className="px-6 py-3 border-b">Estado</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="px-6 py-3 border-b">{user.id}</td>
                  <td className="px-6 py-3 border-b">{user.nombre}</td>
                  <td className="px-6 py-3 border-b">{user.correo}</td>
                  <td className="px-6 py-3 border-b">{user.rol}</td>
                  <td className="px-6 py-3 border-b">{user.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
