import React, { useState, useEffect } from "react";
import BuscarPorId from "./BuscarPorId";

const VehiculosCRUD = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculeData, setVehiculeData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    cilindraje: "",
    color: "",
    marca: "",
    modelo: "",
    siniestros: "",
    placa: "",
    descripcion: "",
    /* usuario: "", */
    activo: false,
    poliza: "silver",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [vehicleRead, setVehicleRead] = useState([]);

  useEffect(() => {
    const fetchVehiculos = async ()=>{
      const response = await fetch("http://localhost:8080/api/vehiculo")
      const data = await response.json()
      setVehicleRead(data)
      // console.log(data, vehicleRead)
    }

    fetchVehiculos()
  }, []);

  


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? true : false) : value,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    // console.log(e.target.cilindraje.value)
    const cilindraje = e.target.cilindraje.value
    const color = e.target.color.value
    const marca = e.target.marca.value
    const modelo = e.target.modelo.value
    const siniestros = e.target.siniestros.value
    const placa = e.target.placa.value
    const descripcion = e.target.descripcion.value
    const poliza = e.target.poliza.value
    const activo = e.target.activo.checked
    const dataObject = {cilindraje,color,marca,modelo,siniestros,placa,descripcion,poliza,activo}
    // console.log(cilindraje,color,marca,modelo,siniestros,placa,descripcion,poliza,activo)
    setVehiculeData(dataObject)
    try {
      const response = await fetch("http://localhost:8080/api/vehiculo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObject),
      });
      if (response.ok) {
        const newVehicle = await response.json();
        setVehiculos([...vehiculos, newVehicle]);
        setFormData({
          cilindraje: "8000",
          color: "rojo",
          marca: "toyota",
          modelo: "nose",
          siniestros: "9",
          placa: "fya4343",
          descripcion: "sino",
          /* usuario: "liliana", */
          activo: true,
          poliza: "silver",
        });
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  const handleEdit = (vehiculo) => {
    setFormData(vehiculo);
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/vehiculo/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
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
          activo: false,
          poliza: "silver",
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
  };

  const handleConfirmDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/vehiculo/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setVehiculos(vehiculos.filter((vehiculo) => vehiculo.id !== id));
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };



  const handleDelete = (vehiculo) => {
    setVehicleToDelete(vehiculo);
    setShowModal(true);
  };


  const [vehiculoById,setVehiculoById]=useState([]);
  const handleSearch =async(id) => {

   const respuesta= await fetch (`http://localhost:8080/api/vehiculo/${id}`);
   const respuestaConvertida=respuesta.json();
   if (respuesta.ok) {
    setVehiculoById(respuestaConvertida);

   }
  }

  return (

    <div className="vehiculos-crud">
      
      <h1>Gestión de Vehículos</h1>
      <BuscarPorId funcionParaEditar = {handleEdit} funcionParaEliminar={handleDelete} />

      {/* Formulario */}
      <form onSubmit={handleAdd}>
        {/* <input
          type="text"
          name="id"
          placeholder="ID del vehículo"
          
        />
        <button onClick={handleSearch}>Buscar</button> */}
     
        <input
          type="number"
          name="cilindraje"
          placeholder="Cilindraje"
          required
        />
        <input
          type="text"
          name="color"
          placeholder="Color"
          required
        />
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          required
        />
        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          required
        />
        <input
          type="number"
          name="siniestros"
          placeholder="Siniestros"
          required
        />
        <input
          type="text"
          name="placa"
          placeholder="Placa"
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          required
        />
        {/* <input
          type="text"
          name="usuario"
          placeholder="Usuario"
          required
        /> */}
        <label>
          Activo:
          <input
            type="checkbox"
            name="activo"
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
            {/* <th>Usuario</th> */}
            <th>Activo</th>
            <th>Póliza</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehicleRead.map((vehiculo) => (
            <tr key={vehiculo.id}>
              <td>{vehiculo.id}</td>
              <td>{vehiculo.cilindraje}</td>
              <td>{vehiculo.color}</td>
              <td>{vehiculo.marca}</td>
              <td>{vehiculo.modelo}</td>
              <td>{vehiculo.siniestros}</td>
              <td>{vehiculo.placa}</td>
              <td>{vehiculo.descripcion}</td>
              {/* <td>{vehiculo.usuario}</td> */}
              <td>{vehiculo.activo === true ? "Sí" : "No"}</td>
              <td>{vehiculo.poliza}</td>
              <td>
                <button onClick={() => handleEdit(vehiculo.id)}>Editar</button>
                <button onClick={() => handleDelete(vehiculo.id)}>Eliminar</button>
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
