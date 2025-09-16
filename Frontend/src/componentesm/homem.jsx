import { NavLink, Link } from "react-router-dom";
import { Home, Calendar, User, LogOut } from "lucide-react";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#E3F2FD" }}>
      {/* SIDEBAR IZQUIERDO */}
      <aside className="w-72 h-screen bg-gray-900/80 backdrop-blur-md shadow-lg flex flex-col">
        {/* LOGO Y NOMBRE */}
        <div className="flex items-center gap-3 p-6 border-b border-white/20">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-12 h-12 object-contain"
          />
          <h1 className="text-lg font-bold text-white leading-tight">
            Optialmologic Clinic
          </h1>
        </div>

        {/* LINKS */}
        <nav className="flex-1 flex flex-col p-6 gap-4">
          <NavLink
            to="/homem"
            className="flex items-center gap-2 text-white hover:text-cyan-300"
          >
            <Home size={25} /> Inicio
          </NavLink>
          <NavLink
            to="/citas"
            className="flex items-center gap-2 text-white hover:text-cyan-300"
          >
            <Calendar size={25} /> Citas
          </NavLink>
          <NavLink
            to="/usuarios"
            className="flex items-center gap-2 text-white hover:text-cyan-300"
          >
            <User size={25} /> Pacientes
          </NavLink>
        </nav>

        {/* BOTÓN CERRAR SESIÓN */}
        <div className="p-6 border-t border-white/20">
          <button
            onClick={() => {
              // Redirigir al login
              window.location.href = "/home";
            }}
            className="flex items-center gap-2 w-full text-white hover:text-red-400"
          >
            <LogOut size={25} /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO CENTRAL */}
      <main className="flex-1 p-10 text-gray-800">
        <h2 className="text-2xl font-semibold mb-6">
          👋 Bienvenido, Dr. Samuel Nuñez
        </h2>

        <p className="text-lg text-gray-700 mb-8">
          Aquí podrá gestionar las citas y sus pacientes.
        </p>

        {/* BOTÓN VER CITAS */}
        <Link
          to="/citas"
          className="inline-block rounded-xl bg-[#1A73E8] px-6 py-3 text-white font-semibold shadow-lg
                     transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400
                     focus:ring-offset-2 focus:ring-offset-light"
        >
          Ver Citas
        </Link>

        {children}
      </main>

      {/* PANEL DE PERFIL DERECHO */}
      <aside className="w-72 h-screen bg-white shadow-lg flex flex-col items-center justify-start p-6 border-l border-gray-300">
        <img
          src="/medico.png" // reemplaza por la ruta real de la foto
          alt="Foto del doctor"
          className="w-32 h-32 rounded-full object-cover shadow-md mb-6"
        />
        <h3 className="text-xl font-bold text-gray-800">Samuel Nuñez</h3>
        <p className="text-gray-600 text-lg">Oftalmólogo</p>
        <p className="text-gray-600">Especialidad en Retina</p>
      </aside>
    </div>
  );
}
