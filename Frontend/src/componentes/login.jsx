import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // ✅ IMPORTAR useAuth

export default function Login() {
  const [formData, setFormData] = useState({
    correo: "",
    contraseña: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ OBTENER LA FUNCIÓN LOGIN DEL CONTEXTO

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
    } else if (formData.contraseña.length < 6) {
      newErrors.contraseña = "La contraseña debe tener al menos 6 caracteres.";
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
    setErrors({});

    try {
      // 🔥 CONEXIÓN CON EL BACKEND
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: formData.correo,
          contrasena: formData.contraseña
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("✅ Inicio de sesión exitoso.");
        
        // ✅ GUARDAR TOKEN Y DATOS CORRECTAMENTE
        localStorage.setItem('authToken', data.token); // ✅ Cambiar 'token' por 'authToken'
        localStorage.setItem('user', JSON.stringify(data.usuario));
        
        // ✅ ACTUALIZAR EL CONTEXTO DE AUTENTICACIÓN
        login(data.usuario, data.token);
        
        // ✅ REDIRIGIR SEGÚN EL ROL - SIN TIMEOUT
        switch(data.usuario.id_rol) {
          case 1: // Admin
            navigate('/admin');
            break;
          case 2: // Médico
            navigate('/medico');
            break;
          case 3: // Paciente
            navigate('/paciente');
            break;
          default:
            navigate('/');
        }
        
      } else {
        setErrors({ general: data.message || "Error en el servidor" });
      }
    } catch (error) {
      console.error('Error en login:', error);
      setErrors({ general: "Error de conexión con el servidor" });
    } finally {
      setLoading(false);
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

          {/* Mensaje de error general */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
              {errors.general}
            </div>
          )}

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
                disabled={loading}
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
                disabled={loading}
              />
              {errors.contraseña && (
                <p className="text-red-500 text-sm mt-1">{errors.contraseña}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg font-semibold shadow-md transition ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#1A73E8] hover:bg-blue-600 text-white'
              }`}
            >
              {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
            </button>

            <div className="text-center mt-4">
              <Link
                to="/recuperar"
                className="text-sm text-[#1A73E8] font-medium hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </form>

          <div className="text-center text-sm text-gray-700 mt-6 space-y-2">
            <p>
              ¿No tienes cuenta?{" "}
              <Link
                to="/registro"
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
                to="/terminosycondiciones"
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