# test_imports_corregido.py
import os
import sys

print("🔍 Probando imports con nombres REALES...")

# Agregar directorio actual al path
sys.path.append(os.path.dirname(__file__))

try:
    from database import Base, get_db
    print("✅ database importado correctamente")
except Exception as e:
    print(f"❌ Error importando database: {e}")

try:
    import models
    print("✅ models importado correctamente")
    # Verificar clases específicas
    clases = [cls for cls in dir(models) if not cls.startswith('_') and cls[0].isupper()]
    print(f"   Clases en models: {clases}")
except Exception as e:
    print(f"❌ Error importando models: {e}")

# Probar rutas que SÍ existen
rutas_a_probar = [
    "routes.usuarios",
    "routes.citas", 
    "routes.especialidades",
    "routes.medicamentos",
    "routes.recetas",
    "routes.tratamientos",
    "routes.diagnostico",
    "routes.encuestas"
]

for ruta in rutas_a_probar:
    try:
        modulo = __import__(ruta, fromlist=['router'])
        if hasattr(modulo, 'router'):
            print(f"✅ {ruta} importado correctamente")
        else:
            print(f"⚠ {ruta} importado pero no tiene 'router'")
    except Exception as e:
        print(f"❌ Error importando {ruta}: {e}")