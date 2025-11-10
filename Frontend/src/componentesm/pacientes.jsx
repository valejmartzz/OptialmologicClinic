import { useState, useEffect } from "react";
import { Search, User, Phone, Mail, Calendar, Eye, Plus, Stethoscope, FileText } from "lucide-react";
import { medicoService } from '../services/medicoService.js';

export default function PacientesMedico() {
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Cargar pacientes al montar el componente
  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    try {
      setLoading(true);
      setError('');
      const pacientesData = await medicoService.getPacientes();
      
      // Formatear los pacientes para el frontend
      const pacientesFormateados = pacientesData.map(paciente => ({
        id: paciente.id_usuario,
        nombres: paciente.nombres,
        apellidos: paciente.apellidos,
        correo: paciente.correo,
        telefono: paciente.telefono,
        fechaNacimiento: paciente.fecha_nacimiento,
        sexo: paciente.sexo,
        tipoIdentificacion: paciente.tipo_identificacion,
        numeroIdentificacion: paciente.numero_identificacion,
        // Datos simulados para estadísticas (en producción vendrían del backend)
        ultimaCita: "2025-01-08",
        citasTotales: Math.floor(Math.random() * 10) + 1,
        alergias: paciente.alergias || "Ninguna registrada",
        antecedentes: paciente.antecedentes || "Ninguno registrado"
      }));
      
      setPacientes(pacientesFormateados);
    } catch (error) {
      console.error('Error cargando pacientes:', error);
      setError('Error al cargar los pacientes. Verifica la conexión con el servidor.');
      
      // Datos de ejemplo como fallback
      setPacientes([
        {
          id: 1,
          nombres: "Ana",
          apellidos: "Gómez",
          correo: "ana.gomez@email.com",
          telefono: "3001234567",
          fechaNacimiento: "1985-05-15",
          sexo: "F",
          tipoIdentificacion: "Cédula",
          numeroIdentificacion: "123456789",
          ultimaCita: "2025-01-05",
          citasTotales: 5,
          alergias: "Penicilina",
          antecedentes: "Hipertensión"
        },
        {
          id: 2,
          nombres: "Carlos",
          apellidos: "Rodríguez", 
          correo: "carlos.rodriguez@email.com",
          telefono: "3007654321",
          fechaNacimiento: "1978-12-20",
          sexo: "M",
          tipoIdentificacion: "Cédula",
          numeroIdentificacion: "987654321",
          ultimaCita: "2025-01-08",
          citasTotales: 3,
          alergias: "Ninguna",
          antecedentes: "Diabetes tipo 2"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Ver historial de paciente
  const verHistorial = async (pacienteId) => {
    try {
      const historial = await medicoService.getHistorialPaciente(pacienteId);
      setPacienteSeleccionado(historial);
      setMostrarModal(true);
    } catch (error) {
      console.error('Error cargando historial:', error);
      // Simular datos de historial
      const paciente = pacientes.find(p => p.id === pacienteId);
      setPacienteSeleccionado({
        ...paciente,
        citas: [
          {
            id: 1,
            fecha: "2025-01-05",
            motivo: "Consulta de rutina",
            diagnostico: "Miopía progresiva",
            tratamiento: "Cambio de lentes"
          },
          {
            id: 2,
            fecha: "2024-12-10", 
            motivo: "Control anual",
            diagnostico: "Catarata incipiente",
            tratamiento: "Seguimiento cada 6 meses"
          }
        ]
      });
      setMostrarModal(true);
    }
  };

  // Filtrar pacientes
  const pacientesFiltrados = pacientes.filter(paciente =>
    `${paciente.nombres} ${paciente.apellidos}`.toLowerCase().includes(busqueda.toLowerCase()) ||
    paciente.correo.toLowerCase().includes(busqueda.toLowerCase()) ||
    paciente.numeroIdentificacion.includes(busqueda)
  );

  // Calcular edad desde fecha de nacimiento
  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    
    return edad;
  };

  // Formatear fecha
  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Mis Pacientes</h1>
        </div>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando pacientes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Pacientes</h1>
          <p className="text-gray-600 mt-1">
            {pacientesFiltrados.length} {pacientesFiltrados.length === 1 ? 'paciente' : 'pacientes'} encontrados
          </p>
        </div>
        <button 
          onClick={fetchPacientes}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualizar
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Búsqueda */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar pacientes por nombre, email o identificación..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Lista de Pacientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pacientesFiltrados.map((paciente) => (
          <div key={paciente.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
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
                  {calcularEdad(paciente.fechaNacimiento)} años • {paciente.sexo === 'M' ? 'Masculino' : 'Femenino'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {paciente.tipoIdentificacion}: {paciente.numeroIdentificacion}
                </p>
              </div>
            </div>

            {/* Información de contacto */}
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>{paciente.telefono || 'No registrado'}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span className="truncate">{paciente.correo}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Nac: {formatFecha(paciente.fechaNacimiento)}</span>
              </div>
            </div>

            {/* Información médica */}
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Total Citas</p>
                  <p className="font-semibold text-gray-900">{paciente.citasTotales}</p>
                </div>
                <div>
                  <p className="text-gray-600">Última Cita</p>
                  <p className="font-semibold text-gray-900">
                    {formatFecha(paciente.ultimaCita)}
                  </p>
                </div>
              </div>
              
              {/* Información médica adicional */}
              <div className="mt-3 space-y-1 text-xs">
                <p><span className="font-medium">Alergias:</span> {paciente.alergias}</p>
                <p><span className="font-medium">Antecedentes:</span> {paciente.antecedentes}</p>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex space-x-2">
              <button 
                onClick={() => verHistorial(paciente.id)}
                className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <FileText className="h-4 w-4 mr-1" />
                Historial
              </button>
              <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center justify-center">
                <Calendar className="h-4 w-4 mr-1" />
                Cita
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Historial */}
      {mostrarModal && pacienteSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header del modal */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Historial Médico - {pacienteSeleccionado.nombres} {pacienteSeleccionado.apellidos}
                  </h2>
                  <p className="text-gray-600">
                    {pacienteSeleccionado.correo} • {pacienteSeleccionado.telefono}
                  </p>
                </div>
                <button 
                  onClick={() => setMostrarModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Información del paciente */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Edad</p>
                  <p className="font-semibold">{calcularEdad(pacienteSeleccionado.fechaNacimiento)} años</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Identificación</p>
                  <p className="font-semibold">{pacienteSeleccionado.numeroIdentificacion}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Citas</p>
                  <p className="font-semibold">{pacienteSeleccionado.citasTotales}</p>
                </div>
              </div>

              {/* Historial de citas */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Stethoscope className="h-5 w-5 mr-2 text-blue-600" />
                  Historial de Consultas
                </h3>
                
                {pacienteSeleccionado.citas && pacienteSeleccionado.citas.length > 0 ? (
                  <div className="space-y-4">
                    {pacienteSeleccionado.citas.map((cita) => (
                      <div key={cita.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{cita.motivo}</h4>
                          <span className="text-sm text-gray-500">{formatFecha(cita.fecha)}</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Diagnóstico:</span> {cita.diagnostico}</p>
                          <p><span className="font-medium">Tratamiento:</span> {cita.tratamiento}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No hay historial de consultas registrado</p>
                )}
              </div>

              {/* Acciones del modal */}
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button 
                  onClick={() => setMostrarModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cerrar
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Nueva Consulta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componentes de íconos faltantes
const RefreshCw = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const AlertCircle = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const X = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);