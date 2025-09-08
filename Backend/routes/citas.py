from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/citas", tags=["Citas"])

@router.get("/", response_model=list[schemas.CitaOut])
def listar(db: Session = Depends(get_db)):
    return db.query(models.Cita).all()

@router.get("/{id}", response_model=schemas.CitaOut)
def obtener(id: int, db: Session = Depends(get_db)):
    cita = db.query(models.Cita).filter(models.Cita.id_cita == id).first()
    if not cita:
        raise HTTPException(status_code=404, detail="Cita no encontrada")
    return cita

@router.post("/", response_model=schemas.CitaOut)
def crear(data: schemas.CitaCreate, db: Session = Depends(get_db)):
    nueva = models.Cita(**data.dict())
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return nueva

@router.put("/{id}", response_model=schemas.CitaOut)
def actualizar(id: int, data: schemas.CitaUpdate, db: Session = Depends(get_db)):
    obj = db.query(models.Cita).filter(models.Cita.id_cita == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Cita no encontrada")
    for k, v in data.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{id}")
def eliminar(id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Cita).filter(models.Cita.id_cita == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Cita no encontrada")
    db.delete(obj)
    db.commit()
    return {"message": "Cita eliminada correctamente"}
