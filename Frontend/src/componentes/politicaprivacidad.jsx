import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 flex flex-col font-sans bg-[#E3F2FD]">
      <nav className="bg-[#E3F2FD] text-white shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Logo de la clínica"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-xl font-bold hidden sm:inline"
            style={{ color: "#004AAD" }}>
              Optialmologic Clinic
            </span>
          </Link>
          <ul className="flex items-center gap-8 text-base font-medium"
          style={{ color: "#004AAD" }}>
            <li>
              <Link to="/" className="hover:underline">
                HOME
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* CONTENIDO */}
      <main className="flex-grow max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Política de Privacidad
        </h1>

        <section>
          <h2 className="text-xl font-semibold mb-2">1. Información que recopilamos</h2>
          <p className="leading-relaxed">
            Recopilamos información personal como nombre, correo electrónico,
            número de teléfono y otros datos que el usuario nos proporciona al
            registrarse o interactuar con nuestros servicios.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Uso de la información</h2>
          <p className="leading-relaxed">
            Utilizamos la información para brindar y mejorar nuestros servicios,
            procesar citas, responder consultas y enviar comunicaciones
            relacionadas con la salud visual.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Protección de datos</h2>
          <p className="leading-relaxed">
            Implementamos medidas de seguridad físicas, electrónicas y
            administrativas para proteger la información personal de accesos no
            autorizados, alteraciones o divulgación.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Compartir información</h2>
          <p className="leading-relaxed">
            No compartimos información personal con terceros salvo que la ley lo
            requiera o sea necesario para la prestación del servicio, con el
            consentimiento del usuario.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Derechos del usuario</h2>
          <p className="leading-relaxed">
            El usuario puede solicitar acceso, rectificación o eliminación de sus
            datos enviando una solicitud a nuestro correo de contacto.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Cambios a esta política</h2>
          <p className="leading-relaxed">
            Podremos actualizar esta política para reflejar cambios en nuestras
            prácticas. La fecha de la última actualización aparecerá al inicio de
            este documento.
          </p>
        </section>

        <p className="text-sm text-gray-600 mt-8">
          Última actualización: 15 de septiembre de 2025
        </p>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#004AAD] text-white py-6 text-center">
        © 2025 Optialmologic Clinic. Todos los derechos reservados.
      </footer>
    </div>
  );
}
