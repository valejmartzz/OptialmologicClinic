// src/services/api.js
const API_BASE_URL = 'http://localhost:8000';

export const apiService = {
  // Registro de usuario
  async registrarUsuario(usuarioData) {
    const response = await fetch(`${API_BASE_URL}/usuarios/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuarioData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error en el registro');
    }
    
    return await response.json();
  },

  // Login de usuario
  async login(credenciales) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credenciales),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error en el login');
    }
    
    return await response.json();
  }
};