import { api } from './api';

export const citaService = {
  // Obtener citas del paciente actual
  async getMisCitas() {
    try {
      const data = await api.get('/citas/mis-citas');
      return data;
    } catch (error) {
      console.error('Error en getMisCitas:', error);
      throw error;
    }
  },

  // Obtener citas próximas del paciente
  async getCitasProximas() {
    try {
      const data = await api.get('/citas/proximas');
      return data;
    } catch (error) {
      console.error('Error en getCitasProximas:', error);
      throw error;
    }
  },

  // Obtener citas recientes del paciente
  async getCitasRecientes() {
    try {
      const data = await api.get('/citas/recientes');
      return data;
    } catch (error) {
      console.error('Error en getCitasRecientes:', error);
      throw error;
    }
  },

  // Crear nueva cita
  async createCita(citaData) {
    try {
      const data = await api.post('/citas', citaData);
      return data;
    } catch (error) {
      console.error('Error en createCita:', error);
      throw error;
    }
  },

  // Cancelar cita
  async cancelarCita(idCita) {
    try {
      const data = await api.put(`/citas/${idCita}/cancelar`);
      return data;
    } catch (error) {
      console.error('Error en cancelarCita:', error);
      throw error;
    }
  }
};