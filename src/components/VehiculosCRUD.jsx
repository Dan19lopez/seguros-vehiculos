import { useState, useEffect } from "react";
import BuscarPorId from "./BuscarPorId";

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
    activo: false,
    poliza: "silver",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [vehiculoById, setVehiculoById] = useState([]);

  useEffect(() => {
      const fetchVehiculos = async () => {
        try{
        const response = await fetch("http://localhost:8080/api/vehiculo");
        const data = await response.json();
        setVehiculos(data);
        console.log(data);
      } catch (error){
        console.error("Error al obtener los vehiculos:",error)
        } 
    };

    fetchVehiculos();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/vehiculo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const newVehicle = await response.json();
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
          activo: false,
          poliza: "silver",
        });
      }
    } catch (error) {
      console.error("Error agregando vehiculo:", error);
    }
  };

  //const handleEdit = (vehiculo) => {
  //  setFormData(vehiculo);
  //  setIsEditing(true);
  //};

  const handleEdit = (vehiculo) => {
    setFormData(vehiculo);
    setIsEditing(true);
    setShowEditModal(true);  // Aquí abrimos el modal
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
      console.error("Error actualizando vehiculo:", error);
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
      console.error("Error eliminando vehiculo:", error);
    }
  };

  const handleDelete = (vehiculo) => {
    setVehicleToDelete(vehiculo);
    setShowModal(true);
  };

  const handleSearch = async (id) => {
    const response = await fetch(`http://localhost:8080/api/vehiculo/${id}`);
    const data = await response.json();
    if (response.ok) {
      setVehiculoById(data);
    }
  };

  return (
    <div className="vehiculos-crud bg-color1 p-8 font-primary min-h-screen flex flex-col lg:flex-row lg:justify-between lg:items-start">
      <div className="w-full lg:w-2/5 p-4">
        <h1 className="text-2xl font-bold text-color7 mb-4 text-center">Gestión de Vehículos</h1>
        <BuscarPorId
          funcionParaEditar={handleEdit}
          funcionParaEliminar={handleDelete}
          handleSearch={handleSearch}
          vehiculoById={vehiculoById}
        />
        <form onSubmit={isEditing ? handleUpdate : handleAdd} className="space-y-4">
          <input
            type="number"
            name="cilindraje"
            placeholder="Cilindraje"
            maxLength="4"
            minLength="3"
            required
            value={formData.cilindraje}
            onChange={handleChange}
            className="w-full mt-4 p-2 border border-color3 rounded"
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            maxLength="20"
            minLength="1"
            required
            value={formData.color}
            onChange={handleChange}
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="text"
            name="marca"
            placeholder="Marca"
            maxLength="20"
            minLength="1"
            required
            value={formData.marca}
            onChange={handleChange}
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            maxLength="4"
            minLength="4"
            required
            value={formData.modelo}
            onChange={handleChange}
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="number"
            name="siniestros"
            placeholder="Siniestros"
            required
            value={formData.siniestros}
            onChange={handleChange}
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="text"
            name="placa"
            placeholder="Placa"
            maxLength="10"
            minLength="1"
            required
            value={formData.placa}
            onChange={handleChange}
            className="w-full p-2 border border-color3 rounded"
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            maxLength="255"
            minLength="1"
            required
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full p-2 border border-color3 rounded"
          />
          <label className="flex items-center space-x-2">
            <span>Activo:</span>
            <input
              type="checkbox"
              name="activo"
              checked={formData.activo}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-color4"
            />
          </label>
          <label className="flex items-center space-x-2">
            <span>Póliza:</span>
            <select
              name="poliza"
              value={formData.poliza}
              onChange={handleChange}
              className="w-full p-2 border border-color3 rounded"
            >
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
            </select>
          </label>
          <button type="submit" className="bg-color6 text-color1 px-4 py-2 rounded w-full">
            {isEditing ? "Actualizar" : "Agregar"}
          </button>
        </form>
      </div>
      <div className="w-full lg:w-3/5 p-4 lg:mt-[1.8rem] overflow-x-auto">
        <table className="w-full bg-color1 table-auto text-sm">
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
                <td className="border-b border-color2 px-2 sm:px-4 py-2 text-center">{vehiculo.id}</td>
                <td className="border-b border-color2 px-2 sm:px-4 py-2 text-center">{vehiculo.cilindraje}</td>
                <td className="border-b border-color2 px-2 sm:px-4 py-2 text-center">{vehiculo.color}</td>
                <td className="border-b border-color2 px-2 sm:px-4 py-2 text-center">{vehiculo.marca}</td>
                <td className="border-b border-color2 px-2 sm:px-4 py-2 text-center">{vehiculo.modelo}</td>
                <td className="border-b border-color2 px-2 sm:px-4 py-2 text-center">{vehiculo.siniestros}</td>
                <td className="border-b border-color2 px-2 sm:px-4 py-2 text-center">{vehiculo.placa}</td>
                <td className="border-b border-color2 px-2 sm:px-4 py-2 text-center">{vehiculo.descripcion}</td>
                <td className="border-b border-color2 px-2 sm:px-4 py-2 text-center">{vehiculo.activo ? "Sí" : "No"}</td>
                <td className="border-b border-color2 px-2 sm:px-4 py-2 text-center">{vehiculo.poliza}</td>
                <td className="border-b border-color2 px-2 sm:px-4 py-2 text-center">
                  <button onClick={() => handleEdit(vehiculo)} className="bg-color5 text-color1 px-2 py-1 rounded mr-2">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(vehiculo)} className="bg-color6 text-color1 px-2 py-1 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar este vehículo?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancelar
              </button>
              <button onClick={() => handleConfirmDelete(vehicleToDelete.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
    <div className="bg-white p-8 rounded shadow-lg w-full max-w-md mt-40 mb-16  max-h-95 overflow-y-auto ">
      <h2 className="text-2xl font-bold mb-4">Editar Vehículo</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="number"
          name="cilindraje"
          placeholder="Cilindraje"
          maxLength="4"
          minLength="3"
          required
          value={formData.cilindraje}
          onChange={handleChange}
          className="w-full p-1 border border-color3 rounded"
        />
        <input
          type="text"
          name="color"
          placeholder="Color"
          maxLength="20"
          minLength="1"
          required
          value={formData.color}
          onChange={handleChange}
          className="w-full p-1 border border-color3 rounded"
        />
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          maxLength="20"
          minLength="1"
          required
          value={formData.marca}
          onChange={handleChange}
          className="w-full p-1 border border-color3 rounded"
        />
        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          maxLength="4"
          minLength="4"
          required
          value={formData.modelo}
          onChange={handleChange}
          className="w-full p-1 border border-color3 rounded"
        />
        <input
          type="number"
          name="siniestros"
          placeholder="Siniestros"
          required
          value={formData.siniestros}
          onChange={handleChange}
          className="w-full p-1 border border-color3 rounded"
        />
        <input
          type="text"
          name="placa"
          placeholder="Placa"
          maxLength="10"
          minLength="1"
          required
          value={formData.placa}
          onChange={handleChange}
          className="w-full p-1 border border-color3 rounded"
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          maxLength="255"
          minLength="1"
          required
          value={formData.descripcion}
          onChange={handleChange}
          className="w-full p-1 border border-color3 rounded"
        />
        <label className="flex items-center space-x-2">
          <span>Activo:</span>
          <input
            type="checkbox"
            name="activo"
            checked={formData.activo}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-color4"
          />
        </label>
        <label className="flex items-center space-x-2">
          <span>Póliza:</span>
          <select
            name="poliza"
            value={formData.poliza}
            onChange={handleChange}
            className="w-full p-2 border border-color3 rounded"
          >
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
          </select>
        </label>
        <div className="flex flex-row gap-1">
        <button type="submit" className="bg-color5 text-color1 px-4 py-2 rounded w-full mt-2">
          Guardar
        </button>
        <button onClick={() => setShowEditModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded w-full mt-2">
        Cerrar
      </button>
        </div>


      </form>

    </div>
  </div>
)}
    </div>

  );
};

export default VehiculosCRUD;
              