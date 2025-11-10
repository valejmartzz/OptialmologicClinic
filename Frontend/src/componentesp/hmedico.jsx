import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔹 Importa el hook de navegación
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const HistorialMedico = () => {
  const navigate = useNavigate(); // 🔹 Inicializa la navegación

  // 🔹 Datos del paciente
  const [paciente] = useState({
    nombre: "Erick Morales Aguirre",
    documento: "CC 1098765432",
  });

  // 🔹 Historial médico simulado
  const [historial] = useState([
    {
      fecha: "2025-01-14",
      diagnostico: "Miopía leve",
      tratamiento: "Uso de gafas con aumento -1.25",
      medico: "Dra. Laura Pérez",
    },
    {
      fecha: "2025-03-02",
      diagnostico: "Resequedad ocular",
      tratamiento: "Lágrimas artificiales 3 veces al día",
      medico: "Dr. Carlos Ruiz",
    },
    {
      fecha: "2025-06-28",
      diagnostico: "Control de visión",
      tratamiento: "Sin cambios en fórmula",
      medico: "Dra. Laura Pérez",
    },
  ]);

  // 🧾 Función para generar PDF
  const generarPDF = () => {
    const doc = new jsPDF();

    // Encabezado principal
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Clínica Optialmologic", 14, 20);

    doc.setFontSize(12);
    doc.text("Historial Médico del Paciente", 14, 28);
    doc.setLineWidth(0.5);
    doc.line(14, 30, 196, 30);

    // Información del paciente
    doc.setFont("helvetica", "normal");
    doc.text(`Nombre del paciente: ${paciente.nombre}`, 14, 40);
    doc.text(`Documento: ${paciente.documento}`, 14, 47);
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 54);

    // Tabla con historial
    const columnas = ["Fecha", "Diagnóstico", "Tratamiento", "Médico"];
    const filas = historial.map(item => [
      item.fecha,
      item.diagnostico,
      item.tratamiento,
      item.medico,
    ]);

    doc.autoTable({
      startY: 65,
      head: [columnas],
      body: filas,
      theme: "striped",
      headStyles: { fillColor: [25, 118, 210] },
    });

    // Guardar PDF
    doc.save(`Historial_${paciente.nombre.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen relative">
      {/* 🔙 Botón para volver al Home */}
      <button
        onClick={() => navigate("/Homep")}
        className="absolute top-6 left-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all"
      >
        Volver al Inicio
      </button>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          🩺 Historial Médico del Paciente
        </h1>

        {/* Información del paciente */}
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <p><strong>Nombre:</strong> {paciente.nombre}</p>
          <p><strong>Documento:</strong> {paciente.documento}</p>
          <p><strong>Fecha de generación:</strong> {new Date().toLocaleDateString()}</p>
        </div>

        {/* Tabla */}
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-3 px-4">Fecha</th>
              <th className="py-3 px-4">Diagnóstico</th>
              <th className="py-3 px-4">Tratamiento</th>
              <th className="py-3 px-4">Médico</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-blue-50 transition-colors"
              >
                <td className="py-3 px-4">{item.fecha}</td>
                <td className="py-3 px-4">{item.diagnostico}</td>
                <td className="py-3 px-4">{item.tratamiento}</td>
                <td className="py-3 px-4">{item.medico}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Botón PDF */}
        <div className="text-center mt-8">
          <button
            onClick={generarPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition-all"
          >
            📄 Descargar PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistorialMedico;
