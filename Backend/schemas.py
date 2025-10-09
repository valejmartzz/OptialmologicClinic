# schemas.py - CORREGIDO
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, date, time
from enum import Enum

# Enums para coincidir con los modelos
class SexoEnum(str, Enum):
    M = "M"
    F = "F"
    Otro = "Otro"

class EstadoCitaEnum(str, Enum):
    programada = "programada"
    cancelada = "cancelada"
    completada = "completada"

class MedioEnum(str, Enum):
    email = "email"
    sms = "sms"
    whatsapp = "whatsapp"
    otro = "otro"

class EstadoRecordatorioEnum(str, Enum):
    pendiente = "pendiente"
    enviado = "enviado"
    fallido = "fallido"

# -------------------------
# ROL
# -------------------------
class RolBase(BaseModel):
    nombre: str

class RolCreate(RolBase):
    pass

class RolUpdate(RolBase):
    pass

class RolOut(RolBase):
    id_rol: int

    class Config:
        from_attributes = True

# -------------------------
# ESPECIALIDAD
# -------------------------
class EspecialidadBase(BaseModel):
    nombre: str

class EspecialidadCreate(EspecialidadBase):
    pass

class EspecialidadUpdate(EspecialidadBase):
    pass

class EspecialidadOut(EspecialidadBase):
    id_especialidad: int

    class Config:
        from_attributes = True

# -------------------------
# USUARIO
# -------------------------
class UsuarioBase(BaseModel):
    nombres: str
    apellidos: str
    sexo: SexoEnum
    tipo_identificacion: str
    numero_identificacion: str
    correo: EmailStr
    contrasena: str
    telefono: Optional[str] = None
    id_rol: int
    id_especialidad: Optional[int] = None

class UsuarioCreate(UsuarioBase):
    pass

class UsuarioUpdate(BaseModel):
    nombres: Optional[str] = None
    apellidos: Optional[str] = None
    sexo: Optional[SexoEnum] = None
    tipo_identificacion: Optional[str] = None
    numero_identificacion: Optional[str] = None
    correo: Optional[EmailStr] = None
    contrasena: Optional[str] = None
    telefono: Optional[str] = None
    id_rol: Optional[int] = None
    id_especialidad: Optional[int] = None

class UsuarioOut(BaseModel):
    id_usuario: int
    nombres: str
    apellidos: str
    sexo: str
    tipo_identificacion: str
    numero_identificacion: str
    correo: str
    telefono: Optional[str] = None
    id_rol: int
    id_especialidad: Optional[int] = None

    class Config:
        from_attributes = True

# -------------------------
# CITA
# -------------------------
class CitaBase(BaseModel):
    fecha: datetime
    hora: Optional[time] = None
    motivo: Optional[str] = None
    estado: EstadoCitaEnum = EstadoCitaEnum.programada
    id_paciente: int
    id_medico: int

class CitaCreate(CitaBase):
    pass

class CitaUpdate(BaseModel):
    fecha: Optional[datetime] = None
    hora: Optional[time] = None
    motivo: Optional[str] = None
    estado: Optional[EstadoCitaEnum] = None
    id_paciente: Optional[int] = None
    id_medico: Optional[int] = None

class CitaOut(CitaBase):
    id_cita: int

    class Config:
        from_attributes = True

# -------------------------
# DIAGNOSTICO
# -------------------------
class DiagnosticoBase(BaseModel):
    descripcion: str
    fecha: date
    id_cita: Optional[int] = None

class DiagnosticoCreate(DiagnosticoBase):
    pass

class DiagnosticoUpdate(DiagnosticoBase):
    pass

class DiagnosticoOut(DiagnosticoBase):
    id_diagnostico: int

    class Config:
        from_attributes = True

# -------------------------
# ENCUESTA
# -------------------------
class EncuestaBase(BaseModel):
    puntuacion: Optional[int] = None
    comentario: Optional[str] = None
    fecha: Optional[date] = None
    id_cita: Optional[int] = None

class EncuestaCreate(EncuestaBase):
    pass

class EncuestaUpdate(EncuestaBase):
    pass

class EncuestaOut(EncuestaBase):
    id_encuesta: int

    class Config:
        from_attributes = True

# -------------------------
# MEDICAMENTO
# -------------------------
class MedicamentoBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None

class MedicamentoCreate(MedicamentoBase):
    pass

class MedicamentoUpdate(MedicamentoBase):
    pass

class MedicamentoOut(MedicamentoBase):
    id_medicamento: int

    class Config:
        from_attributes = True

# -------------------------
# TRATAMIENTO
# -------------------------
class TratamientoBase(BaseModel):
    observacion: Optional[str] = None
    duracion: Optional[int] = None
    tipo: Optional[str] = None
    id_diagnostico: Optional[int] = None

class TratamientoCreate(TratamientoBase):
    pass

class TratamientoUpdate(TratamientoBase):
    pass

class TratamientoOut(TratamientoBase):
    id_tratamiento: int

    class Config:
        from_attributes = True

# -------------------------
# RECETA
# -------------------------
class RecetaBase(BaseModel):
    dosis: Optional[str] = None
    duracion: Optional[str] = None
    frecuencia: Optional[str] = None
    id_medicamento: Optional[int] = None
    id_tratamiento: Optional[int] = None

class RecetaCreate(RecetaBase):
    pass

class RecetaUpdate(RecetaBase):
    pass

class RecetaOut(RecetaBase):
    id_receta: int

    class Config:
        from_attributes = True

# -------------------------
# RECORDATORIO
# -------------------------
class RecordatorioBase(BaseModel):
    titulo: str
    mensaje: str
    fecha_envio: datetime
    medio: MedioEnum = MedioEnum.email
    estado: EstadoRecordatorioEnum = EstadoRecordatorioEnum.pendiente
    id_usuario: int
    id_cita: int

class RecordatorioCreate(RecordatorioBase):
    pass

class RecordatorioUpdate(BaseModel):
    titulo: Optional[str] = None
    mensaje: Optional[str] = None
    fecha_envio: Optional[datetime] = None
    medio: Optional[MedioEnum] = None
    estado: Optional[EstadoRecordatorioEnum] = None
    id_usuario: Optional[int] = None
    id_cita: Optional[int] = None

class RecordatorioOut(RecordatorioBase):
    id_recordatorio: int

    class Config:
        from_attributes = True