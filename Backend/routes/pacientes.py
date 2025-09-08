from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/pacientes", tags=["Pacientes"])

@router.get("/", response_model=list[schemas.PacienteOut])
def listar(db: Session = Depends(get_db)):
    return db.query(models.Paciente).all()

@router.get("/{id_paciente}", response_model=schemas.PacienteOut)
def obtener(id_paciente: int, db: Session = Depends(get_db)):
    paciente = db.query(models.Paciente).filter(models.Paciente.id_paciente == id_paciente).first()
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")
    return paciente

@router.post("/", response_model=schemas.PacienteOut)
def crear(paciente: schemas.PacienteCreate, db: Session = Depends(get_db)):
    nuevo = models.Paciente(**paciente.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.put("/{id_paciente}", response_model=schemas.PacienteOut)
def actualizar(id_paciente: int, datos: schemas.PacienteUpdate, db: Session = Depends(get_db)):
    paciente = db.query(models.Paciente).filter(models.Paciente.id_paciente == id_paciente).first()
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")
    for k, v in datos.dict(exclude_unset=True).items():
        setattr(paciente, k, v)
    db.commit()
    db.refresh(paciente)
    return paciente

@router.delete("/{id_paciente}")
def eliminar(id_paciente: int, db: Session = Depends(get_db)):
    paciente = db.query(models.Paciente).filter(models.Paciente.id_paciente == id_paciente).first()
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")
    db.delete(paciente)
    db.commit()
    return {"message": "Paciente eliminado correctamente"}
