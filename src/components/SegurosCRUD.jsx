import React, { useState } from "react";



const SegurosCRUD = () => {
    // Estado inicial con datos ficticios
    const [usuarios, setUsuarios] = useState([
      
    ]);
  
    const [formData, setFormData] = useState({
      id: null,
      nombre: "",
      documento: "",
      email: "",
      direccion: "",
      fechaNacimiento: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleAdd = (e) => {
      e.preventDefault();
      const newUser = { ...formData, id: Date.now() };
      setUsuarios([...usuarios, newUser]);
      setFormData({ id: null, nombre: "", documento: "", email: "", direccion: "", fechaNacimiento: "" });
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
      setFormData({ id: null, nombre: "", documento: "", email: "", direccion: "", fechaNacimiento: "" });
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
            type="text"
            name="documento"
            placeholder="Documento"
            value={formData.documento}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
          <button type="submit">{isEditing ? "Actualizar" : "Agregar"}</button>
        </form>
  
        {/* Tabla */}
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Fecha de Nacimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.documento}</td>
                <td>{usuario.email}</td>
                <td>{usuario.direccion}</td>
                <td>{usuario.fechaNacimiento}</td>
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