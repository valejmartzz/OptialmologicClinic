# # main.py - VERSIÓN CORREGIDA CON NOMBRES REALES
# from fastapi import FastAPI, Depends
# from fastapi.middleware.cors import CORSMiddleware
# from sqlalchemy.orm import Session
# import os
# import sys

# # Agregar el directorio actual al path de Python
# sys.path.append(os.path.dirname(__file__))

# print("🚀 Iniciando Oftalmologic Clinic API...")

# # Importar database primero
# from database import engine, get_db

# # Importar models
# try:
#     import models
#     print("✅ Models importado correctamente")
    
#     # Crear tablas
#     models.Base.metadata.create_all(bind=engine)
#     print("✅ Tablas creadas en la base de datos")
    
# except Exception as e:
#     print(f"❌ Error con models: {e}")
#     raise

# app = FastAPI(
#     title="Oftalmologic Clinic API",
#     description="API para gestión de clínica oftalmológica",
#     version="1.0.0"
# )

# # CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Importar rutas con los nombres REALES que tienes
# try:
#     # Rutas principales que SÍ tienes
#     from routes.usuarios import router as usuarios_router
#     from routes.citas import router as citas_router
#     from routes.especialidades import router as especialidades_router
#     from routes.medicamentos import router as medicamentos_router
#     from routes.recetas import router as recetas_router
#     from routes.tratamientos import router as tratamientos_router
#     from routes.diagnostico import router as diagnostico_router
#     from routes.encuestas import router as encuestas_router
    
#     app.include_router(usuarios_router)
#     app.include_router(citas_router)
#     app.include_router(especialidades_router)
#     app.include_router(medicamentos_router)
#     app.include_router(recetas_router)
#     app.include_router(tratamientos_router)
#     app.include_router(diagnostico_router)
#     app.include_router(encuestas_router)
#     print("✅ 8 rutas principales cargadas")
    
# except Exception as e:
#     print(f"⚠ Error cargando rutas principales: {e}")

# # Rutas adicionales (opcionales)
# try:
#     from routes.rol import router as rol_router
#     from routes.recordatorio import router as recordatorio_router
#     from routes.pacientes import router as pacientes_router
#     from routes.medicos import router as medicos_router
#     from routes.auth import router as auth_router
    
#     app.include_router(rol_router)
#     app.include_router(recordatorio_router)
#     app.include_router(pacientes_router)
#     app.include_router(medicos_router)
#     app.include_router(auth_router)
#     print("✅ 5 rutas adicionales cargadas")
    
# except Exception as e:
#     print(f"⚠ Algunas rutas adicionales no disponibles: {e}")

# @app.get("/")
# def root():
#     return {"message": "Oftalmologic Clinic API - Bienvenido"}

# @app.get("/health")
# def health_check():
#     return {"status": "healthy"}

# @app.get("/test-db")
# def test_db(db: Session = Depends(get_db)):
#     try:
#         db.execute("SELECT 1")
#         return {"database": "connected", "status": "success"}
#     except Exception as e:
#         return {"database": "error", "status": "failed", "detail": str(e)}

# print("🎯 API lista en http://localhost:8000")
# print("📚 Documentación en http://localhost:8000/docs")


# @app.post("/api/registro")
# async def registro_directo(usuario_data: dict):
#     print("🔵 REGISTRO - Datos recibidos:", usuario_data)
    
#     from database import get_db_connection
#     conn = get_db_connection()
    
#     if not conn:
#         return {"success": False, "message": "Error de conexión a BD"}
    
#     try:
#         cursor = conn.cursor()
        
#         # Verificar si el correo ya existe
#         cursor.execute("SELECT id FROM usuario WHERE correo = %s", (usuario_data.get('correo'),))
#         if cursor.fetchone():
#             return {"success": False, "message": "El correo ya está registrado"}
        
#         # Insertar usuario
#         cursor.execute(
#             """
#             INSERT INTO usuario 
#             (nombres, apellidos, sexo, tipo_identificacion, numero_identificacion, 
#              correo, contrasena, telefono, fecha_nacimiento, direccion, alergias, 
#              antecedentes, id_rol) 
#             VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
#             """,
#             (
#                 usuario_data.get('nombres'),
#                 usuario_data.get('apellidos'),
#                 usuario_data.get('sexo'),
#                 usuario_data.get('tipo_identificacion'),
#                 usuario_data.get('numero_identificacion'),
#                 usuario_data.get('correo'),
#                 usuario_data.get('contrasena'),
#                 usuario_data.get('telefono'),
#                 usuario_data.get('fecha_nacimiento'),
#                 usuario_data.get('direccion'),
#                 usuario_data.get('alergias'),
#                 usuario_data.get('antecedentes'),
#                 3  # paciente
#             )
#         )
        
#         conn.commit()
#         return {
#             "success": True,
#             "message": "Usuario registrado exitosamente",
#             "user_id": cursor.lastrowid
#         }
        
#     except Exception as e:
#         conn.rollback()
#         return {"success": False, "message": f"Error: {str(e)}"}
#     finally:
#         cursor.close()
#         conn.close()

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
    

# # En main.py, agrega:
# try:
#     from routes.auth import router as auth_router
#     app.include_router(auth_router)
#     print("✅ Autenticación cargada")
# except Exception as e:
#     print(f"⚠ Auth no disponible: {e}")
    
    
# # Endpoint específico para registro de pacientes
# @app.post("/api/auth/registro")
# async def registro_paciente(usuario_data: dict):
#     print("🔵 REGISTRO PACIENTE - Datos recibidos:", usuario_data)
    
#     from database import get_db_connection
#     conn = get_db_connection()
    
#     if not conn:
#         return {"success": False, "message": "Error de conexión a BD"}
    
#     try:
#         cursor = conn.cursor()
        
#         # Verificar si el correo ya existe
#         cursor.execute("SELECT id_usuario FROM usuario WHERE correo = %s", (usuario_data.get('correo'),))
#         if cursor.fetchone():
#             return {"success": False, "message": "El correo ya está registrado"}
        
#         # Verificar si la identificación ya existe
#         cursor.execute("SELECT id_usuario FROM usuario WHERE numero_identificacion = %s", (usuario_data.get('numero_identificacion'),))
#         if cursor.fetchone():
#             return {"success": False, "message": "El número de identificación ya existe"}
        
#         # Insertar nuevo paciente (SIEMPRE id_rol = 3)
#         cursor.execute(
#             """
#             INSERT INTO usuario 
#             (nombres, apellidos, sexo, tipo_identificacion, numero_identificacion, 
#              correo, contrasena, telefono, fecha_nacimiento, direccion, alergias, 
#              antecedentes, id_rol) 
#             VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
#             """,
#             (
#                 usuario_data.get('nombres'),
#                 usuario_data.get('apellidos'),
#                 usuario_data.get('sexo'),
#                 usuario_data.get('tipo_identificacion'),
#                 usuario_data.get('numero_identificacion'),
#                 usuario_data.get('correo'),
#                 usuario_data.get('contrasena'),
#                 usuario_data.get('telefono'),
#                 usuario_data.get('fecha_nacimiento'),
#                 usuario_data.get('direccion'),
#                 usuario_data.get('alergias'),
#                 usuario_data.get('antecedentes'),
#                 3  # ← SIEMPRE paciente, no se acepta desde el frontend
#             )
#         )
        
#         conn.commit()
#         user_id = cursor.lastrowid
        
#         print(f"✅ PACIENTE REGISTRADO: ID: {user_id}, Email: {usuario_data.get('correo')}")
        
#         return {
#             "success": True,
#             "message": "Paciente registrado exitosamente",
#             "user_id": user_id
#         }
        
#     except Exception as e:
#         conn.rollback()
#         print(f"❌ ERROR en registro: {e}")
#         return {"success": False, "message": f"Error en el servidor: {str(e)}"}
#     finally:
#         cursor.close()
#         conn.close()
        
        
# # Endpoint para registro de médicos (protegido)
# @app.post("/api/admin/registro-medico")
# async def registro_medico(usuario_data: dict, token: str = Depends(verificar_token)):
#     # Solo administradores pueden registrar médicos
#     if token.get('id_rol') != 1:
#         raise HTTPException(status_code=403, detail="No autorizado")
    
#     # Lógica similar pero con id_rol = 2
#     # ...


from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import jwt
import os
from datetime import datetime, timedelta
from typing import Optional

app = FastAPI(title="Oftalmologic Clinic API")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# INTENTAR DIFERENTES IMPORTACIONES
try:
    from database import get_db_connection
    print("✅ Usando get_db_connection")
except ImportError:
    try:
        from database import get_db
        get_db_connection = get_db
        print("✅ Usando get_db (alias)")
    except ImportError:
        print("❌ No se pudo importar la función de conexión a BD")
        # Función de emergencia
        def get_db_connection():
            try:
                connection = mysql.connector.connect(
                    host="localhost",
                    user="root", 
                    password="",
                    database="proyectodb"
                )
                return connection
            except Exception as e:
                print(f"❌ Error conectando a MySQL: {e}")
                return None

# Configuración JWT
SECRET_KEY = "tu-clave-secreta-temporal-para-desarrollo"
ALGORITHM = "HS256"

print("🚀 Backend iniciado correctamente")

# FUNCIÓN VERIFICAR TOKEN
def verificar_token(token: str = None) -> Optional[dict]:
    """
    Verifica un token JWT. En desarrollo, retorna datos simulados.
    """
    if not token:
        # En desarrollo, simular un usuario admin
        return {
            "sub": "admin@clinica.com",
            "id_usuario": 1,
            "id_rol": 1,
            "exp": datetime.utcnow() + timedelta(hours=24)
        }
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")

# ENDPOINT DE REGISTRO DE PACIENTES
@app.post("/api/auth/registro")
async def registro_paciente(usuario_data: dict):
    """
    Registra un nuevo paciente en el sistema
    """
    print("🎯 REGISTRO PACIENTE - Datos recibidos:", usuario_data)
    
    conn = get_db_connection()
    if not conn:
        return {"success": False, "message": "Error de conexión a la base de datos"}
    
    cursor = None
    try:
        cursor = conn.cursor()
        
        # Verificar si el correo ya existe
        cursor.execute("SELECT id_usuario FROM usuario WHERE correo = %s", (usuario_data.get('correo'),))
        if cursor.fetchone():
            return {"success": False, "message": "El correo ya está registrado"}
        
        # Verificar si la identificación ya existe
        cursor.execute("SELECT id_usuario FROM usuario WHERE numero_identificacion = %s", (usuario_data.get('numero_identificacion'),))
        if cursor.fetchone():
            return {"success": False, "message": "El número de identificación ya existe"}
        
        # Insertar nuevo paciente 
        cursor.execute(
            """
            INSERT INTO usuario 
            (nombres, apellidos, sexo, fecha_nacimiento, tipo_identificacion, numero_identificacion, 
            correo, contrasena, telefono, id_rol) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (
                usuario_data.get('nombres'),
                usuario_data.get('apellidos'),
                usuario_data.get('sexo'),
                usuario_data.get('fecha_nacimiento'),
                usuario_data.get('tipo_identificacion'),
                usuario_data.get('numero_identificacion'),
                usuario_data.get('correo'),
                usuario_data.get('contrasena'),
                usuario_data.get('telefono'),
                usuario_data.get('id_rol')  # ← ÚLTIMO VALOR: del frontend
            )
        )   
        
        conn.commit()
        user_id = cursor.lastrowid
        
        print(f"✅ PACIENTE REGISTRADO: ID: {user_id}")
        
        return {
            "success": True,
            "message": "Paciente registrado exitosamente",
            "user_id": user_id
        }
        
    except Exception as e:
        if conn:
            conn.rollback()
        print(f"❌ ERROR en registro: {e}")
        return {"success": False, "message": f"Error: {str(e)}"}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# ENDPOINT DE LOGIN
@app.post("/api/auth/login")
async def login(login_data: dict):
    """
    Inicia sesión en el sistema
    """
    correo = login_data.get('correo')
    contrasena = login_data.get('contrasena')
    
    conn = get_db_connection()
    if not conn:
        return {"success": False, "message": "Error de conexión a BD"}
    
    try:
        cursor = conn.cursor(dictionary=True)
        
        # Buscar usuario
        cursor.execute(
            "SELECT id_usuario, nombres, apellidos, correo, id_rol FROM usuario WHERE correo = %s AND contrasena = %s",
            (correo, contrasena)
        )
        usuario = cursor.fetchone()
        
        if not usuario:
            return {"success": False, "message": "Credenciales incorrectas"}
        
        # Crear token JWT
        token_data = {
            "sub": usuario['correo'],
            "id_usuario": usuario['id_usuario'],
            "id_rol": usuario['id_rol'],
            "exp": datetime.utcnow() + timedelta(hours=24)
        }
        token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
        
        return {
            "success": True,
            "token": token,
            "usuario": {
                "id": usuario['id_usuario'],
                "nombres": usuario['nombres'],
                "apellidos": usuario['apellidos'],
                "correo": usuario['correo'],
                "id_rol": usuario['id_rol']
            }
        }
        
    except Exception as e:
        print(f"❌ ERROR en login: {e}")
        return {"success": False, "message": f"Error: {str(e)}"}
    finally:
        cursor.close()
        conn.close()

# ENDPOINTS BÁSICOS
@app.get("/")
async def root():
    return {"message": "Oftalmologic Clinic API - ✅ FUNCIONANDO"}

@app.get("/health")
async def health_check():
    conn = get_db_connection()
    db_status = "conectada" if conn else "error"
    if conn:
        conn.close()
    return {"status": "ok", "message": f"Sistema funcionando - BD: {db_status}"}

@app.get("/test-db")
async def test_db():
    conn = get_db_connection()
    if conn:
        conn.close()
        return {"status": "success", "message": "✅ Base de datos conectada"}
    else:
        return {"status": "error", "message": "❌ Error conectando a base de datos"}

print("✅ Backend listo - Endpoints disponibles:")
print("   POST /api/auth/registro")
print("   POST /api/auth/login") 
print("📚 Documentación en http://localhost:8000/docs")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)