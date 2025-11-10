import { api } from './api';

export const pacienteService = {
  // Obtener datos del paciente actual
  async getMiPerfil() {
    try {
      const data = await api.get('/pacientes/mi-perfil');
      return data;
    } catch (error) {
      console.error('Error en getMiPerfil:', error);
      throw error;
    }
  },

  // Actualizar perfil del paciente
  async updateMiPerfil(pacienteData) {
    try {
      const data = await api.put('/pacientes/mi-perfil', pacienteData);
      return data;
    } catch (error) {
      console.error('Error en updateMiPerfil:', error);
      throw error;
    }
  },

  // Obtener estadísticas del paciente
  async getEstadisticas() {
    try {
      const data = await api.get('/pacientes/estadisticas');
      return data;
    } catch (error) {
      console.error('Error en getEstadisticas:', error);
      throw error;
    }
  }
};