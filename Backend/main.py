from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Permitir conexión desde tu frontend (http://localhost:5173 en Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas de ejemplo
@app.get("/")
def root():
    return {"mensaje": "API funcionando 🚀"}

@app.get("/usuarios")
def get_usuarios():
    return [
        {"id": 1, "nombre": "Samuel"},
        {"id": 2, "nombre": "Valery"}
    ]
