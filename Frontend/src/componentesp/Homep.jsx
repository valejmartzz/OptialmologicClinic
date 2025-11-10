import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Eye,
  Plus,
  FileText,
  MapPin,
  ClipboardList,
  Trash2,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { pacienteService } from "../services/pacienteService";
import { citaService } from "../services/citaService";

// 🔹 Componente de la barra de navegación
function NavbarPaciente({ nombre, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      try {
        await onLogout();
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    }
  };

  return (
    <header className="bg-[#dcebfa] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo + Nombre */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Logo Clínica"
            className="w-14 h-14 rounded-full"
          />
          <h1 className="text-2xl font-semibold text-[#1b2e59]">
            <span className="font-bold">Ophthalmologic</span> Clinic
          </h1>
        </div>

        {/* Menú de navegación */}
        <nav className="flex items-center space-x-8">
          <Link
            to="/perfil"
            className="flex items-center text-[#1b2e59] font-medium text-lg hover:text-blue-600 transition"
          >
            <User className="w-5 h-5 mr-1" /> Ver Perfil
          </Link>

          <Link
            to="/hmedico"
            className="flex items-center text-[#1b2e59] font-medium text-lg hover:text-blue-600 transition"
          >
            <ClipboardList className="w-5 h-5 mr-1" /> Historial Médico
          </Link>

          <Link
            to="/eliminarcita"
            className="flex items-center text-[#1b2e59] font-medium text-lg hover:text-red-600 transition"
          >
            <Trash2 className="w-5 h-5 mr-1" /> Eliminar Citas
          </Link>

          <button
            className="flex items-center text-[#1b2e59] font-medium text-lg hover:text-blue-700 transition"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-1" /> Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
}

// 🔹 Página principal del paciente
export default function Homep() {
  const [pacienteData, setPacienteData] = useState({
    id_paciente: "",
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: "",
    fecha_nacimiento: "",
    genero: "",
    direccion: ""
  });

  const [citasProximas, setCitasProximas] = useState([]);
  const [citasRecientes, setCitasRecientes] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    totalCitas: 0,
    pendientes: 0,
    completadas: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔹 Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error completo en logout:', error);
      setError('Error al cerrar sesión');
      localStorage.clear();
      navigate('/login');
    }
  };

  // 🔹 Cargar datos del paciente desde la base de datos
  const loadPacienteData = async () => {
    try {
      console.log('🔄 Cargando datos del paciente...');
      const paciente = await pacienteService.getMiPerfil();
      
      setPacienteData({
        id_paciente: paciente.id_paciente || paciente.id,
        nombres: paciente.nombres || "",
        apellidos: paciente.apellidos || "",
        correo: paciente.correo || paciente.email || "",
        telefono: paciente.telefono || "",
        fecha_nacimiento: paciente.fecha_nacimiento || "",
        genero: paciente.genero || "",
        direccion: paciente.direccion || ""
      });
      
      console.log('✅ Datos del paciente cargados:', paciente);
    } catch (error) {
      console.error('❌ Error al cargar datos del paciente:', error);
      // Si falla, intentar obtener del usuario actual en localStorage
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setPacienteData({
          nombres: currentUser.nombres || currentUser.nombre || "",
          apellidos: currentUser.apellidos || "",
          correo: currentUser.correo || currentUser.email || "",
          telefono: currentUser.telefono || "",
        });
      }
      throw error;
    }
  };

  // 🔹 Cargar citas del paciente desde la base de datos
  const loadCitas = async () => {
    try {
      console.log('🔄 Cargando citas del paciente...');
      
      // Opción 1: Obtener todas las citas y filtrar
      const todasLasCitas = await citaService.getMisCitas();
      
      // Opción 2: Obtener citas próximas y recientes por separado
      // const citasProximasData = await citaService.getCitasProximas();
      // const citasRecientesData = await citaService.getCitasRecientes();
      
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      // Filtrar citas próximas (fecha >= hoy)
      const proximas = todasLasCitas.filter(cita => {
        const fechaCita = new Date(cita.fecha);
        fechaCita.setHours(0, 0, 0, 0);
        return fechaCita >= hoy && cita.estado !== 'Cancelada';
      }).sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
        .slice(0, 3); // Máximo 3 citas próximas

      // Filtrar citas recientes (fecha < hoy o completadas)
      const recientes = todasLasCitas.filter(cita => {
        const fechaCita = new Date(cita.fecha);
        fechaCita.setHours(0, 0, 0, 0);
        return fechaCita < hoy || cita.estado === 'Completada';
      }).sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .slice(0, 5); // Máximo 5 citas recientes

      setCitasProximas(proximas);
      setCitasRecientes(recientes);

      // Calcular estadísticas
      const totalCitas = todasLasCitas.length;
      const pendientes = todasLasCitas.filter(c => 
        c.estado === 'Programada' || c.estado === 'Confirmada'
      ).length;
      const completadas = todasLasCitas.filter(c => 
        c.estado === 'Completada'
      ).length;

      setEstadisticas({
        totalCitas,
        pendientes,
        completadas,
      });

      console.log('✅ Citas cargadas:', { totalCitas, pendientes, completadas });
      
    } catch (error) {
      console.error('❌ Error al cargar citas:', error);
      
      // En caso de error, usar datos de ejemplo
      setCitasProximas([
        {
          id_cita: 1,
          fecha: "2025-01-10",
          hora: "10:00:00",
          medico: "Dr. Samuel Núñez",
          especialidad: "Oftalmología General",
          estado: "Programada",
        },
      ]);

      setCitasRecientes([
        {
          id_cita: 2,
          fecha: "2024-12-05",
          hora: "15:30:00",
          medico: "Dra. Marta Pérez",
          especialidad: "Cirugía Ocular",
          estado: "Completada",
        },
      ]);

      setEstadisticas({
        totalCitas: 8,
        pendientes: 2,
        completadas: 6,
      });
      
      throw error;
    }
  };

  // 🔹 Cargar estadísticas desde la base de datos
  const loadEstadisticas = async () => {
    try {
      console.log('🔄 Cargando estadísticas...');
      const stats = await pacienteService.getEstadisticas();
      setEstadisticas(stats);
      console.log('✅ Estadísticas cargadas:', stats);
    } catch (error) {
      console.error('❌ Error al cargar estadísticas:', error);
      // Las estadísticas se calculan desde las citas si falla
    }
  };

  // 🔹 Cargar todos los datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        
        await Promise.all([
          loadPacienteData(),
          loadCitas()
        ]);
        
        // Opcional: cargar estadísticas por separado
        // await loadEstadisticas();
        
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setError(error.message || "Error al cargar los datos. Algunos datos pueden ser de ejemplo.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // 🔹 Formatear fecha para mostrar
  const formatFecha = (fecha) => {
    if (!fecha) return 'Fecha no definida';
    try {
      return new Date(fecha).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return fecha;
    }
  };

  // 🔹 Formatear hora para mostrar
  const formatHora = (hora) => {
    if (!hora) return '';
    try {
      // Si la hora viene en formato HH:MM:SS, mostrar solo HH:MM
      return hora.substring(0, 5);
    } catch (error) {
      return hora;
    }
  };

  // 🔹 Determinar el género para el saludo
  const getSaludoGenero = () => {
    const nombre = pacienteData.nombres?.toLowerCase() || '';
    const genero = pacienteData.genero?.toLowerCase();
    
    // Si tenemos el género en los datos, usarlo
    if (genero === 'femenino' || genero === 'f') return 'a';
    if (genero === 'masculino' || genero === 'm') return 'o';
    
    // Si no, intentar deducir del nombre
    const nombresFemeninos = ['ana', 'maria', 'carmen', 'laura', 'isabel', 'elena', 'patricia', 'sofia', 'andrea'];
    if (nombresFemeninos.some(fem => nombre.includes(fem))) {
      return 'a';
    }
    
    return 'o'; // Por defecto masculino
  };

  // 🔹 Obtener color según estado de la cita
  const getColorEstado = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'programada':
      case 'confirmada':
        return 'bg-yellow-100 text-yellow-800';
      case 'completada':
        return 'bg-green-100 text-green-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f9fc] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando datos del paciente...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      <NavbarPaciente 
        nombre={pacienteData.nombres} 
        onLogout={handleLogout}
      />

      {error && (
        <div className="max-w-6xl mx-auto px-6 mt-6">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <strong>Nota:</strong> {error}
            <button 
              onClick={() => setError("")}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Bienvenida */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold text-[#1b2e59]">
            {`¡Bienvenid${getSaludoGenero()}, ${pacienteData.nombres} ${pacienteData.apellidos}!`}
          </h2>
          <p className="text-gray-600 mt-2">
            Aquí puedes ver tus citas, estadísticas y acceder a tu información médica.
          </p>
          {pacienteData.id_paciente && (
            <p className="text-sm text-gray-500 mt-1">
              ID Paciente: {pacienteData.id_paciente}
            </p>
          )}
        </div>

        {/* Tarjetas de estadísticas */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
            <h3 className="text-gray-700 font-medium text-lg">Total de Citas</h3>
            <p className="text-3xl font-bold text-[#1b2e59] mt-2">
              {estadisticas.totalCitas}
            </p>
            <p className="text-gray-500 text-sm mt-1">Todas las citas</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-yellow-400 hover:shadow-xl transition-shadow">
            <h3 className="text-gray-700 font-medium text-lg">Pendientes</h3>
            <p className="text-3xl font-bold text-[#1b2e59] mt-2">
              {estadisticas.pendientes}
            </p>
            <p className="text-gray-500 text-sm mt-1">Por asistir</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-green-500 hover:shadow-xl transition-shadow">
            <h3 className="text-gray-700 font-medium text-lg">Completadas</h3>
            <p className="text-3xl font-bold text-[#1b2e59] mt-2">
              {estadisticas.completadas}
            </p>
            <p className="text-gray-500 text-sm mt-1">Finalizadas</p>
          </div>
        </div>

        {/* Citas próximas */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-10 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-[#1b2e59] flex items-center">
              <Calendar className="mr-2 w-6 h-6" /> Próximas Citas
            </h3>
            <Link
              to="/citas"
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <Eye className="w-4 h-4 mr-1" />
              Ver todas
            </Link>
          </div>
          {citasProximas.length > 0 ? (
            <div className="space-y-4">
              {citasProximas.map((cita) => (
                <div
                  key={cita.id_cita}
                  className="p-4 bg-[#f9fbfe] rounded-xl border border-blue-100 hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-lg font-medium text-[#1b2e59]">
                        {cita.especialidad} con {cita.medico}
                      </p>
                      <p className="text-gray-600 flex items-center mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatFecha(cita.fecha)} a las {formatHora(cita.hora)}
                      </p>
                      {cita.descripcion && (
                        <p className="text-gray-500 text-sm mt-1">
                          {cita.descripcion}
                        </p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getColorEstado(cita.estado)}`}>
                      {cita.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No tienes citas programadas.</p>
              <Link
                to="/nueva-cita"
                className="inline-flex items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agendar Cita
              </Link>
            </div>
          )}
        </section>

        {/* Citas recientes */}
        <section className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-semibold text-[#1b2e59] flex items-center mb-4">
            <FileText className="mr-2 w-6 h-6" /> Citas Recientes
          </h3>
          {citasRecientes.length > 0 ? (
            <div className="space-y-4">
              {citasRecientes.map((cita) => (
                <div
                  key={cita.id_cita}
                  className="p-4 bg-[#f9fbfe] rounded-xl border border-gray-100 hover:border-gray-300 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-lg font-medium text-[#1b2e59]">
                        {cita.especialidad} con {cita.medico}
                      </p>
                      <p className="text-gray-600 flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {formatFecha(cita.fecha)} a las {formatHora(cita.hora)}
                      </p>
                      {cita.diagnostico && (
                        <p className="text-gray-500 text-sm mt-1">
                          Diagnóstico: {cita.diagnostico}
                        </p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getColorEstado(cita.estado)}`}>
                      {cita.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No hay citas recientes.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}