import { Link } from "react-router-dom";

export default function TermsConditions() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 flex flex-col font-sans bg-[#E3F2FD]">
      {/* NAVBAR */}
      <nav className="bg-[#E3F2FD] text-white shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Logo de la clínica"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span
              className="text-xl font-bold hidden sm:inline"
              style={{ color: "#004AAD" }}
            >
              Optialmologic Clinic
            </span>
          </Link>
          <ul
            className="flex items-center gap-8 text-base font-medium"
            style={{ color: "#004AAD" }}
          >
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
          Términos y Condiciones
        </h1>

        <section>
          <h2 className="text-xl font-semibold mb-2">1. Aceptación de los términos</h2>
          <p className="leading-relaxed">
            Al acceder y utilizar nuestros servicios, el usuario acepta
            cumplir con estos Términos y Condiciones y con todas las leyes
            aplicables.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Uso de los servicios</h2>
          <p className="leading-relaxed">
            Los servicios de Optialmologic Clinic están destinados a la gestión
            de citas y a la comunicación con nuestros profesionales de salud
            visual. El usuario se compromete a no utilizarlos con fines ilícitos
            o que puedan afectar a terceros.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Propiedad intelectual</h2>
          <p className="leading-relaxed">
            Todo el contenido de la plataforma, incluidos textos, gráficos y
            logotipos, es propiedad de Optialmologic Clinic y está protegido por
            las leyes de derechos de autor.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Limitación de responsabilidad</h2>
          <p className="leading-relaxed">
            Optialmologic Clinic no será responsable de daños directos o
            indirectos que resulten del uso o la imposibilidad de uso de los
            servicios, salvo lo establecido por la ley.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Modificaciones</h2>
          <p className="leading-relaxed">
            Nos reservamos el derecho de modificar estos términos en cualquier
            momento. Las actualizaciones entrarán en vigor una vez publicadas en
            este sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Ley aplicable</h2>
          <p className="leading-relaxed">
            Estos Términos y Condiciones se regirán e interpretarán de acuerdo
            con las leyes vigentes en Colombia, sin perjuicio de las normas de
            conflicto de leyes.
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
