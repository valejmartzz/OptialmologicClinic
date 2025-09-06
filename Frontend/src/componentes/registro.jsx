import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Registro() {
  const [formData, setFormData] = useState({
    apellido: "",
    contraseña: "",
    edad: "",
    tipoIdentificacion: "",
    numeroIdentificacion: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
    setSuccess("");
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.apellido) newErrors.apellido = "El apellido es obligatorio.";
    if (!formData.contraseña) newErrors.contraseña = "La contraseña es obligatoria.";
    if (!formData.edad) {
      newErrors.edad = "La edad es obligatoria.";
    } else if (isNaN(formData.edad) || formData.edad <= 0) {
      newErrors.edad = "Ingresa una edad válida.";
    }
    if (!formData.tipoIdentificacion) newErrors.tipoIdentificacion = "El tipo de identificación es obligatorio.";
    if (!formData.numeroIdentificacion) newErrors.numeroIdentificacion = "El número de identificación es obligatorio.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSuccess("✅ Registro completado con éxito.");
      setFormData({
        apellido: "",
        contraseña: "",
        edad: "",
        tipoIdentificacion: "",
        numeroIdentificacion: "",
      });
    }
  };

  return (
    <div className="text-gray-900 min-h-screen flex flex-col justify-between" style={{ backgroundColor: "#E3F2FD" }}>
      {/* LOGO */}
      <div className="flex justify-center py-6 bg-white shadow-md">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-24 h-24 rounded-full object-cover cursor-pointer"
          />
        </Link>
      </div>

      {/* FORMULARIO */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Registro</h2>

          {success && (
            <p className="mb-4 text-green-600 font-semibold text-center">{success}</p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Apellido */}
            <div>
              <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
                Apellido <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="apellido"
                placeholder="Ingresa tu apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.apellido && <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>}
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="contraseña"
                placeholder="Crea una contraseña segura"
                value={formData.contraseña}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.contraseña && <p className="text-red-500 text-sm mt-1">{errors.contraseña}</p>}
            </div>

            {/* Edad */}
            <div>
              <label htmlFor="edad" className="block text-sm font-medium text-gray-700 mb-1">
                Edad <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="edad"
                placeholder="Ingresa tu edad"
                value={formData.edad}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.edad && <p className="text-red-500 text-sm mt-1">{errors.edad}</p>}
            </div>

            {/* Tipo de Identificación */}
            <div>
              <label htmlFor="tipoIdentificacion" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de identificación <span className="text-red-500">*</span>
              </label>
              <select
                id="tipoIdentificacion"
                value={formData.tipoIdentificacion}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Selecciona una opción</option>
                <option value="cc">Cédula de ciudadanía</option>
                <option value="ti">Tarjeta de identidad</option>
                <option value="ce">Cédula de extranjería</option>
                <option value="pp">Pasaporte</option>
              </select>
              {errors.tipoIdentificacion && <p className="text-red-500 text-sm mt-1">{errors.tipoIdentificacion}</p>}
            </div>

            {/* Número de Identificación */}
            <div>
              <label htmlFor="numeroIdentificacion" className="block text-sm font-medium text-gray-700 mb-1">
                Número de identificación <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="numeroIdentificacion"
                placeholder="Ingresa tu número de identificación"
                value={formData.numeroIdentificacion}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.numeroIdentificacion && <p className="text-red-500 text-sm mt-1">{errors.numeroIdentificacion}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#1A73E8] text-white py-2 px-4 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
            >
              Registrarse
            </button>
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#004AAD] text-white py-6 px-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2025 Optialmologic Clinic. Todos los derechos reservados.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:underline">Política de Privacidad</a>
            <a href="#" className="hover:underline">Términos y Condiciones</a>
          </div>
        </div>
      </footer>

      {/* WHATSAPP */}
      <a
        href="https://api.whatsapp.com/send?phone=3123586505"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition"
      >
        <MessageCircle size={28} color="white" />
      </a>
    </div>
  );
}
