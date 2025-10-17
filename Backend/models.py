# models.py - COPIA Y PEGA ESTE CONTENIDO COMPLETO
from sqlalchemy import Column, Integer, String, Text, ForeignKey, Date, DateTime, Time, Enum
from sqlalchemy.orm import relationship
from database import Base

class Rol(Base):
    __tablename__ = "rol"
    id_rol = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)

class Especialidad(Base):
    __tablename__ = "especialidad"
    id_especialidad = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)

class Usuario(Base):
    __tablename__ = "usuario"
    id_usuario = Column(Integer, primary_key=True, index=True)
    nombres = Column(String(100), nullable=False)
    apellidos = Column(String(100), nullable=False)
    sexo = Column(Enum("M", "F", "Otro"), nullable=False)
    fecha_nacimiento = Column(Date, nullable=False)
    tipo_identificacion = Column(String(20), nullable=False)
    numero_identificacion = Column(String(20), unique=True, nullable=False)
    correo = Column(String(100), unique=True, nullable=False)
    contrasena = Column(String(255), nullable=False)
    telefono = Column(String(20))
    id_rol = Column(Integer, ForeignKey("rol.id_rol"), nullable=False)


class Cita(Base):
    __tablename__ = "cita"
    id_cita = Column(Integer, primary_key=True, index=True)
    fecha = Column(DateTime, nullable=False)
    hora = Column(Time)
    motivo = Column(Text)
    estado = Column(Enum("programada", "cancelada", "completada"), default="programada")
    id_paciente = Column(Integer, ForeignKey("usuario.id_usuario"), nullable=False)
    id_medico = Column(Integer, ForeignKey("usuario.id_usuario"), nullable=False)

class Diagnostico(Base):
    __tablename__ = "diagnostico"
    id_diagnostico = Column(Integer, primary_key=True, index=True)
    descripcion = Column(Text, nullable=False)
    fecha = Column(Date, nullable=False)
    id_cita = Column(Integer, ForeignKey("cita.id_cita"))

class Encuesta(Base):
    __tablename__ = "encuesta"
    id_encuesta = Column(Integer, primary_key=True, index=True)
    puntuacion = Column(Integer)
    comentario = Column(Text)
    fecha = Column(Date)
    id_cita = Column(Integer, ForeignKey("cita.id_cita"))

class Medicamento(Base):
    __tablename__ = "medicamento"
    id_medicamento = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(Text)

class Tratamiento(Base):
    __tablename__ = "tratamiento"
    id_tratamiento = Column(Integer, primary_key=True, index=True)
    observacion = Column(Text)
    duracion = Column(Integer)
    tipo = Column(String(100))
    id_diagnostico = Column(Integer, ForeignKey("diagnostico.id_diagnostico"))

class Receta(Base):
    __tablename__ = "receta"
    id_receta = Column(Integer, primary_key=True, index=True)
    dosis = Column(String(100))
    duracion = Column(String(100))
    frecuencia = Column(String(100))
    id_medicamento = Column(Integer, ForeignKey("medicamento.id_medicamento"))
    id_tratamiento = Column(Integer, ForeignKey("tratamiento.id_tratamiento"))

class Recordatorio(Base):
    __tablename__ = "recordatorio"
    id_recordatorio = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(100), nullable=False)
    mensaje = Column(Text, nullable=False)
    fecha_envio = Column(DateTime, nullable=False)
    medio = Column(Enum("email", "sms", "whatsapp", "otro"), default="email")
    estado = Column(Enum("pendiente", "enviado", "fallido"), default="pendiente")
    id_usuario = Column(Integer, ForeignKey("usuario.id_usuario"), nullable=False)
    id_cita = Column(Integer, ForeignKey("cita.id_cita"), nullable=False)