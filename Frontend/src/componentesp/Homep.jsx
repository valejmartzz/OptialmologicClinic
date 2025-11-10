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

        setLoading(false);
      } catch (error) {
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