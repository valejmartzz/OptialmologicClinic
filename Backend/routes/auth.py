# routes/auth.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/auth", tags=["Autenticación"])

@router.post("/login")
def login(credenciales: schemas.LoginRequest, db: Session = Depends(get_db)):
    # Buscar usuario por correo
    usuario = db.query(models.Usuario).filter(
        models.Usuario.correo == credenciales.correo
    ).first()
    
    if not usuario:
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")
    
    # Verificar contraseña (en producción usar hashing)
    if usuario.contrasena != credenciales.contrasena:
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")
    
    return {
        "mensaje": "Login exitoso",
        "usuario": {
            "id": usuario.id_usuario,
            "nombres": usuario.nombres,
            "apellidos": usuario.apellidos,
            "correo": usuario.correo,
            "id_rol": usuario.id_rol,
            "id_especialidad": usuario.id_especialidad
        }
    }

# Agrega esto a schemas.py
class LoginRequest(BaseModel):
    correo: str
    contrasena: str