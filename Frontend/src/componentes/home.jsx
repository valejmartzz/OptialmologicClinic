import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div
      className="text-gray-900 min-h-screen flex flex-col justify-between"
      style={{ backgroundColor: "#E3F2FD" }}
    >
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 shadow-md">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-25 h-25 rounded-full object-cover"
          />
        </div>

        {/* Menú */}
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

          {/* Dropdown Servicios */}
          <li
            className="relative cursor-pointer"
            onMouseEnter={() => setOpenDropdown(true)}
            onMouseLeave={() => setOpenDropdown(false)}
          >
            <div className="flex items-center">
              SERVICIOS <ChevronDown size={18} className="ml-1" />
            </div>
            {openDropdown && (
              <ul className="absolute top-8 left-0 bg-white shadow-md rounded-lg w-48">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  AGENDAR CITA
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  AGENDAR CIRUGIA
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Servicio 3
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/contacto">CONTACTANOS</Link>
          </li>
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
           <li>
            <Link to="/registro">REGISTRATE</Link>
          </li>
        </ul>
      </nav>

      {/* Contenido central */}
      <main className="flex flex-col items-center px-6 pt-20 flex-grow">
        <h1
          className="text-4xl md:text-5xl font-bold mb-10 text-center"
          style={{ color: "#333333" }}
        >
          Bienvenido a Optialmologic Clinic
        </h1>

        <div className="backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl flex flex-col items-center text-center">
          <p
            className="text-base md:text-lg leading-relaxed mb-6"
            style={{ color: "#333333" }}
          >
            Nos apasiona cuidar tu salud visual con calidad y profesionalismo,
            combinando tecnología de vanguardia con un trato cercano y humano.
            Tu bienestar visual es nuestra prioridad.
          </p>

          <button
            className="rounded-xl bg-[#1A73E8] px-6 py-3 text-white font-semibold shadow-lg transition 
                       hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 
                       focus:ring-offset-2 focus:ring-offset-light cursor-pointer"
            aria-label="Agendar cita"
          >
            Agendar cita
          </button>
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

      {/* Botón WhatsApp */}
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
