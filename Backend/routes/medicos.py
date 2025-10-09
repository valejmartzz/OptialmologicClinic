from fastapi import APIRouter, HTTPException, Depends
from database import get_db_connection
import mysql.connector

router = APIRouter()

@router.get("/perfil")
async def obtener_perfil_medico():
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    try:
        cursor = conn.cursor(dictionary=True)
        
        # Obtener datos del médico (id_medico debería venir del token)
        # Por ahora usamos un ID fijo para pruebas
        cursor.execute("""
            SELECT u.nombres, u.apellidos, e.nombre as especialidad 
            FROM usuario u 
            LEFT JOIN especialidad e ON u.id_especialidad = e.id_especialidad 
            WHERE u.id_usuario = %s
        """, (1,))  # Cambiar por ID del médico del token
        
        medico = cursor.fetchone()
        if not medico:
            raise HTTPException(status_code=404, detail="Médico no encontrado")
            
        return medico
        
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {e}")
    finally:
        cursor.close()
        conn.close()

@router.get("/estadisticas")
async def obtener_estadisticas_medico():
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    try:
        cursor = conn.cursor(dictionary=True)
        
        # Citas de hoy
        cursor.execute("""
            SELECT COUNT(*) as citas_hoy 
            FROM cita 
            WHERE id_medico = %s AND DATE(fecha) = CURDATE()
        """, (1,))  # ID del médico
        
        citas_hoy = cursor.fetchone()['citas_hoy']
        
        # Total pacientes únicos
        cursor.execute("""
            SELECT COUNT(DISTINCT id_paciente) as total_pacientes 
            FROM cita 
            WHERE id_medico = %s
        """, (1,))
        total_pacientes = cursor.fetchone()['total_pacientes']
        
        # Citas pendientes
        cursor.execute("""
            SELECT COUNT(*) as citas_pendientes 
            FROM cita 
            WHERE id_medico = %s AND estado = 'programada'
        """, (1,))
        citas_pendientes = cursor.fetchone()['citas_pendientes']
        
        # Citas completadas
        cursor.execute("""
            SELECT COUNT(*) as citas_completadas 
            FROM cita 
            WHERE id_medico = %s AND estado = 'completada'
        """, (1,))
        citas_completadas = cursor.fetchone()['citas_completadas']
        
        return {
            "citasHoy": citas_hoy,
            "totalPacientes": total_pacientes,
            "citasPendientes": citas_pendientes,
            "citasCompletadas": citas_completadas
        }
        
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {e}")
    finally:
        cursor.close()
        conn.close()

@router.get("/citas-hoy")
async def obtener_citas_hoy():
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    try:
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("""
            SELECT c.id_cita, c.fecha, c.hora, c.motivo, c.estado,
                   p.nombres as paciente_nombres, p.apellidos as paciente_apellidos
            FROM cita c
            JOIN usuario p ON c.id_paciente = p.id_usuario
            WHERE c.id_medico = %s AND DATE(c.fecha) = CURDATE()
            ORDER BY c.hora ASC
        """, (1,))  # ID del médico
        
        citas = cursor.fetchall()
        
        # Formatear datos para el frontend
        citas_formateadas = []
        for cita in citas:
            citas_formateadas.append({
                "id": cita['id_cita'],
                "hora": cita['hora'].strftime('%H:%M') if cita['hora'] else '',
                "paciente": f"{cita['paciente_nombres']} {cita['paciente_apellidos']}",
                "tipo": cita['motivo'],
                "estado": cita['estado']
            })
        
        return citas_formateadas
        
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {e}")
    finally:
        cursor.close()
        conn.close()