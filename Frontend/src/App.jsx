import { Routes, Route } from "react-router-dom";
import Home from "./componentes/home";
import SobreNosotros from "./componentes/sobrenosotros";
import Login from "./componentes/login";
import Registro from "./componentes/registro";
import Contactanos from "./componentes/contacto";
import Usuarios from "./componentes/usuarios"; // 👈 nuevo componente

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobrenosotros" element={<SobreNosotros />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/contacto" element={<Contactanos />} />
      <Route path="/usuarios" element={<Usuarios />} /> {/* 👈 ruta nueva */}
    </Routes>
  );
}
