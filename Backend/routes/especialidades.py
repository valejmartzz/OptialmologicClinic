from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/especialidades", tags=["Especialidades"])

@router.get("/", response_model=list[schemas.EspecialidadOut])
def listar(db: Session = Depends(get_db)):
    return db.query(models.Especialidad).all()

@router.get("/{id}", response_model=schemas.EspecialidadOut)
def obtener(id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Especialidad).filter(models.Especialidad.id_especialidad == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Especialidad no encontrada")
    return obj

@router.post("/", response_model=schemas.EspecialidadOut)
def crear(data: schemas.EspecialidadCreate, db: Session = Depends(get_db)):
    nuevo = models.Especialidad(**data.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.put("/{id}", response_model=schemas.EspecialidadOut)
def actualizar(id: int, data: schemas.EspecialidadUpdate, db: Session = Depends(get_db)):
    obj = db.query(models.Especialidad).filter(models.Especialidad.id_especialidad == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Especialidad no encontrada")
    for k, v in data.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
