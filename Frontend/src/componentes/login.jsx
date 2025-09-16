import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    correo: "",
    contraseña: "",
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
    if (!formData.correo) {
      newErrors.correo = "El correo es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "El correo no es válido.";
    }
    if (!formData.contraseña) {
      newErrors.contraseña = "La contraseña es obligatoria.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSuccess("✅ Inicio de sesión exitoso.");
      setFormData({ correo: "", contraseña: "" });
    }
  };

  return (
    <div
      className="text-gray-900 min-h-screen flex flex-col justify-between"
      style={{ backgroundColor: "#E3F2FD" }}
    >
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
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Iniciar Sesión
          </h2>

          {success && (
            <p className="mb-4 text-green-600 font-semibold text-center">
              {success}
            </p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
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

            <div>
              <label
                htmlFor="contraseña"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contraseña <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="contraseña"
                placeholder="Ingresa tu contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.contraseña && (
                <p className="text-red-500 text-sm mt-1">{errors.contraseña}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#1A73E8] text-white py-2 px-4 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* ENLACES EXTRA */}
          <div className="text-center text-sm text-gray-700 mt-6 space-y-2">
            <p>
              ¿No tienes cuenta?{" "}
              <Link
                to="/register"
                className="text-[#1A73E8] font-semibold hover:underline"
              >
                Regístrate aquí
              </Link>
            </p>
            <p>
              <Link
                to="/politicaprivacidad"
                className="text-[#1A73E8] hover:underline"
              >
                Política de Privacidad
              </Link>{" "}
              |{" "}
              <Link
                to="/terms-conditions"
                className="text-[#1A73E8] hover:underline"
              >
                Términos y Condiciones
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#004AAD] text-white py-6 px-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © 2025 Optialmologic Clinic. Todos los derechos reservados.
          </p>
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
