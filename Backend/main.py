from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import jwt
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

# Configuración JWT
SECRET_KEY = "tu-clave-secreta-temporal-para-desarrollo"
ALGORITHM = "HS256"

print("🚀 Backend iniciado correctamente")

# Función de conexión a la base de datos
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

# ========== INCLUIR RUTAS SOLO LAS QUE EXISTEN ==========
try:
    # Rutas médicas principales - SOLO incluir las que tienes
    from routes.medicos import router as medicos_router
    from routes.citas import router as citas_router
    from routes.pacientes import router as pacientes_router
    
    # Incluir rutas
    app.include_router(medicos_router, prefix="/api/medicos")
    app.include_router(citas_router, prefix="/api")
    app.include_router(pacientes_router, prefix="/api")
    
    print("✅ Rutas de médico cargadas correctamente")
    
except Exception as e:
    print(f"⚠ Algunas rutas no disponibles: {e}")

# ========== ENDPOINTS DE AUTENTICACIÓN (EXISTENTES EN MAIN.PY) ==========

@app.post("/api/auth/registro")
async def registro_paciente(usuario_data: dict):
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
        
        id_rol = 3  # Siempre paciente
        
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
                id_rol
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

@app.post("/api/auth/login")
async def login(login_data: dict):
    """
    Inicia sesión en el sistema con validación mejorada
    """
    print("🔐 LOGIN - Datos recibidos:", login_data)
    
    correo = login_data.get('correo', '').strip()
    contrasena = login_data.get('contrasena', '').strip()
    
    # Validaciones básicas
    if not correo or not contrasena:
        return {"success": False, "message": "Correo y contraseña son requeridos"}
    
    conn = get_db_connection()
    if not conn:
        return {"success": False, "message": "Error de conexión a la base de datos"}
    
    cursor = None
    try:
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute(
            """
            SELECT 
                id_usuario, 
                nombres, 
                apellidos, 
                correo, 
                id_rol,
                telefono,
                fecha_nacimiento
            FROM usuario 
            WHERE correo = %s AND contrasena = %s
            """,
            (correo, contrasena)
        )
        usuario = cursor.fetchone()
        
        if not usuario:
            print(f"❌ LOGIN FALLIDO para: {correo}")
            return {"success": False, "message": "Correo o contraseña incorrectos"}
        
        print(f"✅ LOGIN EXITOSO: {usuario['nombres']} {usuario['apellidos']}")
        
        # Crear token JWT con más información
        token_data = {
            "sub": usuario['correo'],
            "id_usuario": usuario['id_usuario'],
            "id_rol": usuario['id_rol'],
            "nombres": usuario['nombres'],
            "apellidos": usuario['apellidos'],
            "exp": datetime.utcnow() + timedelta(hours=24)
        }
        token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
        
        return {
            "success": True,
            "message": "Inicio de sesión exitoso",
            "token": token,
            "usuario": {
                "id": usuario['id_usuario'],
                "nombres": usuario['nombres'],
                "apellidos": usuario['apellidos'],
                "correo": usuario['correo'],
                "id_rol": usuario['id_rol'],
                "telefono": usuario['telefono']
            }
        }
        
    except Exception as e:
        print(f"❌ ERROR en login: {e}")
        return {"success": False, "message": f"Error en el servidor: {str(e)}"}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# ========== ENDPOINTS BÁSICOS ==========

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

print("🎯 API lista en http://localhost:8000")
print("📚 Documentación en http://localhost:8000/docs")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)