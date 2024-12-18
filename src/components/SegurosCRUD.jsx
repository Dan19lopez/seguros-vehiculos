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
    <div className="usuarios-crud bg-color1 p-8 font-primary flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-color7 mb-4 text-center">Gestión de Usuarios</h1>
  
        {/* Formulario */}
        <form onSubmit={isEditing ? handleUpdate : handleAdd} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            maxLength="50"
            minLength="1"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={formData.correo}
            onChange={handleChange}
            maxLength="50"
            minLength="15"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            maxLength="20"
            minLength="7"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="text"
            name="cedula"
            placeholder="Cédula"
            value={formData.cedula}
            onChange={handleChange}
            maxLength="50"
            minLength="5"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            value={formData.contrasena}
            onChange={handleChange}
            maxLength="20"
            minLength="1"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <label className="flex items-center space-x-2">
            <span>Activo:</span>
            <input
              type="checkbox"
              name="activo"
              className="form-checkbox h-5 w-5 text-color4"
            />
          </label>
          <button type="submit" className="bg-color4 text-color1 px-4 py-2 rounded w-full">
            {isEditing ? "Actualizar" : "Agregar"}
          </button>
        </form>
      </div>
  
      {/* Tabla */}
      <div className="mt-[-339px] ml-8 w-100">
        <table className="min-w-full bg-color1">
          <thead>
            <tr>
              <th className="border-b-2 border-color3 px-4 py-2 text-left">Nombre</th>
              <th className="border-b-2 border-color3 px-4 py-2 text-left">Correo</th>
              <th className="border-b-2 border-color3 px-4 py-2 text-left">Teléfono</th>
              <th className="border-b-2 border-color3 px-4 py-2 text-left">Cédula</th>
              <th className="border-b-2 border-color3 px-4 py-2 text-left">Contraseña</th>
              <th className="border-b-2 border-color3 px-4 py-2 text-left">Fecha de Nacimiento</th>
              <th className="border-b-2 border-color3 px-4 py-2 text-left">Activo</th>
              <th className="border-b-2 border-color3 px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td className="border-b border-color2 px-4 py-2">{usuario.nombre}</td>
                <td className="border-b border-color2 px-4 py-2">{usuario.correo}</td>
                <td className="border-b border-color2 px-4 py-2">{usuario.telefono}</td>
                <td className="border-b border-color2 px-4 py-2">{usuario.cedula}</td>
                <td className="border-b border-color2 px-4 py-2">{usuario.contrasena}</td>
                <td className="border-b border-color2 px-4 py-2">{usuario.fecha_nacimiento}</td>
                <td className="border-b border-color2 px-4 py-2">{usuario.activo ? "Sí" : "No"}</td>
                <td className="border-b border-color2 px-4 py-2">
                  <button onClick={() => handleEdit(usuario)} className="bg-color5 text-color1 px-2 py-1 rounded mr-2">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(usuario)} className="bg-color6 text-color1 px-2 py-1 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {/* Modal de Confirmación */}
      {showModal && (
        <div className="modal-backdrop fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="modal bg-color1 p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold text-color7">¿Estás seguro?</h2>
            <p className="my-4">¿Quieres eliminar a {userToDelete?.nombre}?</p>
            <div className="modal-buttons flex justify-end space-x-4">
              <button onClick={() => handleConfirmDelete(userToDelete.id)} className="bg-color5 text-color1 px-4 py-2 rounded">
                Sí
              </button>
              <button onClick={() => setShowModal(false)} className="bg-color6 text-color1 px-4 py-2 rounded">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );  
  
};

export default SegurosCRUD;