import { api } from './api.js';

export const medicoService = {
  // Obtener perfil del médico
  async getPerfil() {
    try {
      const response = await api.get('/api/medicos/perfil');
      return response;
    } catch (error) {
      console.error('Error obteniendo perfil médico:', error);
      throw error;
    }
  },

  // Obtener estadísticas del médico
  async getEstadisticas() {
    try {
      const response = await api.get('/api/medicos/estadisticas');
      return response;
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      throw error;
    }
  },

  // Obtener citas del día
  async getCitasHoy() {
    try {
      const response = await api.get('/api/medicos/citas-hoy');
      return response;
    } catch (error) {
      console.error('Error obteniendo citas de hoy:', error);
      throw error;
    }
  },

  // Obtener todas las citas del médico
  async getCitas(filtros = {}) {
    try {
      const params = new URLSearchParams();
      if (filtros.fecha) params.append('fecha', filtros.fecha);
      if (filtros.estado) params.append('estado', filtros.estado);
      
      const response = await api.get(`/api/citas?${params.toString()}`);
      return response;
    } catch (error) {
      console.error('Error obteniendo citas:', error);
      throw error;
    }
  },

  // Actualizar estado de una cita
  async actualizarEstadoCita(citaId, nuevoEstado) {
    try {
      const response = await api.put(`/api/citas/${citaId}`, {
        estado: nuevoEstado
      });
      return response;
    } catch (error) {
      console.error('Error actualizando cita:', error);
      throw error;
    }
  },

  // Obtener lista de pacientes del médico
  async getPacientes() {
    try {
      const response = await api.get('/api/pacientes');
      return response;
    } catch (error) {
      console.error('Error obteniendo pacientes:', error);
      throw error;
    }
  },

  // Obtener historial de un paciente específico
  async getHistorialPaciente(pacienteId) {
    try {
      const response = await api.get(`/api/pacientes/${pacienteId}/historial`);
      return response;
    } catch (error) {
      console.error('Error obteniendo historial:', error);
      throw error;
    }
  }
};