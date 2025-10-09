import { useState } from "react";
import { User, Bell, Lock, Calendar } from "lucide-react";

export default function AjustesMedico() {
  const [medicoData, setMedicoData] = useState({
    nombres: "Samuel",
    apellidos: "Nuñez",
    correo: "samuel.nunez@clinica.com",
    telefono: "3001234567",
    especialidad: "Oftalmología General",
    horario: {
      lunes: { inicio: "08:00", fin: "17:00" },
      martes: { inicio: "08:00", fin: "17:00" },
      miercoles: { inicio: "08:00", fin: "17:00" },
      jueves: { inicio: "08:00", fin: "17:00" },
      viernes: { inicio: "08:00", fin: "16:00" }
    }
  });

  const [notificaciones, setNotificaciones] = useState({
    emailCitas: true,
    smsRecordatorios: false,
    notificacionesApp: true
  });

  const handleSave = () => {
    // Lógica para guardar ajustes
    alert("Ajustes guardados correctamente");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Ajustes y Configuración</h1>

      <div className="space-y-6">
        {/* Información Personal */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Información Personal</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
              <input
                type="text"
                value={medicoData.nombres}
                onChange={(e) => setMedicoData({...medicoData, nombres: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
              <input
                type="text"
                value={medicoData.apellidos}
                onChange={(e) => setMedicoData({...medicoData, apellidos: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
              <input
                type="email"
                value={medicoData.correo}
                onChange={(e) => setMedicoData({...medicoData, correo: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                value={medicoData.telefono}
                onChange={(e) => setMedicoData({...medicoData, telefono: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Horario de Trabajo */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-green-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Horario de Trabajo</h2>
          </div>
          
          <div className="space-y-3">
            {Object.entries(medicoData.horario).map(([dia, horario]) => (
              <div key={dia} className="flex items-center justify-between">
                <span className="capitalize font-medium text-gray-700 w-24">{dia}</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    value={horario.inicio}
                    onChange={(e) => setMedicoData({
                      ...medicoData, 
                      horario: {
                        ...medicoData.horario,
                        [dia]: { ...horario, inicio: e.target.value }
                      }
                    })}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-500">a</span>
                  <input
                    type="time"
                    value={horario.fin}
                    onChange={(e) => setMedicoData({
                      ...medicoData, 
                      horario: {
                        ...medicoData.horario,
                        [dia]: { ...horario, fin: e.target.value }
                      }
                    })}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notificaciones */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Notificaciones</h2>
          </div>
          
          <div className="space-y-3">
            {Object.entries(notificaciones).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-700 capitalize">
                  {key === 'emailCitas' && 'Notificaciones por email'}
                  {key === 'smsRecordatorios' && 'Recordatorios por SMS'}
                  {key === 'notificacionesApp' && 'Notificaciones en la app'}
                </span>
                <button
                  onClick={() => setNotificaciones({...notificaciones, [key]: !value})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    value ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Botón Guardar */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}