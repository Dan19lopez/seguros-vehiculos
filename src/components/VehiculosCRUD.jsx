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
    <div className="vehiculos-crud bg-color1 p-8 font-primary flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-color7 mb-4 text-center">Gestión de Vehículos</h1>
        <BuscarPorId funcionParaEditar={handleEdit} funcionParaEliminar={handleDelete} handleSearch={handleSearch} vehiculoById={vehiculoById} />
  
        {/* Formulario */}
        <form onSubmit={isEditing ? handleUpdate : handleAdd} className="space-y-4">
          <input
            type="number"
            name="cilindraje"
            placeholder="Cilindraje"
            maxLength="4"
            minLength="3"
            required
            className="w-full mt-4 p-2 border border-color3 rounded"
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            maxLength="20"
            minLength="1"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="text"
            name="marca"
            placeholder="Marca"
            maxLength="20"
            minLength="1"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            maxLength="4"
            minLength="4"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="number"
            name="siniestros"
            placeholder="Siniestros"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="text"
            name="placa"
            placeholder="Placa"
            maxLength="10"
            minLength="1"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            maxLength="255"
            minLength="1"
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
          <label className="flex items-center space-x-2">
            <span>Póliza:</span>
            <select name="poliza" value={formData.poliza} onChange={handleChange} className="w-full p-2 border border-color3 rounded">
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
            </select>
          </label>
          <button type="submit" className="bg-color4 text-color1 px-4 py-2 rounded w-full">
            {isEditing ? "Actualizar" : "Agregar"}
          </button>
        </form>
      </div>
  
      {/* Tabla */}
      <div className="mt-[-770px] ml-8 w-full overflow-x-auto">
        <table className="w-full bg-color1 table-auto">
          <thead>
            <tr>
              <th className="border-b-2 border-color3 px-4 py-2 text-center">ID</th>
              <th className="border-b-2 border-color3 px-4 py-2 text-center">Cilindraje</th>
              <th className="border-b-2 border-color3 px-4 py-2 text-center">Color</th>
              <th className="border-b-2 border-color3 px-4 py-2 text-center">Marca</th>
              <th className="border-b-2 border-color3 px-4 py-2 text-center">Modelo</th>
              <th className="border-b-2 border-color3 px-4 py-2 text-center">Siniestros</th>
              <th className="border-b-2 border-color3 px-4 py-2 text-center">Placa</th>
              <th className="border-b-2 border-color3 px-4 py-2 text-center">Descripción</th>
              <th className="border-b-2 border-color3 px-4 py-2 text-center">Activo</th>
              <th className="border-b-2 border-color3 px-4 py-2 text-center">Póliza</th>
              <th className="border-b-2 border-color3 px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((vehiculo) => (
              <tr key={vehiculo.id}>
                <td className="border-b border-color2 px-4 py-2 text-center">{vehiculo.id}</td>
                <td className="border-b border-color2 px-4 py-2 text-center">{vehiculo.cilindraje}</td>
                <td className="border-b border-color2 px-4 py-2 text-center">{vehiculo.color}</td>
                <td className="border-b border-color2 px-4 py-2 text-center">{vehiculo.marca}</td>
                <td className="border-b border-color2 px-4 py-2 text-center">{vehiculo.modelo}</td>
                <td className="border-b border-color2 px-4 py-2 text-center">{vehiculo.siniestros}</td>
                <td className="border-b border-color2 px-4 py-2 text-center">{vehiculo.placa}</td>
                <td className="border-b border-color2 px-4 py-2 text-center">{vehiculo.descripcion}</td>
                <td className="border-b border-color2 px-4 py-2 text-center">{vehiculo.activo ? "Sí" : "No"}</td>
                <td className="border-b border-color2 px-4 py-2 text-center">{vehiculo.poliza}</td>
                <td className="border-b border-color2 px-4 py-2 text-center">
                  <button onClick={() => handleEdit(vehiculo.id)} className="bg-color5 text-color1 px-2 py-1 rounded mr-2">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(vehiculo.id)} className="bg-color6 text-color1 px-2 py-1 rounded">
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
            <p className="my-4">¿Quieres eliminar el vehículo con ID {vehicleToDelete?.id}?</p>
            <div className="modal-buttons flex justify-end space-x-4">
              <button onClick={() => handleConfirmDelete(vehicleToDelete.id)} className="bg-color5 text-color1 px-4 py-2 rounded">
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

export default VehiculosCRUD;
