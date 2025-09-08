from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/medicamentos", tags=["Medicamentos"])

@router.get("/", response_model=list[schemas.MedicamentoOut])
def listar(db: Session = Depends(get_db)):
    return db.query(models.Medicamento).all()

@router.get("/{id}", response_model=schemas.MedicamentoOut)
def obtener(id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Medicamento).filter(models.Medicamento.id_medicamento == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Medicamento no encontrado")
    return obj

@router.post("/", response_model=schemas.MedicamentoOut)
def crear(data: schemas.MedicamentoCreate, db: Session = Depends(get_db)):
    nuevo = models.Medicamento(**data.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.put("/{id}", response_model=schemas.MedicamentoOut)
def actualizar(id: int, data: schemas.MedicamentoUpdate, db: Session = Depends(get_db)):
    obj = db.query(models.Medicamento).filter(models.Medicamento.id_medicamento == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Medicamento no encontrado")
    for k, v in data.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{id}")
def eliminar(id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Medicamento).filter(models.Medicamento.id_medicamento == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Medicamento no encontrado")
    db.delete(obj)
    db.commit()
    return {"message": "Medicamento eliminado correctamente"}
