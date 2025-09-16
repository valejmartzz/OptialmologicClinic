import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Home, Calendar, User, Settings, LogOut, Sun, Globe, Bell, Lock } from "lucide-react";

export default function Ajustes() {
  const [tema, setTema] = useState(localStorage.getItem("tema") || "claro");
  const [idioma, setIdioma] = useState(localStorage.getItem("idioma") || "es");
  const [notificaciones, setNotificaciones] = useState(true);

  // Aplicar tema al body
  useEffect(() => {
    if (tema === "oscuro") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("tema", tema);
  }, [tema]);

  // Guardar idioma en localStorage
  useEffect(() => {
    localStorage.setItem("idioma", idioma);
  }, [idioma]);

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: tema === "oscuro" ? "#121212" : "#E3F2FD" }}
    >
      {/* SIDEBAR */}
      <aside className="w-72 h-screen bg-gray-900/80 backdrop-blur-md shadow-lg flex flex-col">
        {/* LOGO Y NOMBRE */}
        <div className="flex items-center gap-3 p-6 border-b border-white/20">
          <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
          <h1 className="text-lg font-bold text-white whitespace-normal leading-tight">
            Ophthalmology Clinic
          </h1>
        </div>

        {/* LINKS */}
        <nav className="flex-1 flex flex-col p-6 gap-4">
          <NavLink to="/homem" className="flex items-center gap-2 text-white hover:text-cyan-300">
            <Home size={25} /> {idioma === "es" ? "Inicio" : "Home"}
          </NavLink>
          <NavLink to="/citas" className="flex items-center gap-2 text-white hover:text-cyan-300">
            <Calendar size={25} /> {idioma === "es" ? "Citas" : "Appointments"}
          </NavLink>
          <NavLink to="/usuarios" className="flex items-center gap-2 text-white hover:text-cyan-300">
            <User size={25} /> {idioma === "es" ? "Usuarios" : "Users"}
          </NavLink>
          <NavLink
            to="/ajustes"
            className="flex items-center gap-2 text-cyan-300 font-semibold"
          >
            <Settings size={25} /> {idioma === "es" ? "Ajustes" : "Settings"}
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
            <LogOut size={25} /> {idioma === "es" ? "Cerrar sesión" : "Log out"}
          </button>
        </div>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 p-10 text-gray-800 dark:text-gray-100">
        <h1 className="text-2xl font-bold mb-6">
          ⚙️ {idioma === "es" ? "Ajustes" : "Settings"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tema */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sun size={20} /> <span>{idioma === "es" ? "Tema" : "Theme"}</span>
            </h2>
            <select
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:text-white"
            >
              <option value="claro">{idioma === "es" ? "Claro" : "Light"}</option>
              <option value="oscuro">{idioma === "es" ? "Oscuro" : "Dark"}</option>
            </select>
          </div>

          {/* Idioma */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe size={20} /> <span>{idioma === "es" ? "Idioma" : "Language"}</span>
            </h2>
            <select
              value={idioma}
              onChange={(e) => setIdioma(e.target.value)}
              className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:text-white"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Notificaciones */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell size={20} />{" "}
              <span>{idioma === "es" ? "Notificaciones" : "Notifications"}</span>
            </h2>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notificaciones}
                onChange={() => setNotificaciones(!notificaciones)}
              />
              <span>
                {idioma === "es"
                  ? "Activar notificaciones"
                  : "Enable notifications"}
              </span>
            </label>
          </div>

          {/* Cambiar contraseña */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lock size={20} />{" "}
              <span>{idioma === "es" ? "Cambiar contraseña" : "Change password"}</span>
            </h2>
            <form className="space-y-3">
              <input
                type="password"
                placeholder={idioma === "es" ? "Contraseña actual" : "Current password"}
                className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="password"
                placeholder={idioma === "es" ? "Nueva contraseña" : "New password"}
                className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="password"
                placeholder={
                  idioma === "es" ? "Confirmar nueva contraseña" : "Confirm new password"
                }
                className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                {idioma === "es" ? "Guardar cambios" : "Save changes"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
    