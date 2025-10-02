# Guía de Estándares de Código

Este documento define convenciones de estilo, nomenclatura y buenas prácticas para el proyecto **Ophthalmologic Clinic**, con backend en **Python (FastAPI + MySQL)** y frontend en **React**.  
El objetivo es mantener el código consistente, legible y fácil de mantener.

---

## 1. Reglas de nombres

### 1.1 Python (Backend)

- **Variables y funciones**: usar `snake_case`.
- **Clases**: usar `PascalCase`.
- **Constantes**: `UPPER_SNAKE_CASE`.
- **Rutas FastAPI**: usar sustantivos en plural, minúscula.

### 1.2 React (Frontend)

- **Componentes**: `PascalCase`.
- **Hooks, funciones, variables**: `camelCase`.
- **Constantes globales / config**: `UPPER_SNAKE_CASE`.
- **Archivos y carpetas**:
  - Componentes: `PascalCase` → `LoginForm.jsx`
  - Utilidades / hooks: `camelCase` → `useAuth.js`, `formatDate.js`

---

## 2. Comentarios y documentación interna

### Python
- Usar **docstrings** (`""" """`) en funciones, clases y módulos siguiendo **PEP257**.
- Explicar el *por qué* y no lo obvio.

### React
- Documentar props y funciones con **JSDoc**.

Ejemplo:
```jsx
/**
 * Componente de login.
 * @param {{ onSubmit: (user: string, pass: string) => void }} props
 */
function LoginForm({ onSubmit }) {
  ...
}
