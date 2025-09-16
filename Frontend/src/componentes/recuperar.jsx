import { useState } from "react";
import { Link } from "react-router-dom";

export default function RecuperarContrasena() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("El correo es obligatorio.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("El correo no es válido.");
    } else {
      // Aquí iría la lógica para enviar el correo de recuperación
      // Por ejemplo una llamada a tu API
      setSuccess(
        "📩 Si el correo está registrado, se enviará un enlace para restablecer la contraseña."
      );
      setEmail("");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-[#E3F2FD] text-gray-900"
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
          <h2 className="text-2xl font-bold text-center mb-6">
            Recuperar Contraseña
          </h2>

          {success && (
            <p className="mb-4 text-green-600 font-semibold text-center">
              {success}
            </p>
          )}
          {error && (
            <p className="mb-4 text-red-500 font-semibold text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="ejemplo@correo.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1A73E8] text-white py-2 px-4 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
            >
              Enviar enlace
            </button>
          </form>

          <div className="text-center mt-6">
            <Link
              to="/login"
              className="text-[#1A73E8] font-semibold hover:underline"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#004AAD] text-white py-6 px-6 mt-10">
        <div className="max-w-6xl mx-auto text-center text-sm">
          © 2025 Optialmologic Clinic. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
