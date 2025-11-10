import { api } from './api.js';

export const authService = {
  /**
   * Registra un nuevo paciente en el sistema
   */
  async register(userData) {
    console.log('🔵 FRONTEND - Iniciando registro...');
    console.log('📦 Datos a enviar:', userData);
    
    try {
      // INTENTAR DIFERENTES ENDPOINTS (en orden de prioridad)
      let response;
      
      try {
        // Primero intentar con el endpoint específico para pacientes
        console.log('🔄 Intentando endpoint: /api/auth/registro');
        response = await api.post('/api/auth/registro', userData);
      } catch (error1) {
        console.log('⚠️  Primer endpoint falló, intentando alternativo...');
        
        try {
          // Segundo intento: endpoint alternativo
          console.log('🔄 Intentando endpoint: /api/registro');
          response = await api.post('/api/registro', userData);
        } catch (error2) {
          console.log('⚠️  Segundo endpoint falló, intentando último...');
          
          // Tercer intento: endpoint general de usuarios
          console.log('🔄 Intentando endpoint: /usuarios/');
          const datosConRol = {
            ...userData,
            id_rol: 3  // paciente
          };
          response = await api.post('/usuarios/', datosConRol);
        }
      }
      
      console.log('🟢 FRONTEND - Registro exitoso:', response);
      return response;
      
    } catch (error) {
      console.error('🔴 FRONTEND - Error en registro:', error);
      
      // Mensaje de error más específico
      let errorMessage = 'Error en el registro';
      
      if (error.message.includes('Failed to fetch')) {
        errorMessage = 'No se puede conectar con el servidor. Verifica que el backend esté corriendo.';
      } else if (error.message.includes('404')) {
        errorMessage = 'Endpoint no encontrado. El backend no tiene la ruta de registro configurada.';
      } else if (error.message.includes('422')) {
        errorMessage = 'Datos inválidos. Verifica que todos los campos estén completos.';
      } else if (error.message.includes('500')) {
        errorMessage = 'Error interno del servidor.';
      }
      
      throw new Error(errorMessage);
    }
  },

  /**
   * Inicia sesión en el sistema
   */
  async login(correo, contrasena) {
    console.log('🔵 FRONTEND - Iniciando login...');
    
    try {
      const response = await api.post('/api/auth/login', {
        correo,
        contrasena,
      });
      
      console.log('🟢 FRONTEND - Login exitoso:', response);
      
      if (response.token && response.usuario) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userData', JSON.stringify(response.usuario));
        console.log('🔐 Token guardado en localStorage');
      }
      
      return response;
      
    } catch (error) {
      console.error('🔴 FRONTEND - Error en login:', error);
      
      let errorMessage = 'Error en el login';
      if (error.message.includes('400')) {
        errorMessage = 'Correo o contraseña incorrectos';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'No se puede conectar con el servidor';
      }
      
      throw new Error(errorMessage);
    }
  },

  /**
   * Cierra la sesión del usuario - VERSIÓN CORREGIDA
   */
  async logout() {
    console.log('🔵 FRONTEND - Iniciando logout...');
    
    try {
      // Intentar logout en el backend
      await api.post('/api/auth/logout');
      console.log('🟢 Logout exitoso en backend');
    } catch (error) {
      console.log('⚠️  Logout en backend falló, pero continuamos...', error);
      // Continuamos aunque falle el logout del backend
    } finally {
      // SIEMPRE limpiar el localStorage y redirigir
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('userRole');
      console.log('🔐 Tokens eliminados del localStorage');
      
      // Redirigir al login
      console.log('🔄 Redirigiendo a login...');
      window.location.href = '/login';
    }
  },

  /**
   * Obtiene el usuario actual desde localStorage
   */
  getCurrentUser() {
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : null;
    console.log('👤 Usuario actual:', user);
    return user;
  },

  /**
   * Verifica si hay un usuario autenticado
   */
  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    const isAuth = !!token;
    console.log('🔐 Usuario autenticado:', isAuth);
    return isAuth;
  },

  /**
   * Verifica el estado de la conexión con el backend
   */
  async checkBackendConnection() {
    try {
      const response = await api.get('/health');
      console.log('🌐 Conexión con backend:', response);
      return { connected: true, message: 'Backend conectado' };
    } catch (error) {
      console.error('🌐 Error de conexión con backend:', error);
      return { connected: false, message: 'Backend no disponible' };
    }
  }
};