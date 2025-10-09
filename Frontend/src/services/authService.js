import { api } from './api';

export const authService = {
  async register(userData) {
    console.log('Enviando datos al backend:', userData);
    
    try {
      // Usar la ruta directa en main.py
      const response = await api.post('/api/registro', userData);
      console.log('Respuesta del backend:', response);
      return response;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  },

  async login(correo, contrasena) {
    try {
      const response = await api.post('/api/auth/login', {
        correo,
        contrasena,
      });
      
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userData', JSON.stringify(response.usuario));
      }
      
      return response;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  },

  getCurrentUser() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },
};