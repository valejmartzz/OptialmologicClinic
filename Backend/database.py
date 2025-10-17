# database.py
from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from database import get_db as get_db_connection
import mysql.connector
from mysql.connector import Error

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root", 
            password="",
            database="proyectodb"
        )
        return connection
    except Error as e:
        print(f"❌ Error conectando a MySQL: {e}")
        return None

# Alias para compatibilidad
get_db = get_db_connection


# configuración de MySQL
DATABASE_URL = "mysql+mysqlconnector://root:@localhost/proyectodb"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
metadata = MetaData()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()