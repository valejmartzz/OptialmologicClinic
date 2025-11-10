from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/pacientes", tags=["Pacientes"])

@router.get("/pacientes")
async def listar_pacientes():
    """
    Obtiene todos los pacientes (usuarios con rol 3)
    """
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    try:
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("""
            SELECT 
                id_usuario, nombres, apellidos, correo, telefono,
                fecha_nacimiento, sexo, tipo_identificacion, numero_identificacion,
                direccion, alergias, antecedentes
            FROM usuario 
            WHERE id_rol = 3
            ORDER BY apellidos, nombres
        """)
        
        pacientes = cursor.fetchall()
        return pacientes
        
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {e}")
    finally:
        cursor.close()
        conn.close()

@router.get("/pacientes/{paciente_id}/historial")
async def obtener_historial_paciente(paciente_id: int):
    """
    Obtiene el historial médico de un paciente específico
    """
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    try:
        cursor = conn.cursor(dictionary=True)
        
        # Obtener información del paciente
        cursor.execute("""
            SELECT 
                id_usuario, nombres, apellidos, correo, telefono,
                fecha_nacimiento, sexo, tipo_identificacion, numero_identificacion
            FROM usuario 
            WHERE id_usuario = %s
        """, (paciente_id,))
        
        paciente = cursor.fetchone()
        if not paciente:
            raise HTTPException(status_code=404, detail="Paciente no encontrado")
        
        # Obtener citas del paciente con diagnósticos
        cursor.execute("""
            SELECT 
                c.id_cita,
                c.fecha,
                c.motivo,
                c.estado,
                d.descripcion as diagnostico,
                t.observacion as tratamiento
            FROM cita c
            LEFT JOIN diagnostico d ON c.id_cita = d.id_cita
            LEFT JOIN tratamiento t ON d.id_diagnostico = t.id_diagnostico
            WHERE c.id_paciente = %s
            ORDER BY c.fecha DESC
        """, (paciente_id,))
        
        citas = cursor.fetchall()
        
        return {
            **paciente,
            "citas": citas,
            "citasTotales": len(citas)
        }
        
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {e}")
    finally:
        cursor.close()
        conn.close()

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
