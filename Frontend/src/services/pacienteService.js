import { api } from './api.js';

export const pacienteService = {
  // Obtener perfil del paciente
  async getPerfil() {
    return await api.get('/api/pacientes/perfil');
  },

  // Obtener citas del paciente
  async getCitas() {
    return await api.get('/api/pacientes/citas');
  },

  // Agendar nueva cita
  async agendarCita(citaData) {
    return await api.post('/api/pacientes/citas', citaData);
  },

  // Cancelar cita
  async cancelarCita(citaId) {
    return await api.put(`/api/pacientes/citas/${citaId}/cancelar`);
  },

  // Obtener historial médico
  async getHistorial() {
    return await api.get('/api/pacientes/historial');
  },

  // Obtener recetas
  async getRecetas() {
    return await api.get('/api/pacientes/recetas');
  },
};