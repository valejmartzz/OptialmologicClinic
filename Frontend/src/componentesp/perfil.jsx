import { useState, useEffect } from "react";
import { Mail, Phone, Calendar, User, Edit3, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function PerfilPaciente() {
  const [paciente, setPaciente] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: "",
    fechaNacimiento: "",
    direccion: "",
  });



  
  const [resumenCitas, setResumenCitas] = useState({
    total: 0,
    pendientes: 0,
    completadas: 0,
  });

  useEffect(() => {
    // Simulación de datos obtenidos del backend
    setPaciente({
      nombres: "Ana María",
      apellidos: "Gómez López",
      correo: "ana.gomez@email.com",
      telefono: "3001234567",
      fechaNacimiento: "1998-07-15",
      direccion: "Calle 45 #12-34, Bogotá",
    });

    setResumenCitas({
      total: 8,
      pendientes: 2,
      completadas: 6,
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f9fc] py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <User className="w-10 h-10 text-[#1b2e59]" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-[#1b2e59]">
                Perfil del Paciente
              </h1>
              <p className="text-gray-500">Información personal y de contacto</p>
            </div>
          </div>
<Link
  to="/editarperfil"
  className="mt-4 md:mt-0 flex items-center bg-blue-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
>
  <Edit3 className="w-5 h-5 mr-2" /> Editar Perfil
</Link>

        </div>

        {/* Información del paciente */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 bg-[#f9fbfe] rounded-xl shadow-inner border border-blue-100">
            <h3 className="text-xl font-semibold text-[#1b2e59] mb-3">
              Datos Personales
            </h3>
            <p className="text-gray-700">
              <span className="font-medium">Nombre:</span>{" "}
              {paciente.nombres} {paciente.apellidos}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-medium">Fecha de Nacimiento:</span>{" "}
              {paciente.fechaNacimiento}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-medium">Dirección:</span> {paciente.direccion}
            </p>
          </div>

          <div className="p-6 bg-[#f9fbfe] rounded-xl shadow-inner border border-blue-100">
            <h3 className="text-xl font-semibold text-[#1b2e59] mb-3">
              Información de Contacto
            </h3>
            <p className="text-gray-700 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-blue-600" />
              {paciente.correo}
            </p>
            <p className="text-gray-700 flex items-center mt-3">
              <Phone className="w-5 h-5 mr-2 text-blue-600" />
              {paciente.telefono}
            </p>
          </div>
        </div>

        {/* Resumen de citas */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-md p-6 text-center border-t-4 border-blue-500">
            <h3 className="text-gray-700 font-medium text-lg">Total Citas</h3>
            <p className="text-3xl font-bold text-[#1b2e59] mt-2">
              {resumenCitas.total}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center border-t-4 border-yellow-400">
            <h3 className="text-gray-700 font-medium text-lg">Pendientes</h3>
            <p className="text-3xl font-bold text-[#1b2e59] mt-2">
              {resumenCitas.pendientes}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center border-t-4 border-green-500">
            <h3 className="text-gray-700 font-medium text-lg">Completadas</h3>
            <p className="text-3xl font-bold text-[#1b2e59] mt-2">
              {resumenCitas.completadas}
            </p>
          </div>
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-center space-x-6 mt-8">
          <Link
            to="/Homep"
            className="flex items-center bg-gray-100 text-[#1b2e59] px-5 py-2 rounded-xl font-medium hover:bg-gray-200 transition"
          >
            <Eye className="w-10 h-10 mr-4" /> Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
