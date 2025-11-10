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
          horaFormateada: cita.hora,
          estadoColor: getEstadoColor(cita.estado),
          estadoTexto: getEstadoTexto(cita.estado),
          tipo: cita.motivo
        }));
        
        setCitasHoy(citasProcesadas);
        
        // Encontrar próxima cita
        const ahora = new Date();
        const hoy = new Date().toISOString().split('T')[0];
        const proxima = citasProcesadas
          .filter(cita => cita.fecha === hoy && cita.hora > ahora.toTimeString().slice(0,5))
          .sort((a, b) => a.hora.localeCompare(b.hora))[0];
        
        setProximaCita(proxima || null);

      } catch (error) {
        console.error('Error cargando datos:', error);
        setError("Error al cargar los datos. Verifica que el backend esté funcionando.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Funciones auxiliares
  const getEstadoColor = (estado) => {
    const colores = {
      'programada': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'completada': 'bg-green-100 text-green-800 border-green-200',
      'cancelada': 'bg-red-100 text-red-800 border-red-200'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getEstadoTexto = (estado) => {
    const textos = {
      'programada': 'Programada',
      'completada': 'Completada',
      'cancelada': 'Cancelada'
    };
    return textos[estado] || estado;
  };

  const handleCambiarEstadoCita = async (citaId, nuevoEstado) => {
    try {
      await medicoService.actualizarEstadoCita(citaId, nuevoEstado);
      
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
      
      // Actualizar estadísticas
      const nuevasStats = await medicoService.getEstadisticas();
      setEstadisticas(nuevasStats);
      
    } catch (error) {
      console.error('Error cambiando estado:', error);
      alert('Error al cambiar el estado de la cita');
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
            <p className="text-blue-100 mt-1">{medicoData.especialidad || "Oftalmología"}</p>
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

      {/* El resto de tu JSX permanece igual */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ... resto del código JSX ... */}
      </div>
    </div>
  );
}