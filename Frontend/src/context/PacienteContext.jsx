import React, { createContext, useContext, useState, useEffect } from 'react';
import { pacienteService } from '../services/pacienteService';

const PacienteContext = createContext();

export const usePaciente = () => {
  const context = useContext(PacienteContext);
  if (!context) {
    throw new Error('usePaciente debe ser usado dentro de un PacienteProvider');
  }
  return context;
};

export const PacienteProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPacientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await pacienteService.getPacientes();
      setPacientes(data);
    } catch (err) {
      setError(err.message || 'Error al cargar pacientes');
    } finally {
      setLoading(false);
    }
  };

  const addPaciente = async (pacienteData) => {
    try {
      const newPaciente = await pacienteService.createPaciente(pacienteData);
      setPacientes(prev => [...prev, newPaciente]);
      return newPaciente;
    } catch (err) {
      setError(err.message || 'Error al crear paciente');
      throw err;
    }
  };

  const updatePaciente = async (id, pacienteData) => {
    try {
      const updatedPaciente = await pacienteService.updatePaciente(id, pacienteData);
      setPacientes(prev => 
        prev.map(paciente => 
          paciente.id === id ? updatedPaciente : paciente
        )
      );
      return updatedPaciente;
    } catch (err) {
      setError(err.message || 'Error al actualizar paciente');
      throw err;
    }
  };

  const deletePaciente = async (id) => {
    try {
      await pacienteService.deletePaciente(id);
      setPacientes(prev => prev.filter(paciente => paciente.id !== id));
    } catch (err) {
      setError(err.message || 'Error al eliminar paciente');
      throw err;
    }
  };

  useEffect(() => {
    loadPacientes();
  }, []);

  const value = {
    pacientes,
    loading,
    error,
    loadPacientes,
    addPaciente,
    updatePaciente,
    deletePaciente
  };

  return (
    <PacienteContext.Provider value={value}>
      {children}
    </PacienteContext.Provider>
  );
};