import { useState, useEffect } from "react";
import { Search, User, Phone, Mail, Calendar } from "lucide-react";

export default function PacientesMedico() {
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    // Simular datos de pacientes
    setPacientes([
      {
        id: 1,
        nombres: "Ana",
        apellidos: "Gómez",
        correo: "ana.gomez@email.com",
        telefono: "3001234567",
        fechaNacimiento: "1985-05-15",
        ultimaCita: "2025-01-05",
        citasTotales: 5
      },
      {
        id: 2,
        nombres: "Carlos",
        apellidos: "Rodríguez", 
        correo: "carlos.rodriguez@email.com",
        telefono: "3007654321",
        fechaNacimiento: "1978-12-20",
        ultimaCita: "2025-01-08",
        citasTotales: 3
      }
    ]);
  }, []);

  const pacientesFiltrados = pacientes.filter(paciente =>
    `${paciente.nombres} ${paciente.apellidos}`.toLowerCase().includes(busqueda.toLowerCase()) ||
    paciente.correo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mis Pacientes</h1>
        <span className="text-gray-600">{pacientes.length} pacientes</span>
      </div>

      {/* Búsqueda */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar pacientes..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Lista de Pacientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pacientesFiltrados.map((paciente) => (
          <div key={paciente.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {paciente.nombres} {paciente.apellidos}
                </h3>
                <p className="text-sm text-gray-600">
                  {Math.floor((new Date() - new Date(paciente.fechaNacimiento)) / (365.25 * 24 * 60 * 60 * 1000))} años
                </p>
              </div>
            </div>

            {/* Información de contacto */}
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>{paciente.telefono}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span className="truncate">{paciente.correo}</span>
              </div>
            </div>

            {/* Información médica */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-gray-600">Total Citas</p>
                  <p className="font-semibold text-gray-900">{paciente.citasTotales}</p>
                </div>
                <div>
                  <p className="text-gray-600">Última Cita</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(paciente.ultimaCita).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700">
                Ver Historial
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm hover:bg-gray-300">
                Agendar Cita
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}