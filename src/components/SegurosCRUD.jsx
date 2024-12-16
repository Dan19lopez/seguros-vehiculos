import React, { useState, useEffect } from "react";
/*{import './SegurosCRUD.css';}*/

const SegurosCRUD = () => {
  const [usuarios, setUsuarios] = useState([]);
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

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:7715/usuarios");
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al traer los usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const generateNewId = () => {
    if (usuarios.length === 0) return 1;
    return Math.max(...usuarios.map((usuario) => usuario.id)) + 1;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const newUser = { ...formData, id: generateNewId() };

    try {
      const response = await fetch("http://localhost:7715/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        const createdUser = await response.json();
        setUsuarios([...usuarios, createdUser]);
        setFormData({
          id: "",
          nombre: "",
          correo: "",
          telefono: "",
          cedula: "",
          contrasena: "",
          fecha_nacimiento: "",
          activo: 0,
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

  const handleUpdate = (e) => {
    e.preventDefault();
    setUsuarios(
      usuarios.map((usuario) => (usuario.id === formData.id ? formData : usuario))
    );
    setFormData({
      id: "",
      nombre: "",
      correo: "",
      telefono: "",
      cedula: "",
      contrasena: "",
      fecha_nacimiento: "",
      activo: 0,
    });
    setIsEditing(false);
  };

  const handleConfirmDelete = (id) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    setShowModal(false);
  };

  const handleDelete = (usuario) => {
    setUserToDelete(usuario);
    setShowModal(true);
  };

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
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          value={formData.cedula}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={formData.contrasena}
          onChange={handleChange}
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
            checked={formData.activo === 1}
            onChange={handleChange}
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
              <td>{usuario.activo === 1 ? "Sí" : "No"}</td>
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