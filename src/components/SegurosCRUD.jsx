import React, { useState } from "react";



const SegurosCRUD = () => {
    const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newUser = { ...formData, id: Date.now() };
    setUsuarios([...usuarios, newUser]);
    setFormData({
      id: null,
      nombre: "",
      correo: "",
      telefono: "",
      cedula: "",
      contrasena: "",
      fecha_nacimiento: "",
      activo: 0,
    });
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
      id: null,
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