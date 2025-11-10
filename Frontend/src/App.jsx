import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./componentes/home";
import SobreNosotros from "./componentes/sobrenosotros";
import Login from "./componentes/login";
import Registro from "./componentes/registro";
import Contactanos from "./componentes/contacto";
import PrivacyPolicy from "./componentes/politicaprivacidad";
import TermsConditions from "./componentes/terminosycondiciones";
import RecuperarContrasena from "./componentes/recuperar";


// componentes paciente Ophtialmolgy Clinic
import Homep from "./componentesp/Homep";
import PerfilPaciente from "./componentesp/perfil"
import EditarPerfil from "./componentesp/editarperfil"
import VerHistorialMedico from "./componentesp/hmedico"
import EliminarCitas from "./componentesp/eliminarcita"

// Componentes médico
import LayoutMedico from "./componentesm/LayoutMedico";
import DashboardMedico from "./componentesm/DashboardMedico";
import CitasMedico from "./componentesm/citas";
import PacientesMedico from "./componentesm/pacientes";
import HistorialMedico from "./componentesm/historial";
import AjustesMedico from "./componentesm/ajustes";
import { ImagePlay, Import } from "lucide-react";

// Administrador 
import AdminLayout from "./componentesad/AdminLayout"

// Componentes paciente - ✅ NOMBRE CORRECTO
import HomePaciente from "./componentesp/Homep";

// Componente de ruta protegida
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Ruta específica para administradores
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.id_rol !== 1) { // 1 = admin
    return <Navigate to="/" />;
  }
  
  return children;
};

// Ruta específica para médicos
const MedicoRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.id_rol !== 2) { // 2 = médico
    return <Navigate to="/" />;
  }
  
  return children;
};

// Ruta específica para pacientes
const PacienteRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.id_rol !== 3) { // 3 = paciente
    return <Navigate to="/" />;
  }
  
  return children;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* ========== RUTAS PÚBLICAS ========== */}
      <Route path="/" element={<Home />} />
      <Route path="/sobrenosotros" element={<SobreNosotros />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/contacto" element={<Contactanos />} />
      <Route path="/politicaprivacidad" element={<PrivacyPolicy />} />
      <Route path="/terminosycondiciones" element={<TermsConditions />} />
      <Route path="/recuperar" element={<RecuperarContrasena />} />
   {/* PACIENTE */}
      <Route path="/Homep" element={<Homep />} />
      <Route path="/perfil" element={<PerfilPaciente />} />
      <Route path="/editarperfil" element={<EditarPerfil />} />
      <Route path="/hmedico" element={<VerHistorialMedico />} />
      <Route path="/eliminarcita" element={<EliminarCitas />} />
    {/* ADMINISTRADOR */}  
      <Route path="/AdminLayout" element={<AdminLayout />} />


      {/* ========== RUTAS PROTEGIDAS - ADMIN ========== */}
      <Route path="/admin" element={
        <AdminRoute>
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h1 className="text-2xl font-bold text-blue-600 mb-4">Dashboard Administrador</h1>
              <p className="text-gray-600">Panel de administración - En desarrollo</p>
              <p className="text-sm text-gray-500 mt-2">Rol: {user?.id_rol} - {user?.nombres} {user?.apellidos}</p>
            </div>
          </div>
        </AdminRoute>
      } />

      {/* ========== RUTAS PROTEGIDAS - MÉDICO ========== */}
      <Route path="/medico" element={
        <MedicoRoute>
          <LayoutMedico>
            <DashboardMedico />
          </LayoutMedico>
        </MedicoRoute>
      } />
      
      <Route path="/medico/citas" element={
        <MedicoRoute>
          <LayoutMedico>
            <CitasMedico />
          </LayoutMedico>
        </MedicoRoute>
      } />
      
      <Route path="/medico/pacientes" element={
        <MedicoRoute>
          <LayoutMedico>
            <PacientesMedico />
          </LayoutMedico>
        </MedicoRoute>
      } />
      
      <Route path="/medico/historial" element={
        <MedicoRoute>
          <LayoutMedico>
            <HistorialMedico />
          </LayoutMedico>
        </MedicoRoute>
      } />
      
      <Route path="/medico/ajustes" element={
        <MedicoRoute>
          <LayoutMedico>
            <AjustesMedico />
          </LayoutMedico>
        </MedicoRoute>
      } />

      {/* ========== RUTAS PROTEGIDAS - PACIENTE ========== */}
      <Route path="/paciente" element={
        <PacienteRoute>
          <HomePaciente />
        </PacienteRoute>
      } />

      {/* ========== RUTAS DE REDIRECCIÓN ========== */}
      <Route path="/homem" element={<Navigate to="/medico" />} />
      <Route path="/citas" element={<Navigate to="/medico/citas" />} />
      <Route path="/usuarios" element={<Navigate to="/medico/pacientes" />} />
      <Route path="/ajustes" element={<Navigate to="/medico/ajustes" />} />

      {/* ========== RUTA DASHBOARD AUTOMÁTICO ========== */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          {user?.id_rol === 1 ? 
            <Navigate to="/admin" /> :
          user?.id_rol === 2 ? 
            <Navigate to="/medico" /> :
          user?.id_rol === 3 ? 
            <Navigate to="/paciente" /> :
            <Navigate to="/" />
          }
        </ProtectedRoute>
      } />

      {/* ========== RUTA 404 ========== */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}