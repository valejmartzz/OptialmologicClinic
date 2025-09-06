import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function SobreNosotros() {
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

      {/* CONTENIDO SOBRE NOSOTROS */}
      <main className="py-20 flex-grow">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Sobre Nosotros
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            En <span className="font-semibold">Ophthalmology Clinic</span> trabajamos cada
            día para cuidar tu salud visual con profesionales altamente
            capacitados y tecnología de vanguardia. Nuestra misión es ofrecer
            atención integral, cercana y de calidad.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Misión</h3>
              <p className="text-gray-600">
                Brindar soluciones efectivas en salud visual para mejorar la
                calidad de vida de nuestros pacientes.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Visión</h3>
              <p className="text-gray-600">
                Ser la clínica líder en cuidado oftalmológico, reconocida por la
                excelencia en atención y resultados.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Valores</h3>
              <p className="text-gray-600">
                Compromiso, innovación y cercanía para garantizar la mejor
                experiencia a cada paciente.
              </p>
            </div>
          </div>
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

      {/* BOTÓN WHATSAPP */}
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
