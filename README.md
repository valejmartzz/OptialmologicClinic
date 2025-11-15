DEPENDENCIAS Y LIBRERIAS PARA ACTIVAR BACKEND

# 1. Navegar al directorio Backend
cd Backend

# 2. Crear entorno virtual
python -m venv venv

# 3. ACTIVAR el entorno virtual
source venv/Scripts/activate

# 4. Instalar dependencias en el entorno virtual
pip install fastapi uvicorn mysql-connector-python

# 5. Instalar JWT
pip install pyjwt

# 6. Ejecutar el servidor
uvicorn main:app --reload --port 8000

DEPENDENCIAS PARA EJECUTAR FRONTEND

# 1. Instalar npm
npm install

# 2. Instalar Vite
npm install vite --save-dev

PSP

Objetivo del PSP
Implementar el Personal Software Process para mejorar sistemáticamente nuestro proceso de desarrollo de software mediante:

Mejorar Estimaciones: Precisión en tiempos y esfuerzo de desarrollo

Optimizar Planificación: Distribución eficiente de recursos y tareas

Elevar Calidad: Reducción de defectos y mejora continua

Reducir Defectos: Detección temprana y eliminación proactiva

Herramientas de Gestión PSP Implementadas
1. Seguimiento de Tiempo - Clockify
Propósito: Medir y analizar el tiempo real vs. estimado por fase PSP

Configuración:

Proyectos por módulo PSP

Etiquetas: PSP-Planificación, PSP-Diseño, PSP-Codificación, PSP-Revisión, PSP-Testing

Reportes semanales de productividad

2. Gestión de Defectos - GitHub Issues
Propósito: Registrar y clasificar defectos según metodología PSP

Template PSP para Defectos:

markdown
## Clasificación PSP del Defecto

### Fase de Inyección
- [ ] Planificación
- [ ] Diseño 
- [ ] Codificación
- [ ] Revisión

### Fase de Eliminación
- [ ] Revisión
- [ ] Compilación
- [ ] Testing
- [ ] Post-release

### Tipo de Defecto (PSP)
- [ ] Documentación
- [ ] Sintaxis
- [ ] Lógica
- [ ] Interfaz de Usuario
- [ ] Asignación
- [ ] Empaquetamiento
3. Análisis de Métricas - Google Sheets
Propósito: Calcular y visualizar métricas clave del PSP

Planillas implementadas:

Registro de Tiempo PSP: Estimado vs. Real por fase

Log de Defectos PSP: Clasificación y tendencias

Métricas de Calidad: Eficiencia por fase de revisión

Proceso PSP Implementado
Fase 1: Planificación PSP
text
1. Estimación inicial de tamaño y esfuerzo
2. Desglose en tareas específicas
3. Asignación de tiempos por fase PSP
4. Registro en Clockify y GitHub Projects
Fase 2: Desarrollo con Seguimiento
text
1. Codificación
2. Revisión sistemática de código
3. Registro de defectos encontrados
4. Clasificación PSP de cada defecto
Fase 3: Análisis y Mejora
text
1. Recolección semanal de métricas
2. Análisis de desviaciones en estimaciones
3. Identificación de patrones en defectos
4. Ajuste de procesos 
Métricas PSP Clave Monitoreadas
A. Métricas de Tiempo
Precisión de Estimaciones: (Tiempo Real / Tiempo Estimado) × 100

Distribución por Fase: % tiempo en cada fase PSP

Tendencia de Mejora: Evolución de precisión en el tiempo

B. Métricas de Calidad
Densidad de Defectos: Defectos / Líneas de Código

Eficiencia de Eliminación: % defectos encontrados antes de testing

Tasa de Defectos por Hora: Defectos / Horas de desarrollo

C. Métricas de Proceso
Tiempo de Ciclo: Desde inicio hasta completación

Velocidad de Desarrollo: Puntos de historia por sprint

Cumplimiento de Plan: % tareas completadas vs. planificado

🔄 Ciclo de Mejora Continua PSP
1. Medición
Recolección sistemática de datos

Registro consistente en herramientas

Validación de integridad de datos

2. Análisis
Identificación de causas raíz

Patrones en estimaciones erróneas

Tipos recurrentes de defectos

3. Ajuste
Refinamiento de técnicas de estimación

Mejora en procesos de revisión

Optimización de checklist de calidad

4. Validación
Verificación de mejoras en siguiente ciclo

Ajuste continuo basado en resultados

Documentación de lecciones aprendidas

🚀 Beneficios Esperados del PSP
Corto Plazo (1-2 iteraciones)
20% mejora en precisión de estimaciones

15% reducción en defectos post-release

Mayor visibilidad del progreso real

Mediano Plazo (3-4 iteraciones)
35% mejora en calidad del código

Estimaciones dentro de ±10% de precisión

Procesos estandarizados y repetibles

Largo Plazo (5+ iteraciones)
Cultura de mejora continua establecida

Métricas predictivas confiables

Calidad consistente y medible

📋 Checklist de Implementación PSP
Configuración completa de herramientas

Entrenamiento del equipo en PSP

Templates de defectos PSP implementados

Proceso de time tracking establecido

Planilla de métricas configurada

Primer ciclo de medición completado

Análisis inicial de datos

Plan de mejora definido

📝 Ejemplo de Registro PSP
Registro de Tiempo Semanal
Fase PSP	Estimado (h)	Real (h)	Desviación
Planificación	5	6	+20%
Diseño	8	7	-12.5%
Codificación	20	22	+10%
Revisión	4	5	+25%
Total	37	40	+8.1%
Registro de Defectos
Tipo Defecto	Inyectados	Eliminados	Eficiencia
Sintaxis	5	5	100%
Lógica	8	6	75%
Documentación	3	3	100%
Total	16	14	87.5%
🔗 Integración con Herramientas
GitHub Projects + Clockify
Issues vinculados con registros de tiempo

Milestones con estimaciones PSP

Labels para clasificación PSP

Google Sheets + GitHub API
Exportación automática de issues

Cálculo de métricas en tiempo real

Dashboards de progreso PSP
