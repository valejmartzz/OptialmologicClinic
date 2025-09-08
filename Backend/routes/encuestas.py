from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/encuestas", tags=["Encuestas"])

@router.get("/", response_model=list[schemas.EncuestaOut])
def listar(db: Session = Depends(get_db)):
    return db.query(models.Encuesta).all()

@router.get("/{id}", response_model=schemas.EncuestaOut)
def obtener(id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Encuesta).filter(models.Encuesta.id_encuesta == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Encuesta no encontrada")
    return obj

@router.post("/", response_model=schemas.EncuestaOut)
def crear(data: schemas.EncuestaCreate, db: Session = Depends(get_db)):
    nuevo = models.Encuesta(**data.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.put("/{id}", response_model=schemas.EncuestaOut)
def actualizar(id: int, data: schemas.EncuestaUpdate, db: Session = Depends(get_db)):
    obj = db.query(models.Encuesta).filter(models.Encuesta.id_encuesta == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Encuesta no encontrada")
    for k, v in data.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{id}")
def eliminar(id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Encuesta).filter(models.Encuesta.id_encuesta == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Encuesta no encontrada")
    db.delete(obj)
    db.commit()
    return {"message": "Encuesta eliminada correctamente"}
