import { useState, useEffect } from "react";
import { 
  Calendar, 
  Users, 
  Clock, 
  Eye, 
  AlertCircle, 
  Stethoscope,
  FileText,
  Pill,
  MessageCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { medicoService } from '../services/medicoService.js';

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
  const [proximaCita, setProximaCita] = useState(null);
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
        
        // Procesar citas
        const citasProcesadas = citasData.map(cita => ({
          ...cita,
          horaFormateada: formatHora(cita.hora),
          estadoColor: getEstadoColor(cita.estado),
          estadoTexto: getEstadoTexto(cita.estado)
        }));
        
        setCitasHoy(citasProcesadas);
        
        // Encontrar próxima cita
        const ahora = new Date();
        const proxima = citasProcesadas
          .filter(cita => new Date(`2025-10-28T${cita.hora}`) > ahora)
          .sort((a, b) => new Date(`2025-10-28T${a.hora}`) - new Date(`2025-10-28T${b.hora}`))[0];
        
        setProximaCita(proxima || null);

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

  // Funciones auxiliares
  const formatHora = (hora) => {
    return hora; // Puedes formatear la hora aquí si es necesario
  };

  const getEstadoColor = (estado) => {
    const colores = {
      'confirmada': 'bg-green-100 text-green-800 border-green-200',
      'pendiente': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'cancelada': 'bg-red-100 text-red-800 border-red-200',
      'completada': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getEstadoTexto = (estado) => {
    const textos = {
      'confirmada': 'Confirmada',
      'pendiente': 'Pendiente',
      'cancelada': 'Cancelada',
      'completada': 'Completada'
    };
    return textos[estado] || estado;
  };

  const handleCambiarEstadoCita = async (citaId, nuevoEstado) => {
    try {
      // Aquí implementarías la llamada al servicio para cambiar el estado
      console.log(`Cambiando estado de cita ${citaId} a ${nuevoEstado}`);
      
      // Actualizar estado local
      setCitasHoy(prev => prev.map(cita => 
        cita.id === citaId 
          ? { 
              ...cita, 
              estado: nuevoEstado,
              estadoColor: getEstadoColor(nuevoEstado),
              estadoTexto: getEstadoTexto(nuevoEstado)
            }
          : cita
      ));
    } catch (error) {
      console.error('Error cambiando estado:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header con información del médico */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Bienvenido, Dr. {medicoData.nombres} {medicoData.apellidos}
            </h1>
            <p className="text-blue-100 mt-1">{medicoData.especialidad}</p>
            <p className="text-blue-100 text-sm mt-2">
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg p-3 inline-block">
              <Stethoscope className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Citas Hoy</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticas.citasHoy}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Pacientes</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticas.totalPacientes}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Pendientes</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticas.citasPendientes}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Completadas</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticas.citasCompletadas}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Citas de Hoy */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Citas para Hoy</h2>
              <Link 
                to="/medico/citas" 
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                Ver agenda completa
                <Calendar className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            {citasHoy.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-lg">No hay citas programadas para hoy</p>
                <p className="text-sm mt-1">Puede descansar o realizar otras actividades</p>
              </div>
            ) : (
              <div className="space-y-3">
                {citasHoy.map((cita) => (
                  <div key={cita.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`w-3 h-3 rounded-full ${
                        cita.estado === 'confirmada' ? 'bg-green-500' : 
                        cita.estado === 'completada' ? 'bg-blue-500' :
                        cita.estado === 'cancelada' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{cita.paciente}</p>
                        <p className="text-sm text-gray-600">{cita.tipo}</p>
                        {cita.notas && (
                          <p className="text-xs text-gray-500 mt-1">{cita.notas}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-900 bg-gray-100 px-3 py-1 rounded">
                        {cita.horaFormateada}
                      </span>
                      
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${cita.estadoColor}`}>
                        {cita.estadoTexto}
                      </span>
                      
                      <div className="flex space-x-2">
                        {cita.estado === 'confirmada' && (
                          <button
                            onClick={() => handleCambiarEstadoCita(cita.id, 'completada')}
                            className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                            title="Marcar como completada"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleCambiarEstadoCita(cita.id, 'cancelada')}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Cancelar cita"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Próxima Cita */}
          {proximaCita && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                Próxima Cita
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border">
                  <p className="font-semibold text-gray-900">{proximaCita.paciente}</p>
                  <p className="text-sm text-gray-600">{proximaCita.tipo}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-medium text-blue-600">{proximaCita.horaFormateada}</span>
                    <span className={`px-2 py-1 rounded text-xs ${proximaCita.estadoColor}`}>
                      {proximaCita.estadoTexto}
                    </span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Preparar Consulta
                </button>
              </div>
            </div>
          )}

          {/* Acciones Rápidas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
              <Link 
                to="/medico/pacientes" 
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Users className="h-5 w-5 text-gray-600 mr-3" />
                <span className="font-medium">Mis Pacientes</span>
              </Link>
              
              <Link 
                to="/medico/historias" 
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FileText className="h-5 w-5 text-gray-600 mr-3" />
                <span className="font-medium">Historias Clínicas</span>
              </Link>
              
              <Link 
                to="/medico/recetas" 
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Pill className="h-5 w-5 text-gray-600 mr-3" />
                <span className="font-medium">Recetas Médicas</span>
              </Link>
              
              <button className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors w-full text-left">
                <MessageCircle className="h-5 w-5 text-gray-600 mr-3" />
                <span className="font-medium">Mensajes</span>
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>

          {/* Recordatorios */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recordatorios</h3>
            <div className="space-y-2 text-sm">
              <p>📋 Revisar resultados de laboratorio</p>
              <p>💊 Actualizar medicamentos de pacientes</p>
              <p>📅 Confirmar citas de mañana</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}