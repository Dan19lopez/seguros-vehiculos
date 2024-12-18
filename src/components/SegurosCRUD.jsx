
/*{import './SegurosCRUD.css';}*/

import { useState } from "react";
import { useEffect } from "react";

const SegurosCRUD = () => {

  //estado 
  const [usuarios, setUsuarios] = useState([])
  const [usuarioAgregado, setUsuarioAgregado] = useState({})
  const [usuarioEditado, setUsuarioEditado] = useState(false)


  // Hook para leer la base de datos (get)
  useEffect(()=>{

    const fetchUsers = async()=>{
      const response = await fetch("http://localhost:8080/api/usuario")
      const data = await response.json()
      setUsuarios(data  )
      console.log(data)
    }

    fetchUsers()
// se agrega la dependencia del use effect para que pueda sensar que cambia cuando se agrega un nuevo usuario desde la peticion del post.
  },[usuarioAgregado])

  const agregarUsuario = async(e)=>{

    //para prevenir el comportamiento por defecto de recargar la p'agina
    e.preventDefault()
    
    //Asignación de los datos que se caprutan desde el form a variables para su manipulación
    const nombre = e.target.nombre.value
    const correo = e.target.correo.value
    const telefono = e.target.telefono.value
    const cedula = e.target.cedula.value
    const contrasena = e.target.contrasena.value
    const fecha_nacimiento = e.target.fecha_nacimiento.value
    const activo = true

    console.log(fecha_nacimiento)
//////////POST
    const response = await fetch("http://localhost:8080/api/usuario", {
      //estructura basica del metodo post
      method: "POST",
     
        headers: {
          'Content-Type': 'application/json', 
        },
        //conversión del objeto json a string
        body: JSON.stringify({nombre, correo, telefono, cedula, contrasena, fecha_nacimiento, activo})
      
    })
    const responseData = await response.json()
    setUsuarioAgregado(responseData)


//////////GET by id
//const bucarUsuarioPorId = async(id)=>{
 // fetch("localhost:8080/api/usuario/{id}")
  
 // }
////////////PUT
async function editarUsuario(id){
  setUsuarioEditado(true)
  const usuarioAEditar=usuarios.find(usuario => usuario.id === id);
  setUsuarioEditado(usuarioAEditar);
    //busco usuario con id que coincidan con la propiedad id 
  const
  
  //se le asigna a setUsiarios el valor del primer usuario encontrado en el arreglo
  setUsuarioEditado(usuarioAEditar[0])



const response = await fetch(`localhost:8080/api/usuario/${id}`, {
  method: "PUT",
  headers: {
                'Content-Type': 'application/json',
            },
  body: JSON.stringify(usuarioAEditar[0])
})
const responseData = await response.json();
}

/////////DELETE
//const eliminarUsuario = async(id)=>{
 // fetch("localhost:8080/api/usuario/{id}")

//}
/////////PATCH
//const inactivarUsuario = async(id)=>{
 // fetch("localhost:8080/api/usuario/desactivar/{id}")


//}

  }

  return (
    <div className="usuarios-crud bg-color1 p-8 font-primary min-h-screen flex flex-col lg:flex-row lg:justify-center lg:items-start">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-color7 mb-4 text-center">Gestión de Usuarios</h1>
  
        {/* Formulario */}
        <form onSubmit={agregarUsuario} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={usuarioEditado ? usuarioEditado.nombre : ""}
          
            maxLength="50"
            minLength="1"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            
          
            maxLength="50"
            minLength="1"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            
            maxLength="20"
            minLength="1"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="text"
            name="cedula"
            placeholder="Cédula"
            
            maxLength="50"
            minLength="1"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            
            maxLength="20"
            minLength="1"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="date"
            name="fecha_nacimiento"
            
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
          <button type="submit" className="bg-color6 text-color1 px-4 py-2 rounded w-full">
           Enviar
          </button>
        </form>
      </div>
  
      {/* Tabla */}
      <div className="w-full lg:w-auto mt-4 lg:mt-[1.6rem] lg:ml-8 overflow-x-auto">
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
          {
            
            usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="border-b border-color2 px-4 py-2">{usuario.nombre}</td>
                  <td className="border-b border-color2 px-4 py-2">{usuario.correo}</td>
                  <td className="border-b border-color2 px-4 py-2">{usuario.telefono}</td>
                  <td className="border-b border-color2 px-4 py-2">{usuario.cedula}</td>
                  <td className="border-b border-color2 px-4 py-2">{usuario.contrasena}</td>
                  <td className="border-b border-color2 px-4 py-2">{usuario.fecha_nacimiento}</td>
                  <td className="border-b border-color2 px-4 py-2">{usuario.activo ? "Sí" : "No"}</td>
                  <td className="border-b border-color2 px-4 py-2">
                    <button onClick={() => editarUsuario()} className="bg-color5 text-color1 px-2 py-1 rounded mr-2">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(usuario)} className="bg-color6 text-color1 px-2 py-1 rounded">
                      Eliminar
                    </button>
                  </td>
                </tr>))
                }
          </tbody>
        </table>

        
      </div>
  
      {/* Modal de Confirmación */}
      
    </div>
  );
    
  
};

export default SegurosCRUD;