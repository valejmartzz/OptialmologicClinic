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
import { Link } from "react-router-dom";

<<<<<<< HEAD
=======
// 🔹 Componente de la barra de navegación
function NavbarPaciente({ nombre }) {
  return (
    <header className="bg-[#dcebfa] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo + Nombre */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png" // 🔸 Cambia por la ruta de tu logo real
            alt="Logo Clínica"
            className="w-14 h-14 rounded-full"
          />
          <h1 className="text-2xl font-semibold text-[#1b2e59]">
            <span className="font-bold">Optialmologic</span> Clinic
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
            onClick={() => console.log("Cerrar sesión")}
          >
            <LogOut className="w-5 h-5 mr-1" /> Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
}

// 🔹 Página principal del paciente
>>>>>>> 5a7ca12a30b6dfcf80bfb3ada6698452b9cbbb7e
export default function Homep() {
  const [pacienteData, setPacienteData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: "",
  });

  const [citasProximas, setCitasProximas] = useState([]);
  const [citasRecientes, setCitasRecientes] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    totalCitas: 0,
    pendientes: 0,
    completadas: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPacienteData({
          nombres: "Ana",
          apellidos: "Gómez",
          correo: "ana.gomez@email.com",
          telefono: "3001234567",
        });

        setCitasProximas([
          {
            id_cita: 1,
            fecha: "2025-01-10",
            hora: "10:00:00",
            medico: "Dr. Samuel Núñez",
            especialidad: "Oftalmología General",
<<<<<<< HEAD
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
=======
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
>>>>>>> 5a7ca12a30b6dfcf80bfb3ada6698452b9cbbb7e
        });

        setLoading(false);
      } catch (error) {
<<<<<<< HEAD
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
=======
        console.error("Error al cargar los datos:", error);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando datos...</p>;

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      <NavbarPaciente nombre={pacienteData.nombres} />

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Bienvenida */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold text-[#1b2e59]">
            ¡Bienvenida, {pacienteData.nombres} {pacienteData.apellidos}!
          </h2>
          <p className="text-gray-600 mt-2">
            Aquí puedes ver tus citas, estadísticas y acceder a tu información médica.
          </p>
        </div>

        {/* Tarjetas de estadísticas */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-blue-500">
            <h3 className="text-gray-700 font-medium text-lg">Total de Citas</h3>
            <p className="text-3xl font-bold text-[#1b2e59] mt-2">
              {estadisticas.totalCitas}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-yellow-400">
            <h3 className="text-gray-700 font-medium text-lg">Pendientes</h3>
            <p className="text-3xl font-bold text-[#1b2e59] mt-2">
              {estadisticas.pendientes}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-green-500">
            <h3 className="text-gray-700 font-medium text-lg">Completadas</h3>
            <p className="text-3xl font-bold text-[#1b2e59] mt-2">
              {estadisticas.completadas}
            </p>
          </div>
        </div>

        {/* Citas próximas */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-10">
          <h3 className="text-2xl font-semibold text-[#1b2e59] flex items-center mb-4">
            <Calendar className="mr-2 w-6 h-6" /> Próxima Cita
          </h3>
          {citasProximas.length > 0 ? (
            <div className="space-y-3">
              {citasProximas.map((cita) => (
                <div
                  key={cita.id_cita}
                  className="p-4 bg-[#f9fbfe] rounded-xl border border-blue-100 hover:shadow-lg transition"
                >
                  <p className="text-lg font-medium text-[#1b2e59]">
                    {cita.especialidad} con {cita.medico}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <Clock className="w-4 h-4 mr-1" /> {cita.fecha} a las{" "}
                    {cita.hora}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No tienes citas programadas.</p>
          )}
        </section>

        {/* Citas recientes */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-2xl font-semibold text-[#1b2e59] flex items-center mb-4">
            <FileText className="mr-2 w-6 h-6" /> Citas Recientes
          </h3>
          {citasRecientes.length > 0 ? (
            <div className="space-y-3">
              {citasRecientes.map((cita) => (
                <div
                  key={cita.id_cita}
                  className="p-4 bg-[#f9fbfe] rounded-xl border border-blue-100 hover:shadow-lg transition"
                >
                  <p className="text-lg font-medium text-[#1b2e59]">
                    {cita.especialidad} con {cita.medico}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" /> {cita.fecha} a las{" "}
                    {cita.hora}
                  </p>
                  <p className="text-green-600 font-semibold mt-1">
                    Estado: {cita.estado}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay citas recientes.</p>
          )}
        </section>
      </main>
    </div>
  );
}
>>>>>>> 5a7ca12a30b6dfcf80bfb3ada6698452b9cbbb7e
