from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/citas", tags=["Citas"])

@router.put("/citas/{cita_id}")
async def actualizar_estado_cita(cita_id: int, datos_actualizacion: dict):
    """
    Actualiza el estado de una cita
    """
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    try:
        cursor = conn.cursor()
        
        # Verificar que la cita existe
        cursor.execute("SELECT id_cita FROM cita WHERE id_cita = %s", (cita_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Cita no encontrada")
        
        # Actualizar estado
        cursor.execute(
            "UPDATE cita SET estado = %s WHERE id_cita = %s",
            (datos_actualizacion.get('estado'), cita_id)
        )
        
        conn.commit()
        
        return {
            "success": True,
            "message": "Estado de cita actualizado correctamente"
        }
        
    except mysql.connector.Error as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {e}")
    finally:
        cursor.close()
        conn.close()

@router.get("/", response_model=list[schemas.CitaOut])
def listar(db: Session = Depends(get_db)):
    return db.query(models.Cita).all()


@router.put("/citas/{cita_id}")
async def actualizar_estado_cita(cita_id: int, datos_actualizacion: dict):
    """
    Actualiza el estado de una cita
    """
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    try:
        cursor = conn.cursor()
        
        # Verificar que la cita existe
        cursor.execute("SELECT id_cita FROM cita WHERE id_cita = %s", (cita_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Cita no encontrada")
        
        # Actualizar estado
        cursor.execute(
            "UPDATE cita SET estado = %s WHERE id_cita = %s",
            (datos_actualizacion.get('estado'), cita_id)
        )
        
        conn.commit()
        
        return {
            "success": True,
            "message": "Estado de cita actualizado correctamente"
        }
        
    except mysql.connector.Error as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {e}")
    finally:
        cursor.close()
        conn.close()


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
