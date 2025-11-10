import React from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Inicio", icon: LayoutDashboard, path: "/admin" },
    { name: "Pacientes", icon: Users, path: "/admin/pacientes" },
    { name: "Citas", icon: Calendar, path: "/admin/citas" },
    { name: "Reportes", icon: FileText, path: "/admin/reportes" },
  ];

  // 🔹 Lista simulada de tareas pendientes
  const tareas = [
    { texto: "Revisar solicitudes de nuevas citas", estado: "pendiente" },
    { texto: "Actualizar historial de pacientes", estado: "progreso" },
    { texto: "Generar reporte semanal", estado: "hecho" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b flex flex-col items-center">
          {/* 🔹 Espacio para el logo */}
          <div className="mb-3">
            <img
              src="/logo.png"
              alt="Logo OptiSalud"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-blue-600 text-center">
            Ophtialmolgy Clinic
          </h1>
        </div>

        {/* 🔹 Navegación lateral */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* 🔹 Botón de cierre de sesión */}
        <div className="p-4 border-t">
          <button className="flex items-center gap-3 text-red-600 hover:text-red-700 font-medium w-full justify-center">
            <LogOut size={20} /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8 flex flex-col justify-center items-center text-center">
        <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-blue-700 mb-3">
            👋 Bienvenido Administrador
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Nos alegra verte de nuevo en el panel de administración de{" "}
            <span className="text-blue-600 font-semibold">Ophtialmolgy Clinic</span>.
            <br />
            Desde aquí puedes gestionar pacientes, citas, reportes y mantener
            todo el sistema en orden.
          </p>
        </div>

        {/* Aquí se renderizan las subrutas del administrador */}
        <Outlet />
      </main>

      {/* 🔹 Panel lateral derecho (tareas pendientes) */}
      <aside className="w-80 bg-white shadow-lg border-l flex flex-col p-6">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">
          🗓️ Cosas por hacer
        </h2>

        <ul className="space-y-3">
          {tareas.map((tarea, index) => {
            let Icon;
            let colorClass;
            if (tarea.estado === "hecho") {
              Icon = CheckCircle;
              colorClass = "text-green-500";
            } else if (tarea.estado === "progreso") {
              Icon = Clock;
              colorClass = "text-yellow-500";
            } else {
              Icon = AlertCircle;
              colorClass = "text-red-500";
            }

            return (
              <li
                key={index}
                className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2 transition"
              >
                <Icon className={colorClass} size={20} />
                <span className="text-gray-700">{tarea.texto}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 border-t pt-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all">
            + Agregar tarea
          </button>
        </div>
      </aside>
    </div>
  );
};

export default AdminLayout;
