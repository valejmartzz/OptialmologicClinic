# main.py - VERSIÓN CORREGIDA CON NOMBRES REALES
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os
import sys

# Agregar el directorio actual al path de Python
sys.path.append(os.path.dirname(__file__))

print("🚀 Iniciando Oftalmologic Clinic API...")

# Importar database primero
from database import engine, get_db

# Importar models
try:
    import models
    print("✅ Models importado correctamente")
    
    # Crear tablas
    models.Base.metadata.create_all(bind=engine)
    print("✅ Tablas creadas en la base de datos")
    
except Exception as e:
    print(f"❌ Error con models: {e}")
    raise

app = FastAPI(
    title="Oftalmologic Clinic API",
    description="API para gestión de clínica oftalmológica",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Importar rutas con los nombres REALES que tienes
try:
    # Rutas principales que SÍ tienes
    from routes.usuarios import router as usuarios_router
    from routes.citas import router as citas_router
    from routes.especialidades import router as especialidades_router
    from routes.medicamentos import router as medicamentos_router
    from routes.recetas import router as recetas_router
    from routes.tratamientos import router as tratamientos_router
    from routes.diagnostico import router as diagnostico_router
    from routes.encuestas import router as encuestas_router
    
    app.include_router(usuarios_router)
    app.include_router(citas_router)
    app.include_router(especialidades_router)
    app.include_router(medicamentos_router)
    app.include_router(recetas_router)
    app.include_router(tratamientos_router)
    app.include_router(diagnostico_router)
    app.include_router(encuestas_router)
    print("✅ 8 rutas principales cargadas")
    
except Exception as e:
    print(f"⚠ Error cargando rutas principales: {e}")

# Rutas adicionales (opcionales)
try:
    from routes.rol import router as rol_router
    from routes.recordatorio import router as recordatorio_router
    from routes.pacientes import router as pacientes_router
    from routes.medicos import router as medicos_router
    from routes.auth import router as auth_router
    
    app.include_router(rol_router)
    app.include_router(recordatorio_router)
    app.include_router(pacientes_router)
    app.include_router(medicos_router)
    app.include_router(auth_router)
    print("✅ 5 rutas adicionales cargadas")
    
except Exception as e:
    print(f"⚠ Algunas rutas adicionales no disponibles: {e}")

@app.get("/")
def root():
    return {"message": "Oftalmologic Clinic API - Bienvenido"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    try:
        db.execute("SELECT 1")
        return {"database": "connected", "status": "success"}
    except Exception as e:
        return {"database": "error", "status": "failed", "detail": str(e)}

print("🎯 API lista en http://localhost:8000")
print("📚 Documentación en http://localhost:8000/docs")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    

# En main.py, agrega:
try:
    from routes.auth import router as auth_router
    app.include_router(auth_router)
    print("✅ Autenticación cargada")
except Exception as e:
    print(f"⚠ Auth no disponible: {e}")