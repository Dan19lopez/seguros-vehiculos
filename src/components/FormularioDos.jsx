import "../pages/Login.css"
import StartStopButton from "./StarEngine";

function FormularioDos({setCedula, cedula, setContrasena, contrasena, setCorreo, correo, handlerEnviar}) {
  return (
    <div className="formularioDos">

      <form action="" className="formDos">
        <div className="contenidoInputB">
          <label htmlFor="cedula">Doc Identidad</label>
          <input
            type="text"
            id="cedula"
            required
            placeholder="Cedula"
            className="inputA"
            value={cedula}
            name="cedula"
            onChange={(e) => setCedula(e.target.value)} // Actualiza el estado del correo
          />
        </div>
        <div className="contenidoInputB">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            id="email"
            required
            placeholder="Email"
            className="inputA"
            name="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)} // Actualiza el estado del correo
          />
        </div>

        <div className="contenidoInputB">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            required
            placeholder="Contraseña"
            className="inputA"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)} // Actualiza el estado de la contraseña
          />
        </div>
        <StartStopButton onClick={handlerEnviar} />
      </form>
    </div>
  );

}
export default FormularioDos;

/*  */