from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/recetas", tags=["Recetas"])

@router.get("/", response_model=list[schemas.RecetaOut])
def listar(db: Session = Depends(get_db)):
    return db.query(models.Receta).all()

@router.get("/{id}", response_model=schemas.RecetaOut)
def obtener(id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Receta).filter(models.Receta.id_receta == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Receta no encontrada")
    return obj

@router.post("/", response_model=schemas.RecetaOut)
def crear(data: schemas.RecetaCreate, db: Session = Depends(get_db)):
    nuevo = models.Receta(**data.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.put("/{id}", response_model=schemas.RecetaOut)
def actualizar(id: int, data: schemas.RecetaUpdate, db: Session = Depends(get_db)):
    obj = db.query(models.Receta).filter(models.Receta.id_receta == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Receta no encontrada")
    for k, v in data.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{id}")
def eliminar(id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Receta).filter(models.Receta.id_receta == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Receta no encontrada")
    db.delete(obj)
    db.commit()
    return {"message": "Receta eliminada correctamente"}
