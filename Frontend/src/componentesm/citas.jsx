import { useState, useEffect } from "react";
import { Calendar, Search, Filter, Eye, Edit, X, Check } from "lucide-react";



export default function CitasMedico() {
  const [citas, setCitas] = useState([]);
  const [filtro, setFiltro] = useState('todas');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    // Simular datos de citas
    setCitas([
      {
        id: 1,
        fecha: "2025-01-10",
        hora: "09:00",
        paciente: "Ana Gómez",
        telefono: "3001234567",
        motivo: "Consulta de rutina",
        estado: "programada",
        tipo: "Consulta general"
      },
      {
        id: 2,
        fecha: "2025-01-10", 
        hora: "10:30",
        paciente: "Carlos Rodríguez",
        telefono: "3007654321",
        motivo: "Control post-operatorio",
        estado: "programada",
        tipo: "Seguimiento"
      }
    ]);
  }, []);

  const cambiarEstadoCita = (citaId, nuevoEstado) => {
    setCitas(citas.map(cita => 
      cita.id === citaId ? { ...cita, estado: nuevoEstado } : cita
    ));
  };

  const citasFiltradas = citas.filter(cita => {
    const coincideFiltro = filtro === 'todas' || cita.estado === filtro;
    const coincideBusqueda = cita.paciente.toLowerCase().includes(busqueda.toLowerCase()) ||
                           cita.motivo.toLowerCase().includes(busqueda.toLowerCase());
    return coincideFiltro && coincideBusqueda;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Citas</h1>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Búsqueda */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar por paciente o motivo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filtros */}
          <div className="flex space-x-2">
            {['todas', 'programada', 'completada', 'cancelada'].map((filtroItem) => (
              <button
                key={filtroItem}
                onClick={() => setFiltro(filtroItem)}
                className={`px-4 py-2 rounded-lg capitalize text-sm ${
                  filtro === filtroItem 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filtroItem === 'todas' ? 'Todas' : filtroItem}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de Citas */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha y Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Motivo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {citasFiltradas.map((cita) => (
                <tr key={cita.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{cita.paciente}</div>
                      <div className="text-sm text-gray-500">{cita.telefono}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(cita.fecha).toLocaleDateString('es-ES')}
                    </div>
                    <div className="text-sm text-gray-500">{cita.hora}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{cita.motivo}</div>
                    <div className="text-sm text-gray-500">{cita.tipo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      cita.estado === 'programada' ? 'bg-yellow-100 text-yellow-800' :
                      cita.estado === 'completada' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {cita.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      {cita.estado === 'programada' && (
                        <>
                          <button 
                            onClick={() => cambiarEstadoCita(cita.id, 'completada')}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => cambiarEstadoCita(cita.id, 'cancelada')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}