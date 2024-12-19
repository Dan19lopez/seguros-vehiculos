import { useState, useEffect } from "react";

const SegurosCRUD = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioAgregado, setUsuarioAgregado] = useState({});
  const [usuarioEditado, setUsuarioEditado] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    cedula: "",
    contrasena: "",
    fecha_nacimiento: "",
    activo: true,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/usuario");
        const data = await response.json();
        setUsuarios(data);
        console.log(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsers();
  }, [usuarioAgregado]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const agregarUsuario = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/usuario", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      setUsuarioAgregado(responseData);
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  //const editarUsuario = async (id) => {
    //setUsuarioEditado(true);
    //const usuarioAEditar = usuarios.find((usuario) => usuario.id === id);
   // if (!usuarioAEditar) return;
    //setUsuarioEditado(usuarioAEditar);

   // try {
   //   const response = await fetch(`http://localhost:8080/api/usuario/${id}`, {
   //     method: "PUT",
   //     headers: {
   //       'Content-Type': 'application/json',
   //     },
   //     body: JSON.stringify(usuarioAEditar),
   //   });
   //   const responseData = await response.json();
   //   console.log(responseData);
   // } catch (error) {
   //   console.error("Error al editar usuario:", error);
   // }
 // };
 const editarUsuario = async (e) => {
  e.preventDefault();
  if (!usuarioEditado) return;

  try {
    const response = await fetch(`http://localhost:8080/api/usuario/${usuarioEditado.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const responseData = await response.json();
    setUsuarios(usuarios.map((u) => (u.id === usuarioEditado.id ? responseData : u)));
    closeModal();
  } catch (error) {
    console.error("Error al editar usuario:", error);
  }
};

  const handleDelete = async (usuario) => {
    try {
      await fetch(`http://localhost:8080/api/usuario/${usuario.id}`, {
        method: "DELETE",
      });
      setUsuarios(usuarios.filter((u) => u.id !== usuario.id));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const openModal = (usuario) => {
    setUsuarioEditado(usuario);
    setFormData(usuario);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setUsuarioEditado(null);
  };

  return (
    <div className="usuarios-crud bg-color1 p-8 font-primary min-h-screen flex flex-col lg:flex-row lg:justify-center lg:items-start">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-color7 mb-4 text-center">Gestión de Usuarios</h1>

        <form onSubmit={agregarUsuario} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            maxLength="50"
            minLength="1"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={formData.correo}
            onChange={handleChange}
            maxLength="50"
            minLength="1"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            maxLength="20"
            minLength="1"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="text"
            name="cedula"
            placeholder="Cédula"
            value={formData.cedula}
            onChange={handleChange}
            maxLength="50"
            minLength="1"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            value={formData.contrasena}
            onChange={handleChange}
            maxLength="20"
            minLength="1"
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <input
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            required
            className="w-full p-2 border border-color3 rounded"
          />
          <label className="flex items-center space-x-2">
            <span>Activo:</span>
            <input
              type="checkbox"
              name="activo"
              checked={formData.activo}
              onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
              className="form-checkbox h-5 w-5 text-color4"
            />
          </label>
          <button type="submit" className="bg-color6 text-color1 px-4 py-2 rounded w-full">
            Enviar
          </button>
        </form>
      </div>

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
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td className="border-b border-color2 px-4 py-2">{usuario.nombre}</td>
                <td className="border-b border-color2 px-4 py-2">{usuario.correo}</td>
                <td className="border-b border-color2 px-4 py-2">{usuario.telefono}</td>
                <td className="border-b border-color2 px-4 py-2">{usuario.cedula}</td>
                <td className="border-b border-color2 px-4 py-2">{usuario.contrasena}</td>
                <td className="border-b border-color2 px-4 py-2">{usuario.fecha_nacimiento}</td>
                <td className="border-b border-color2 px-4 py-2">{usuario.activo ? "Sí" : "No"}</td>
                <td className="border-b border-color2 px-4 py-2">
                  <button onClick={() => openModal(usuario)} className="bg-color5 text-color1 px-2 py-1 rounded mr-2">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(usuario)} className="bg-color6 text-color1 px-2 py-1 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>
          <form onSubmit={editarUsuario} className="space-y-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              maxLength="50"
              minLength="1"
              required
              className="w-full p-2 border border-color3 rounded"
            />
            <input
              type="email"
              name="correo"
              placeholder="Correo"
              value={formData.correo}
              onChange={handleChange}
              maxLength="50"
              minLength="1"
              required
              className="w-full p-2 border border-color3 rounded"
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              maxLength="20"
              minLength="1"
              required
              className="w-full p-2 border border-color3 rounded"
            />
            <input
              type="text"
              name="cedula"
              placeholder="Cédula"
              value={formData.cedula}
              onChange={handleChange}
              maxLength="50"
              minLength="1"
              required
              className="w-full p-2 border border-color3 rounded"
            />
            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              value={formData.contrasena}
              onChange={handleChange}
              maxLength="20"
              minLength="1"
              required
              className="w-full p-2 border border-color3 rounded"
            />
            <input
              type="date"
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              required
              className="w-full p-2 border border-color3 rounded"
            />
            <label className="flex items-center space-x-2">
              <span>Activo:</span>
              <input
                type="checkbox"
                name="activo"
                checked={formData.activo}
                onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                className="form-checkbox h-5 w-5 text-color4"
              />
            </label>
            <button type="submit" className="bg-color5 text-color1 px-4 py-2 rounded w-full">
              Guardar
            </button>
            <button type="button" onClick={closeModal} className="bg-color6 text-color1 px-4 py-2 rounded w-full mt-2">
              Cancelar
            </button>
          </form>
        </div>
      </div>
    )}  
    </div>
  );
};

export default SegurosCRUD;
