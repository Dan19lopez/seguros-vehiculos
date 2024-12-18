import React, { useState } from 'react'

export default function BuscarPorId({funcionParaEditar, funcionParaEliminar}) {
    const [vehiculoById,setVehiculoById]=useState([]);
    const [inputValue, setInputValue] = useState("")
      const handleSearch =async(e) => {
        e.preventDefault()
        const id = e.target.id.value;
       const respuesta= await fetch (`http://localhost:8080/api/vehiculo/${id}`);
       const respuestaConvertida= await respuesta.json();
       
        setVehiculoById(respuestaConvertida);
        console.log(respuestaConvertida);
       
      }




  return (
    <>
      <form onSubmit={handleSearch} className="space-y-4 bg-color1 p-4 rounded shadow-lg">
        <input
          type="text"
          name="id"
          placeholder="ID del vehículo"
          className="w-full p-2 border border-color3 rounded"
        />
        <button type="submit" className="bg-color4 text-color1 px-4 py-2 rounded w-full">
          Buscar
        </button>
      </form>

      <div className="mt-[-3px] w-full overflow-x-auto">
        <table className="w-full  bg-color1 table-auto">
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
            <tr key={vehiculoById.id}>
              <td className="border-b border-color2 px-4 py-2 text-center">{vehiculoById.id}</td>
              <td className="border-b border-color2 px-4 py-2 text-center">{vehiculoById.cilindraje}</td>
              <td className="border-b border-color2 px-4 py-2 text-center">{vehiculoById.color}</td>
              <td className="border-b border-color2 px-4 py-2 text-center">{vehiculoById.marca}</td>
              <td className="border-b border-color2 px-4 py-2 text-center">{vehiculoById.modelo}</td>
              <td className="border-b border-color2 px-4 py-2 text-center">{vehiculoById.siniestros}</td>
              <td className="border-b border-color2 px-4 py-2 text-center">{vehiculoById.placa}</td>
              <td className="border-b border-color2 px-4 py-2 text-center">{vehiculoById.descripcion}</td>
              <td className="border-b border-color2 px-4 py-2 text-center">{vehiculoById.activo ? "Sí" : "No"}</td>
              <td className="border-b border-color2 px-4 py-2 text-center">{vehiculoById.poliza}</td>
              <td className="border-b border-color2 px-4 py-2 text-center">
                <button onClick={() => funcionParaEditar(vehiculoById.id)} className="bg-color5 text-color1 px-2 py-1 rounded mr-2">
                  Editar
                </button>
                <button onClick={() => funcionParaEliminar(vehiculoById.id)} className="bg-color6 text-color1 px-2 py-1 rounded">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};


