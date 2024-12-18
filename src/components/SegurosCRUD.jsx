import React, { useState, useEffect } from "react";
/*{import './SegurosCRUD.css';}*/

const SegurosCRUD = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    correo: "",
    telefono: "",
    cedula: "",
    contrasena: "",
    fecha_nacimiento: "",
    activo: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userRead, setUserRead] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
        const response = await fetch("http://localhost:8080/api/usuario");
        const data = await response.json();
        setUserRead(data);
      
        
    };

    fetchUsuarios();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? true : false) : value,
    });
  };

  const generateNewId = () => {
    if (usuarios.length === 0) return 1;
    return Math.max(...usuarios.map((usuario) => usuario.id)) + 1;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const newUser = { ...formData, id: generateNewId() };
    const id = e.target.id.value
    const nombre = e.target.nombre.value
    const correo = e.target.correo.value
    const telefono = e.target.telefono.value
    const cedula = e.target.cedula.value
    const contrasena = e.target.contrasena.value
    const fecha = e.target.fecha_nacimiento.value 
    const activo = e.target.activo.checked
    const dataObject = {id,nombre,correo,telefono,cedula,contrasena,fecha,activo}

    setUserData(dataObject)
    try {
      const response = await fetch("http://localhost:8080/api/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObject),
      });

      if (response.ok) {
        const newUser = await response.json();
        setUsuarios([...usuarios, newUser]);
        setFormData({
          id: "",
          nombre: "",
          correo: "",
          telefono: "",
          cedula: "",
          contrasena: "",
          fecha_nacimiento: "",
          activo: true,
        });
      } else {
        console.error("Error al crear el usuario:", response.status);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleEdit = (usuario) => {
    setFormData(usuario);
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch (`http://localhost:8080/api/usuario/${formData.id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if(response.ok){
    setUsuarios(
      usuarios.map((usuario) => 
      usuario.id === formData.id ? formData : usuario
    )
    );
    setFormData({
      id: "",
      nombre: "",
      correo: "",
      telefono: "",
      cedula: "",
      contrasena: "",
      fecha_nacimiento: "",
      activo: false,
    });
    setIsEditing(false);
    }
  } catch (erro) {
    console.error("Error cambiando usuario:", error);
  }
};

  
  const handleConfirmDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/usuario/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    setShowModal(false);
    }
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  const handleDelete = (usuario) => {
    setUserToDelete(usuario);
    setShowModal(true);
  };

  const [usuarioById,setUsuarioById]=useState([]);
  const handleSearch = async(id) => {

    const respuesta = await fetch (`http://localhost:8080/api/usuario/${id}`)
    const respuestaConvertida=respuesta.json();
    if (respuesta.ok) {
      setUsuarioById(respuestaConvertida);
    }
  }

  return (
    <div className="usuarios-crud">
      <h1>Gestión de Usuarios</h1>

      {/* Formulario */}
      <form onSubmit={isEditing ? handleUpdate : handleAdd}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          maxLength= "50"
          minLength= "1"
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
          maxLength= "50"
          minLength= "15"
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          maxLength= "20"
          minLength= "7"
          required
        />
        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          value={formData.cedula}
          onChange={handleChange}
          maxLength= "50"
          minLength= "5"
          required
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={formData.contrasena}
          onChange={handleChange}
          maxLength= "20"
          minLength= "1"
          required
        />
        <input
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
          required
        />
        <label>
          Activo:
          <input
            type="checkbox"
            name="activo"
            
          />
        </label>
        <button type="submit">{isEditing ? "Actualizar" : "Agregar"}</button>
      </form>

      {/* Tabla */}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Cédula</th>
            <th>Contraseña</th>
            <th>Fecha de Nacimiento</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.cedula}</td>
              <td>{usuario.contrasena}</td>
              <td>{usuario.fecha_nacimiento}</td>
              <td>{usuario.activo === true ? "Sí" : "No"}</td>
              <td>
                <button onClick={() => handleEdit(usuario)}>Editar</button>
                <button onClick={() => handleDelete(usuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Confirmación */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>¿Estás seguro?</h2>
            <p>¿Quieres eliminar a {userToDelete?.nombre}?</p>
            <div className="modal-buttons">
              <button onClick={() => handleConfirmDelete(userToDelete.id)}>Sí</button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SegurosCRUD;