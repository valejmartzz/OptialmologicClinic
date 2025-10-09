from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/recordatorios", tags=["Recordatorios"])

@router.get("/", response_model=list[schemas.RecordatorioOut])
def listar(db: Session = Depends(get_db)):
    return db.query(models.Recordatorio).all()

@router.get("/{id}", response_model=schemas.RecordatorioOut)
def obtener(id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Recordatorio).filter(models.Recordatorio.id_recordatorio == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Recordatorio no encontrado")
    return obj

@router.post("/", response_model=schemas.RecordatorioOut)
def crear(data: schemas.RecordatorioCreate, db: Session = Depends(get_db)):
    nuevo = models.Recordatorio(**data.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.put("/{id}", response_model=schemas.RecordatorioOut)
def actualizar(id: int, data: schemas.RecordatorioUpdate, db: Session = Depends(get_db)):
    obj = db.query(models.Recordatorio).filter(models.Recordatorio.id_recordatorio == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Recordatorio no encontrado")
    for k, v in data.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{id}")
def eliminar(id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Recordatorio).filter(models.Recordatorio.id_recordatorio == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Recordatorio no encontrado")
    db.delete(obj)
    db.commit()
    return {"message": "Recordatorio eliminado correctamente"}