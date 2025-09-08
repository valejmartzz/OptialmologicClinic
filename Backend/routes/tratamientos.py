from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/tratamientos", tags=["Tratamientos"])

@router.get("/", response_model=list[schemas.TratamientoOut])
def listar(db: Session = Depends(get_db)):
    return db.query(models.Tratamiento).all()

@router.get("/{id}", response_model=schemas.TratamientoOut)
def obtener(id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Tratamiento).filter(models.Tratamiento.id_tratamiento == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Tratamiento no encontrado")
    return obj

@router.post("/", response_model=schemas.TratamientoOut)
def crear(data: schemas.TratamientoCreate, db: Session = Depends(get_db)):
    nuevo = models.Tratamiento(**data.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.put("/{id}", response_model=schemas.TratamientoOut)
def actualizar(id: int, data: schemas.TratamientoUpdate, db: Session = Depends(get_db)):
    obj = db.query(models.Tratamiento).filter(models.Tratamiento.id_tratamiento == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Tratamiento no encontrado")
    for k, v in data.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{id}")
def eliminar(id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Tratamiento).filter(models.Tratamiento.id_tratamiento == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Tratamiento no encontrado")
    db.delete(obj)
    db.commit()
    return {"message": "Tratamiento eliminado correctamente"}
