import React, { useState } from "react";

const VehiculosCRUD = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    cilindraje: "",
    color: "",
    marca: "",
    modelo: "",
    siniestros: "",
    placa: "",
    descripcion: "",
    usuario: "",
    activo: 0,
    poliza: "silver",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newVehicle = { ...formData, id: Date.now() };
    setVehiculos([...vehiculos, newVehicle]);
    setFormData({
      id: "",
      cilindraje: "",
      color: "",
      marca: "",
      modelo: "",
      siniestros: "",
      placa: "",
      descripcion: "",
      usuario: "",
      activo: 0,
      poliza: "silver",
    });
  };

  const handleEdit = (vehiculo) => {
    setFormData(vehiculo);
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setVehiculos(
      vehiculos.map((vehiculo) =>
        vehiculo.id === formData.id ? formData : vehiculo
      )
    );
    setFormData({
      id: "",
      cilindraje: "",
      color: "",
      marca: "",
      modelo: "",
      siniestros: "",
      placa: "",
      descripcion: "",
      usuario: "",
      activo: 0,
      poliza: "silver",
    });
    setIsEditing(false);
  };

  const handleConfirmDelete = (id) => {
    setVehiculos(vehiculos.filter((vehiculo) => vehiculo.id !== id));
    setShowModal(false);
  };

  const handleDelete = (vehiculo) => {
    setVehicleToDelete(vehiculo);
    setShowModal(true);
  };

  return (
    <div className="vehiculos-crud">
      <h1>Gestión de Vehículos</h1>

      {/* Formulario */}
      <form onSubmit={isEditing ? handleUpdate : handleAdd}>
        <input
          type="text"
          name="id"
          placeholder="ID del vehículo"
          value={formData.id}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="cilindraje"
          placeholder="Cilindraje"
          value={formData.cilindraje}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          value={formData.marca}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={formData.modelo}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="siniestros"
          placeholder="Siniestros"
          value={formData.siniestros}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="placa"
          placeholder="Placa"
          value={formData.placa}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="usuario"
          placeholder="Usuario"
          value={formData.usuario}
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
        <label>
          Póliza:
          <select name="poliza" value={formData.poliza} onChange={handleChange}>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
          </select>
        </label>
        <button type="submit">{isEditing ? "Actualizar" : "Agregar"}</button>
      </form>

      {/* Tabla */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cilindraje</th>
            <th>Color</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Siniestros</th>
            <th>Placa</th>
            <th>Descripción</th>
            <th>Usuario</th>
            <th>Activo</th>
            <th>Póliza</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((vehiculo) => (
            <tr key={vehiculo.id}>
              <td>{vehiculo.id}</td>
              <td>{vehiculo.cilindraje}</td>
              <td>{vehiculo.color}</td>
              <td>{vehiculo.marca}</td>
              <td>{vehiculo.modelo}</td>
              <td>{vehiculo.siniestros}</td>
              <td>{vehiculo.placa}</td>
              <td>{vehiculo.descripcion}</td>
              <td>{vehiculo.usuario}</td>
              <td>{vehiculo.activo === 1 ? "Sí" : "No"}</td>
              <td>{vehiculo.poliza}</td>
              <td>
                <button onClick={() => handleEdit(vehiculo)}>Editar</button>
                <button onClick={() => handleDelete(vehiculo)}>Eliminar</button>
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
            <p>¿Quieres eliminar el vehículo con ID {vehicleToDelete?.id}?</p>
            <div className="modal-buttons">
              <button onClick={() => handleConfirmDelete(vehicleToDelete.id)}>
                Sí
              </button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

  export default VehiculosCRUD;