import { Routes, Route } from "react-router-dom";
import Home from "./componentes/home";
import SobreNosotros from "./componentes/sobrenosotros";
import Login from "./componentes/login";
import Registro from "./componentes/registro";
import Contactanos from "./componentes/contacto";
import HomeM from "./componentesm/homem";
import Citas from "./componentesm/citas"
import Usuarios from "./componentesm/usuarios";
import Ajustes from "./componentesm/ajustes";
import PrivacyPolicy from "./componentes/politicaprivacidad"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobrenosotros" element={<SobreNosotros />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/contacto" element={<Contactanos />} />
      <Route path="/homem" element={<HomeM />} />
      <Route path="/citas" element={<Citas />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/ajustes" element={<Ajustes />} />
      <Route path="/politicaprivacidad" element={<PrivacyPolicy />} />
    </Routes>
  );
}
