import { useEffect, useState } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/usuarios") // 👈 usa 127.0.0.1
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Error cargando usuarios:", err));
  }, []);

  return (
    <div>
      <h1>Usuarios desde FastAPI 🚀</h1>
      {usuarios.length === 0 ? (
        <p>No hay usuarios cargados</p>
      ) : (
        <ul>
          {usuarios.map((u) => (
            <li key={u.id}>{u.nombre}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
