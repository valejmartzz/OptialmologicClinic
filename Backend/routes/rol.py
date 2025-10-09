from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/roles", tags=["Roles"])

@router.get("/", response_model=list[schemas.RolOut])
def listar(db: Session = Depends(get_db)):
    return db.query(models.Rol).all()

@router.get("/{id}", response_model=schemas.RolOut)
def obtener(id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Rol).filter(models.Rol.id_rol == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    return obj

@router.post("/", response_model=schemas.RolOut)
def crear(data: schemas.RolCreate, db: Session = Depends(get_db)):
    nuevo = models.Rol(**data.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.put("/{id}", response_model=schemas.RolOut)
def actualizar(id: int, data: schemas.RolUpdate, db: Session = Depends(get_db)):
    obj = db.query(models.Rol).filter(models.Rol.id_rol == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    for k, v in data.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{id}")
def eliminar(id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Rol).filter(models.Rol.id_rol == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    db.delete(obj)
    db.commit()
    return {"message": "Rol eliminado correctamente"}