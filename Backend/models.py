from sqlalchemy import Column, Integer, String, Text, Date, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Paciente(Base):
    __tablename__ = "paciente"

    id_paciente = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)
    apellido = Column(String(50), nullable=False)
    genero = Column(Enum("M", "F", "Otro"))
    direccion = Column(String(80))
    telefono = Column(String(15))
    edad = Column(Integer)
    historia_clinica = Column(String(30))


class Medico(Base):
    __tablename__ = "medico"

    id_medico = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)
    apellido = Column(String(50), nullable=False)
    telefono = Column(String(15))
    id_especialidad = Column(Integer, ForeignKey("especialidad.id_especialidad"))

    especialidad = relationship("Especialidad", back_populates="medicos")


class Especialidad(Base):
    __tablename__ = "especialidad"

    id_especialidad = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)

    medicos = relationship("Medico", back_populates="especialidad")


class Cita(Base):
    __tablename__ = "cita"

    id_cita = Column(Integer, primary_key=True, index=True)
    fecha = Column(DateTime, nullable=False)
    motivo = Column(Text)
    estado = Column(Enum("programada", "cancelada", "completada"), default="programada")
    id_paciente = Column(Integer, ForeignKey("paciente.id_paciente"))
    id_medico = Column(Integer, ForeignKey("medico.id_medico"))


class Diagnostico(Base):
    __tablename__ = "diagnostico"

    id_diagnostico = Column(Integer, primary_key=True, index=True)
    descripcion = Column(Text, nullable=False)
    fecha = Column(Date, nullable=False)
    id_cita = Column(Integer, ForeignKey("cita.id_cita"))


class Tratamiento(Base):
    __tablename__ = "tratamiento"

    id_tratamiento = Column(Integer, primary_key=True, index=True)
    observacion = Column(Text)
    duracion = Column(Integer)
    tipo = Column(String(100))
    id_diagnostico = Column(Integer, ForeignKey("diagnostico.id_diagnostico"))


class Medicamento(Base):
    __tablename__ = "medicamento"

    id_medicamento = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(Text)


class Receta(Base):
    __tablename__ = "receta"

    id_receta = Column(Integer, primary_key=True, index=True)
    dosis = Column(String(100))
    duracion = Column(String(100))
    frecuencia = Column(String(100))
    id_medicamento = Column(Integer, ForeignKey("medicamento.id_medicamento"))
    id_tratamiento = Column(Integer, ForeignKey("tratamiento.id_tratamiento"))


class Encuesta(Base):
    __tablename__ = "encuesta"

    id_encuesta = Column(Integer, primary_key=True, index=True)
    puntuacion = Column(Integer)
    comentario = Column(Text)
    fecha = Column(Date)
    id_cita = Column(Integer, ForeignKey("cita.id_cita"))


class Usuario(Base):
    __tablename__ = "usuario"

    id_usuario = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), nullable=False, unique=True)
    contrasena = Column(String(255), nullable=False)
    rol = Column(Enum("admin", "medico", "paciente"), nullable=False)
    id_paciente = Column(Integer, ForeignKey("paciente.id_paciente"))
    id_medico = Column(Integer, ForeignKey("medico.id_medico"))
