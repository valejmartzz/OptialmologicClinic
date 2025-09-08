from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date

# -------------------------
# PACIENTE
# -------------------------
class PacienteBase(BaseModel):
    nombre: str
    apellido: str
    genero: str
    direccion: Optional[str] = None
    telefono: Optional[str] = None
    edad: Optional[int] = None
    historia_clinica: Optional[str] = None

class PacienteCreate(PacienteBase): pass
class PacienteUpdate(PacienteBase): pass
class PacienteOut(PacienteBase):
    id_paciente: int
    class Config: orm_mode = True

# -------------------------
# MEDICO
# -------------------------
class MedicoBase(BaseModel):
    nombre: str
    apellido: str
    telefono: Optional[str] = None
    id_especialidad: Optional[int] = None

class MedicoCreate(MedicoBase): pass
class MedicoUpdate(MedicoBase): pass
class MedicoOut(MedicoBase):
    id_medico: int
    class Config: orm_mode = True

# -------------------------
# ESPECIALIDAD
# -------------------------
class EspecialidadBase(BaseModel):
    nombre: str

class EspecialidadCreate(EspecialidadBase): pass
class EspecialidadUpdate(EspecialidadBase): pass
class EspecialidadOut(EspecialidadBase):
    id_especialidad: int
    class Config: orm_mode = True

# -------------------------
# CITA
# -------------------------
class CitaBase(BaseModel):
    fecha: datetime
    motivo: Optional[str] = None
    estado: Optional[str] = "programada"
    id_paciente: Optional[int] = None
    id_medico: Optional[int] = None

class CitaCreate(CitaBase): pass
class CitaUpdate(CitaBase): pass
class CitaOut(CitaBase):
    id_cita: int
    class Config: orm_mode = True

# -------------------------
# DIAGNOSTICO
# -------------------------
class DiagnosticoBase(BaseModel):
    descripcion: str
    fecha: date
    id_cita: Optional[int] = None

class DiagnosticoCreate(DiagnosticoBase): pass
class DiagnosticoUpdate(DiagnosticoBase): pass
class DiagnosticoOut(DiagnosticoBase):
    id_diagnostico: int
    class Config: orm_mode = True

# -------------------------
# TRATAMIENTO
# -------------------------
class TratamientoBase(BaseModel):
    observacion: Optional[str] = None
    duracion: Optional[int] = None
    tipo: Optional[str] = None
    id_diagnostico: Optional[int] = None

class TratamientoCreate(TratamientoBase): pass
class TratamientoUpdate(TratamientoBase): pass
class TratamientoOut(TratamientoBase):
    id_tratamiento: int
    class Config: orm_mode = True

# -------------------------
# MEDICAMENTO
# -------------------------
class MedicamentoBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None

class MedicamentoCreate(MedicamentoBase): pass
class MedicamentoUpdate(MedicamentoBase): pass
class MedicamentoOut(MedicamentoBase):
    id_medicamento: int
    class Config: orm_mode = True

# -------------------------
# RECETA
# -------------------------
class RecetaBase(BaseModel):
    dosis: Optional[str] = None
    duracion: Optional[str] = None
    frecuencia: Optional[str] = None
    id_medicamento: Optional[int] = None
    id_tratamiento: Optional[int] = None

class RecetaCreate(RecetaBase): pass
class RecetaUpdate(RecetaBase): pass
class RecetaOut(RecetaBase):
    id_receta: int
    class Config: orm_mode = True

# -------------------------
# ENCUESTA
# -------------------------
class EncuestaBase(BaseModel):
    puntuacion: Optional[int] = None
    comentario: Optional[str] = None
    fecha: Optional[date] = None
    id_cita: Optional[int] = None

class EncuestaCreate(EncuestaBase): pass
class EncuestaUpdate(EncuestaBase): pass
class EncuestaOut(EncuestaBase):
    id_encuesta: int
    class Config: orm_mode = True

# -------------------------
# USUARIO
# -------------------------
class UsuarioBase(BaseModel):
    username: str
    contrasena: str
    rol: str
    id_paciente: Optional[int] = None
    id_medico: Optional[int] = None

class UsuarioCreate(UsuarioBase): pass
class UsuarioUpdate(UsuarioBase): pass
class UsuarioOut(UsuarioBase):
    id_usuario: int
    class Config: orm_mode = True
