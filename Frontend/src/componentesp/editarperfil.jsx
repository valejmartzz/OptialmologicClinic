import { useState, useEffect } from "react";
import { Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EditarPerfil() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: "",
    fechaNacimiento: "",
    direccion: "",
  });

  useEffect(() => {
    // Simulación de datos existentes del paciente
    setFormData({
      nombres: "Ana María",
      apellidos: "Gómez López",
      correo: "ana.gomez@email.com",
      telefono: "3001234567",
      fechaNacimiento: "1998-07-15",
      direccion: "Calle 45 #12-34, Bogotá",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí se podría hacer una petición PUT al backend
    console.log("Datos actualizados:", formData);

    alert("✅ Perfil actualizado correctamente");
    navigate("/perfil");
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc] py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-[#1b2e59]">
            Editar Perfil
          </h1>
          <button
            onClick={() => navigate("/perfil")}
            className="flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Volver
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#1b2e59] font-medium mb-2">
                Nombres
              </label>
              <input
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9fbfe]"
                required
              />
            </div>

            <div>
              <label className="block text-[#1b2e59] font-medium mb-2">
                Apellidos
              </label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9fbfe]"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#1b2e59] font-medium mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9fbfe]"
                required
              />
            </div>

            <div>
              <label className="block text-[#1b2e59] font-medium mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9fbfe]"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#1b2e59] font-medium mb-2">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9fbfe]"
                required
              />
            </div>

            <div>
              <label className="block text-[#1b2e59] font-medium mb-2">
                Dirección
              </label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9fbfe]"
              />
            </div>
          </div>

          {/* Botón guardar */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-md"
            >
              <Save className="w-5 h-5 mr-2" /> Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
