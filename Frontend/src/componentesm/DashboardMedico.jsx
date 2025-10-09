import { useState, useEffect } from "react";
import { Calendar, Users, Clock, Eye, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { medicoService } from "../services/medicoService";

export default function DashboardMedico() {
  const [medicoData, setMedicoData] = useState({
    nombres: "",
    apellidos: "",
    especialidad: ""
  });
  
  const [estadisticas, setEstadisticas] = useState({
    citasHoy: 0,
    totalPacientes: 0,
    citasPendientes: 0,
    citasCompletadas: 0
  });
  
  const [citasHoy, setCitasHoy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Obtener datos en paralelo
        const [perfilData, statsData, citasData] = await Promise.all([
          medicoService.getPerfil(),
          medicoService.getEstadisticas(),
          medicoService.getCitasHoy()
        ]);

        setMedicoData(perfilData);
        setEstadisticas(statsData);
        setCitasHoy(citasData);

      } catch (error) {
        console.error('Error cargando datos:', error);
        setError("Error al cargar los datos. Verifica que el backend esté funcionando.");
        
        // Datos de ejemplo como fallback
        setMedicoData({
          nombres: "Samuel",
          apellidos: "Nuñez",
          especialidad: "Oftalmología General"
        });
        
        setEstadisticas({
          citasHoy: 0,
          totalPacientes: 0,
          citasPendientes: 0,
          citasCompletadas: 0
        });
        
        setCitasHoy([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido, Dr. {medicoData.nombres} {medicoData.apellidos}
        </h1>
        <p className="text-gray-600">Aquí podrá gestionar las citas y sus pacientes.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Citas Hoy</p>
              <p className="text-2xl font-bold text-gray-900">{estadisticas.citasHoy}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-500 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Total Pacientes</p>
              <p className="text-2xl font-bold text-gray-900">{estadisticas.totalPacientes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-500 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Citas Pendientes</p>
              <p className="text-2xl font-bold text-gray-900">{estadisticas.citasPendientes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <Eye className="h-8 w-8 text-purple-500 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Completadas</p>
              <p className="text-2xl font-bold text-gray-900">{estadisticas.citasCompletadas}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Citas de Hoy */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Citas para Hoy</h2>
          <Link to="/medico/citas" className="text-blue-600 hover:text-blue-800 text-sm">
            Ver todas
          </Link>
        </div>
        
        {citasHoy.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay citas programadas para hoy
          </div>
        ) : (
          <div className="space-y-4">
            {citasHoy.map((cita) => (
              <div key={cita.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    cita.estado === 'confirmada' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{cita.paciente}</p>
                    <p className="text-sm text-gray-600">{cita.tipo}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">{cita.hora}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}