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

