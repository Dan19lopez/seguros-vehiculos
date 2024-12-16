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
        <form onSubmit={handleSearch}> 
            <input
            
            type="text"
            name="id"
            placeholder="ID del vehículo"
            
            />
            <button type='submit'>Buscar</button>
       
        </form>

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
            <th>Activo</th>
            <th>Póliza</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          
            <tr key={vehiculoById.id}>
              <td>{vehiculoById.id}</td>
              <td>{vehiculoById.cilindraje}</td>
              <td>{vehiculoById.color}</td>
              <td>{vehiculoById.marca}</td>
              <td>{vehiculoById.modelo}</td>
              <td>{vehiculoById.siniestros}</td>
              <td>{vehiculoById.placa}</td>
              <td>{vehiculoById.descripcion}</td>
              <td>{vehiculoById.activo === true ? "Sí" : "No"}</td>
              <td>{vehiculoById.poliza}</td>
              <td>
                <button onClick={() => funcionParaEditar(vehiculo.id)}>Editar</button>
                <button onClick={() => funcionParaEliminar(vehiculo.id)}>Eliminar</button>
              </td>
            </tr>
          
        </tbody>
      </table>
    </>
  )
}
