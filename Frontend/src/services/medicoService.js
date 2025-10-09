import { api } from './api';

export const medicoService = {
  // Obtener perfil del médico
  async getPerfil() {
    return await api.get('/api/medicos/perfil');
  },

  // Obtener estadísticas del médico
  async getEstadisticas() {
    return await api.get('/api/medicos/estadisticas');
  },

  // Obtener citas del día
  async getCitasHoy() {
    return await api.get('/api/medicos/citas-hoy');
  },

  // Obtener todas las citas
  async getCitas() {
    return await api.get('/api/medicos/citas');
  },

  // Cambiar estado de una cita
  async cambiarEstadoCita(citaId, nuevoEstado) {
    return await api.put(`/api/medicos/citas/${citaId}`, {
      estado: nuevoEstado
    });
  },

  // Obtener lista de pacientes
  async getPacientes() {
    return await api.get('/api/medicos/pacientes');
  },

  // Obtener historial médico
  async getHistorial() {
    return await api.get('/api/medicos/historial');
  },

  // Obtener diagnósticos
  async getDiagnosticos() {
    return await api.get('/api/diagnosticos');
  },
};