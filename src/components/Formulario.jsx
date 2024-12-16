import "../pages/Login.css";
import StartStopButton from "./StarEngine";

function Formulario({ setCorreo, setContrasena, handlerEnviar }) {

  return (
    <div className="formulario">
      <form className="formLogin" onSubmit={(e) => e.preventDefault()}>
        <div className="contenidoInput">
          <label htmlFor="usuario">Usuario</label>
          <input
            type="text"
            id="usuario"
            placeholder="Usuario"
            className="inputA"
            onChange={(e) => setCorreo(e.target.value)} // Actualiza el estado del correo
          />
        </div>
        <div className="contenidoInput">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            placeholder="Contraseña"
            className="inputA"
            onChange={(e) => setContrasena(e.target.value)} // Actualiza el estado de la contraseña
          />
        </div>
        <StartStopButton onClick={handlerEnviar}/>
      </form>
    </div>
  );
}

export default Formulario;