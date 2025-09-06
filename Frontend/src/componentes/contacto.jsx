import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contactanos() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" }); // limpia error al escribir
    setSuccess(""); // limpia mensaje de éxito
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.correo) {
      newErrors.correo = "El correo es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "El correo no es válido.";
    }
    if (!formData.telefono) newErrors.telefono = "El teléfono es obligatorio.";
    if (!formData.mensaje) newErrors.mensaje = "El mensaje es obligatorio.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSuccess("✅ Tu mensaje fue enviado con éxito.");
      setFormData({ nombre: "", correo: "", telefono: "", mensaje: "" });
    }
  };

  return (
    <div
      className="text-gray-900 min-h-screen flex flex-col justify-between"
      style={{ backgroundColor: "#E3F2FD" }}
    >
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-20 h-20 rounded-full object-cover cursor-pointer"
            />
          </Link>
        </div>

        <ul
          className="flex space-x-8 text-lg font-medium"
          style={{ color: "#004AAD" }}
        >
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/sobrenosotros">SOBRE NOSOTROS</Link>
          </li>
          <li>
            <Link to="/contacto">CONTACTANOS</Link>
          </li>
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
          <li>
            <Link to="/registro">REGÍSTRATE</Link>
          </li>
        </ul>
      </nav>

      {/* FORMULARIO */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Contáctanos
          </h2>

          {success && (
            <p className="mb-4 text-green-600 font-semibold text-center">
              {success}
            </p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Nombre */}
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nombre"
                placeholder="Ingresa tu nombre completo"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
              )}
            </div>

            {/* Correo */}
            <div>
              <label
                htmlFor="correo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Correo electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="correo"
                placeholder="ejemplo@correo.com"
                value={formData.correo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.correo && (
                <p className="text-red-500 text-sm mt-1">{errors.correo}</p>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <label
                htmlFor="telefono"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Número de teléfono <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="telefono"
                placeholder="Ingresa tu número de contacto"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.telefono && (
                <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
              )}
            </div>

            {/* Mensaje */}
            <div>
              <label
                htmlFor="mensaje"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mensaje <span className="text-red-500">*</span>
              </label>
              <textarea
                id="mensaje"
                rows="4"
                placeholder="Escribe tu mensaje aquí..."
                value={formData.mensaje}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              ></textarea>
              {errors.mensaje && (
                <p className="text-red-500 text-sm mt-1">{errors.mensaje}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#1A73E8] text-white py-2 px-4 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#004AAD] text-white py-6 px-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-center md:text-left">
            © 2025 Optialmologic Clinic. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:underline">
              Política de Privacidad
            </a>
            <a href="#" className="hover:underline">
              Términos y Condiciones
            </a>
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
