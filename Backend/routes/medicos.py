from fastapi import APIRouter, HTTPException, Depends, Query
from database import get_db_connection
import mysql.connector
from typing import Optional
from datetime import datetime, date

router = APIRouter()

# Dependencia para obtener ID del médico del token (simulada por ahora)
def get_current_medico_id():
    return 1  # En producción, esto vendría del token JWT

@router.get("/perfil")
async def obtener_perfil_medico(medico_id: int = Depends(get_current_medico_id)):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    try:
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("""
            SELECT 
                u.id_usuario,
                u.nombres, 
                u.apellidos, 
                u.correo,
                u.telefono,
                e.nombre as especialidad 
            FROM usuario u 
            LEFT JOIN especialidad e ON u.id_especialidad = e.id_especialidad 
            WHERE u.id_usuario = %s AND u.id_rol = 2
        """, (medico_id,))
        
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
async def obtener_estadisticas_medico(medico_id: int = Depends(get_current_medico_id)):
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
        """, (medico_id,))
        citas_hoy = cursor.fetchone()['citas_hoy']
        
        # Total pacientes únicos
        cursor.execute("""
            SELECT COUNT(DISTINCT id_paciente) as total_pacientes 
            FROM cita 
            WHERE id_medico = %s
        """, (medico_id,))
        total_pacientes = cursor.fetchone()['total_pacientes']
        
        # Citas pendientes
        cursor.execute("""
            SELECT COUNT(*) as citas_pendientes 
            FROM cita 
            WHERE id_medico = %s AND estado = 'programada'
        """, (medico_id,))
        citas_pendientes = cursor.fetchone()['citas_pendientes']
        
        # Citas completadas
        cursor.execute("""
            SELECT COUNT(*) as citas_completadas 
            FROM cita 
            WHERE id_medico = %s AND estado = 'completada'
        """, (medico_id,))
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
async def obtener_citas_hoy(medico_id: int = Depends(get_current_medico_id)):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
    
    try:
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("""
            SELECT 
                c.id_cita, 
                c.fecha, 
                c.hora, 
                c.motivo, 
                c.estado,
                p.nombres as paciente_nombres, 
                p.apellidos as paciente_apellidos,
                p.telefono as paciente_telefono
            FROM cita c
            JOIN usuario p ON c.id_paciente = p.id_usuario
            WHERE c.id_medico = %s AND DATE(c.fecha) = CURDATE()
            ORDER BY c.hora ASC
        """, (medico_id,))
        
        citas = cursor.fetchall()
        
        # Formatear datos para el frontend
        citas_formateadas = []
        for cita in citas:
            citas_formateadas.append({
                "id": cita['id_cita'],
                "fecha": cita['fecha'].strftime('%Y-%m-%d') if cita['fecha'] else '',
                "hora": cita['hora'].strftime('%H:%M') if cita['hora'] else '',
                "paciente": f"{cita['paciente_nombres']} {cita['paciente_apellidos']}",
                "telefono": cita['paciente_telefono'],
                "motivo": cita['motivo'],
                "estado": cita['estado']
            })
        
        return citas_formateadas
        
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {e}")
    finally:
        cursor.close()
        conn.close()