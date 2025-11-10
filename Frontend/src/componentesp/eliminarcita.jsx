import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ArrowLeft } from "lucide-react";

const EliminarCitas = () => {
  const navigate = useNavigate();

  // 🔹 Lista simulada de citas
  const [citas, setCitas] = useState([
    {
      id: 1,
      paciente: "Erick Morales",
      medico: "Dra. Laura Pérez",
      fecha: "2025-11-20",
      hora: "10:00 AM",
      motivo: "Control de visión",
    },
    {
      id: 2,
      paciente: "María Torres",
      medico: "Dr. Samuel Núñez",
      fecha: "2025-11-28",
      hora: "02:30 PM",
      motivo: "Chequeo postoperatorio",
    },
    {
      id: 3,
      paciente: "Carlos Ruiz",
      medico: "Dra. Andrea Castro",
      fecha: "2025-12-04",
      hora: "08:30 AM",
      motivo: "Dolor ocular",
    },
  ]);

  // 🔹 Mensaje visual
  const [mensaje, setMensaje] = useState("");

  // 🗑️ Función para eliminar una cita
  const eliminarCita = (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar esta cita?");
    if (confirmar) {
      const nuevasCitas = citas.filter((cita) => cita.id !== id);
      setCitas(nuevasCitas);
      setMensaje("✅ Cita eliminada correctamente.");
      setTimeout(() => setMensaje(""), 3000);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen relative">
      {/* 🔙 Botón para volver al inicio */}
      <button
        onClick={() => navigate("/Homep")}
        className="absolute top-6 left-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all"
      >
        <ArrowLeft size={18} /> Volver
      </button>

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          🗓️ Gestión de Citas — Eliminar
        </h1>

        {/* Mensaje de confirmación */}
        {mensaje && (
          <div className="bg-green-100 text-green-800 p-3 mb-4 rounded-lg text-center font-medium">
            {mensaje}
          </div>
        )}

        {/* Tabla de citas */}
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-3 px-4">Paciente</th>
              <th className="py-3 px-4">Médico</th>
              <th className="py-3 px-4">Fecha</th>
              <th className="py-3 px-4">Hora</th>
              <th className="py-3 px-4">Motivo</th>
              <th className="py-3 px-4 text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {citas.length > 0 ? (
              citas.map((cita) => (
                <tr
                  key={cita.id}
                  className="border-b hover:bg-blue-50 transition-colors"
                >
                  <td className="py-3 px-4">{cita.paciente}</td>
                  <td className="py-3 px-4">{cita.medico}</td>
                  <td className="py-3 px-4">{cita.fecha}</td>
                  <td className="py-3 px-4">{cita.hora}</td>
                  <td className="py-3 px-4">{cita.motivo}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => eliminarCita(cita.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg shadow-md flex items-center gap-2 mx-auto transition-all"
                    >
                      <Trash2 size={18} /> Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-6 text-center text-gray-500 italic"
                >
                  No hay citas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EliminarCitas;
