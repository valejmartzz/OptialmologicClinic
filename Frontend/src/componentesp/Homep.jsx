import { useState, useEffect } from "react";
import { Calendar, Clock, User, Eye, Plus, FileText, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Homep() {
  const [pacienteData, setPacienteData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: ""
  });
  
  const [citasProximas, setCitasProximas] = useState([]);
  const [citasRecientes, setCitasRecientes] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    totalCitas: 0,
    pendientes: 0,
    completadas: 0
  });
  
  const [loading, setLoading] = useState(true);

  // Obtener datos del paciente
  useEffect(() => {
    const fetchPacienteData = async () => {
      try {
        // Datos del paciente (simulados por ahora)
        setPacienteData({
          nombres: "Ana",
          apellidos: "Gómez",
          correo: "ana.gomez@email.com",
          telefono: "3001234567"
        });

        // Citas próximas (datos de ejemplo)
        setCitasProximas([
          {
            id_cita: 1,
            fecha: "2025-01-10",
            hora: "10:00:00",
            medico: "Dr. Samuel Nuñez",
            especialidad: "Oftalmología General",
            estado: "programada"
          }
        ]);

        // Citas recientes (datos de ejemplo)
        setCitasRecientes([
          {
            id_cita: 2,
            fecha: "2025-01-05",
            hora: "14:30:00",
            medico: "Dra. María Rodríguez",
            especialidad: "Consulta de control",
            estado: "completada"
          }
        ]);

        // Estadísticas
        setEstadisticas({
          totalCitas: 5,
          pendientes: 1,
          completadas: 4
        });

        setLoading(false);
      } catch (error) {
        console.error("Error cargando datos:", error);
        setLoading(false);
      }
    };

    fetchPacienteData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Hola, {pacienteData.nombres} {pacienteData.apellidos}
          </h1>
          <p className="text-gray-600 mt-2">Bienvenido a tu panel de paciente</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Citas</p>
                <p className="text-2xl font-bold text-gray-900">{estadisticas.totalCitas}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-gray-900">{estadisticas.pendientes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completadas</p>
                <p className="text-2xl font-bold text-gray-900">{estadisticas.completadas}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Citas Próximas */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Citas Próximas
              </h2>
            </div>
            <div className="p-6">
              {citasProximas.length > 0 ? (
                <div className="space-y-4">
                  {citasProximas.map((cita) => (
                    <div key={cita.id_cita} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{cita.especialidad}</h3>
                          <p className="text-sm text-gray-600 mt-1">{cita.medico}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{new Date(cita.fecha).toLocaleDateString()}</span>
                            <Clock className="h-4 w-4 ml-3 mr-1" />
                            <span>{cita.hora.slice(0, 5)}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          cita.estado === 'programada' ? 'bg-blue-100 text-blue-800' : 
                          cita.estado === 'completada' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {cita.estado}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No tienes citas próximas</p>
              )}
              
              <Link
                to="/nueva-cita"
                className="mt-4 flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nueva Cita
              </Link>
            </div>
          </div>

          {/* Citas Recientes */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-green-600" />
                Citas Recientes
              </h2>
            </div>
            <div className="p-6">
              {citasRecientes.length > 0 ? (
                <div className="space-y-4">
                  {citasRecientes.map((cita) => (
                    <div key={cita.id_cita} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{cita.especialidad}</h3>
                          <p className="text-sm text-gray-600 mt-1">{cita.medico}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{new Date(cita.fecha).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          cita.estado === 'completada' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {cita.estado}
                        </span>
                      </div>
                      <button className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver detalles
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No hay citas recientes</p>
              )}
            </div>
          </div>
        </div>

        {/* Información del Paciente */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <User className="h-5 w-5 mr-2 text-purple-600" />
              Mi Información
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Nombre completo</p>
                <p className="text-gray-900">{pacienteData.nombres} {pacienteData.apellidos}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Correo electrónico</p>
                <p className="text-gray-900">{pacienteData.correo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Teléfono</p>
                <p className="text-gray-900">{pacienteData.telefono}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}