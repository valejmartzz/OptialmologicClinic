import { useState, useEffect } from "react";
import { Calendar, Clock, User, Eye, Plus, FileText, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Homep () {
  const [pacienteData, setPacienteData] = useState({
    apellidos: "",
    correo: "",
    telefono: ""
  });
  
  const [citasProximas, setCitasProximas] = useState([]);
  const [citasRecientes, setCitasRecientes] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    totalCitas: 0,
    pendientes: 0,
    completadas: 0
  });
  
  const [loading, setLoading] = useState(true);

  // Obtener datos del paciente
  useEffect(() => {
    const fetchPacienteData = async () => {
      try {
        // Datos del paciente (simulados por ahora)
        setPacienteData({
          nombres: "Ana",
          apellidos: "Gómez",
          correo: "ana.gomez@email.com",
          telefono: "3001234567"
        });

        // Citas próximas (datos de ejemplo)
        setCitasProximas([
          {
            id_cita: 1,
            fecha: "2025-01-10",
            hora: "10:00:00",
            medico: "Dr. Samuel Nuñez",
            especialidad: "Oftalmología General",
                estado: "programada"
              }
            ]);
            