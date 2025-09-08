from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/diagnosticos", tags=["Diagnosticos"])

@router.get("/", response_model=list[schemas.DiagnosticoOut])
def listar(db: Session = Depends(get_db)):
    return db.query(models.Diagnostico).all()

@router.get("/{id}", response_model=schemas.DiagnosticoOut)
def obtener(id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Diagnostico).filter(models.Diagnostico.id_diagnostico == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Diagnostico no encontrado")
    return obj

@router.post("/", response_model=schemas.DiagnosticoOut)
def crear(data: schemas.DiagnosticoCreate, db: Session = Depends(get_db)):
    nuevo = models.Diagnostico(**data.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.put("/{id}", response_model=schemas.DiagnosticoOut)
def actualizar(id: int, data: schemas.DiagnosticoUpdate, db: Session = Depends(get_db)):
    obj = db.query(models.Diagnostico).filter(models.Diagnostico.id_diagnostico == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Diagnostico no encontrado")
    for k, v in data.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{id}")
def eliminar(id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Diagnostico).filter(models.Diagnostico.id_diagnostico == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Diagnostico no encontrado")
    db.delete(obj)
    db.commit()
    return {"message": "Diagnostico eliminado correctamente"}
