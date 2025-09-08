from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routes import pacientes, medicos, citas, usuarios, especialidades, medicamentos, recetas, tratamientos, diagnosticos, encuestas

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Clínica")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas principales
app.include_router(pacientes.router)
app.include_router(medicos.router)
app.include_router(citas.router)
app.include_router(usuarios.router)
app.include_router(especialidades.router)
app.include_router(medicamentos.router)
app.include_router(recetas.router)
app.include_router(tratamientos.router)
app.include_router(diagnosticos.router)
app.include_router(encuestas.router)

@app.get("/")
def home():
    return {"message": "API funcionando 🚀"}
