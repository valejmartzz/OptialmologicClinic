// src/components/registro.jsx - VERSIÓN CORREGIDA
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "../services/api";

export default function Registro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    sexo: "",
    tipo_identificacion: "",
    numero_identificacion: "",
    correo: "",
    contrasena: "",
    telefono: "",
    id_rol: "1", // 1 = Paciente, 2 = Médico, 3 = Admin
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
    setSuccess("");
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.nombres.trim()) newErrors.nombres = "Los nombres son obligatorios.";
    if (!formData.apellidos.trim()) newErrors.apellidos = "Los apellidos son obligatorios.";
    if (!formData.sexo) newErrors.sexo = "El sexo es obligatorio.";
    if (!formData.tipo_identificacion) newErrors.tipo_identificacion = "El tipo de identificación es obligatorio.";
    if (!formData.numero_identificacion.trim()) newErrors.numero_identificacion = "El número de identificación es obligatorio.";
    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "El correo no es válido.";
    }
    if (!formData.contrasena) {
      newErrors.contrasena = "La contraseña es obligatoria.";
    } else if (formData.contrasena.length < 6) {
      newErrors.contrasena = "La contraseña debe tener al menos 6 caracteres.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // Preparar datos para enviar al backend
      const usuarioData = {
        nombres: formData.nombres.trim(),
        apellidos: formData.apellidos.trim(),
        sexo: formData.sexo,
        tipo_identificacion: formData.tipo_identificacion,
        numero_identificacion: formData.numero_identificacion.trim(),
        correo: formData.correo.trim(),
        contrasena: formData.contrasena,
        telefono: formData.telefono.trim() || null,
        id_rol: parseInt(formData.id_rol),
        id_especialidad: null // Por ahora null, se puede agregar después
      };

      console.log("Enviando datos:", usuarioData);
      
      const response = await apiService.registrarUsuario(usuarioData);
      
      setSuccess("✅ Registro completado con éxito. Redirigiendo al login...");
      setErrors({});
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      console.error("Error en registro:", error);
      setErrors({ general: error.message || "Error en el registro. Intenta nuevamente." });
    } finally {
      setLoading(false);
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
      <main className="flex-grow flex items-center justify-center px-6 py-8">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Crear Cuenta</h2>

          {success && (
            <p className="mb-4 text-green-600 font-semibold text-center">{success}</p>
          )}

          {errors.general && (
            <p className="mb-4 text-red-500 font-semibold text-center">{errors.general}</p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombres */}
              <div>
                <label htmlFor="nombres" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombres <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nombres"
                  placeholder="Ingresa tus nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                {errors.nombres && <p className="text-red-500 text-sm mt-1">{errors.nombres}</p>}
              </div>

              {/* Apellidos */}
              <div>
                <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 mb-1">
                  Apellidos <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="apellidos"
                  placeholder="Ingresa tus apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                {errors.apellidos && <p className="text-red-500 text-sm mt-1">{errors.apellidos}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sexo */}
              <div>
                <label htmlFor="sexo" className="block text-sm font-medium text-gray-700 mb-1">
                  Sexo <span className="text-red-500">*</span>
                </label>
                <select
                  id="sexo"
                  value={formData.sexo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
                {errors.sexo && <p className="text-red-500 text-sm mt-1">{errors.sexo}</p>}
              </div>

              {/* Tipo de Identificación */}
              <div>
                <label htmlFor="tipo_identificacion" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de identificación <span className="text-red-500">*</span>
                </label>
                <select
                  id="tipo_identificacion"
                  value={formData.tipo_identificacion}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Cédula">Cédula de ciudadanía</option>
                  <option value="Tarjeta">Tarjeta de identidad</option>
                  <option value="Extranjería">Cédula de extranjería</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
                {errors.tipo_identificacion && <p className="text-red-500 text-sm mt-1">{errors.tipo_identificacion}</p>}
              </div>
            </div>

            {/* Número de Identificación */}
            <div>
              <label htmlFor="numero_identificacion" className="block text-sm font-medium text-gray-700 mb-1">
                Número de identificación <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="numero_identificacion"
                placeholder="Ingresa tu número de identificación"
                value={formData.numero_identificacion}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.numero_identificacion && <p className="text-red-500 text-sm mt-1">{errors.numero_identificacion}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Correo */}
              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
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
                {errors.correo && <p className="text-red-500 text-sm mt-1">{errors.correo}</p>}
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="telefono"
                  placeholder="Ingresa tu teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contraseña */}
              <div>
                <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="contrasena"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.contrasena}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                {errors.contrasena && <p className="text-red-500 text-sm mt-1">{errors.contrasena}</p>}
              </div>

              {/* Rol */}
              <div>
                <label htmlFor="id_rol" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de usuario <span className="text-red-500">*</span>
                </label>
                <select
                  id="id_rol"
                  value={formData.id_rol}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="1">Paciente</option>
                  <option value="2">Médico</option>
                  <option value="3">Administrador</option>
                </select>
              </div>
            </div>

            {/* Botón de registro */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1A73E8] text-white py-3 px-4 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Registrando...' : 'Crear Cuenta'}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-[#1A73E8] font-semibold hover:underline">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#004AAD] text-white py-6 px-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2025 Optialmologic Clinic. Todos los derechos reservados.</p>
          <div className="flex gap-6 text-sm">
            <a href="/politicaprivacidad" className="hover:underline">Política de Privacidad</a>
            <a href="/terminosycondiciones" className="hover:underline">Términos y Condiciones</a>
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