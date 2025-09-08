from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

@router.get("/", response_model=list[schemas.UsuarioOut])
def listar(db: Session = Depends(get_db)):
    return db.query(models.Usuario).all()

@router.get("/{id}", response_model=schemas.UsuarioOut)
def obtener(id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Usuario).filter(models.Usuario.id_usuario == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return obj

@router.post("/", response_model=schemas.UsuarioOut)
def crear(data: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    nuevo = models.Usuario(**data.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.put("/{id}", response_model=schemas.UsuarioOut)
def actualizar(id: int, data: schemas.UsuarioUpdate, db: Session = Depends(get_db)):
    obj = db.query(models.Usuario).filter(models.Usuario.id_usuario == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    for k, v in data.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{id}")
def eliminar(id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Usuario).filter(models.Usuario.id_usuario == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.delete(obj)
    db.commit()
    return {"message": "Usuario eliminado correctamente"}
