import "../pages/Login.css"
import StartStopButton from "./StarEngine";

function FormularioDos() {
  return (
    <div className="formularioDos">

      <form action="" className="formDos">
        <div className="contenidoInputB">
          <label htmlFor="usuario">Doc Identidad</label>
          <input
            type="text"
            id="usuarioB"
            placeholder="Cedula"
            className="inputA"
          /*onChange={(e) => setCorreo(e.target.value)} // Actualiza el estado del correo*/
          />
        </div>
        <div className="contenidoInputB">
          <label htmlFor="usuario">E-mail</label>
          <input
            type="text"
            id="usuarioB"
            placeholder="Email"
            className="inputA"
          /*onChange={(e) => setCorreo(e.target.value)} // Actualiza el estado del correo*/
          />
        </div>

        <div className="contenidoInputB">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            placeholder="Contraseña"
            className="inputA"
            /*onChange={(e) => setContrasena(e.target.value)} // Actualiza el estado de la contraseña*/
          />
        </div>
        <StartStopButton />
      </form>
    </div>
  );

}
export default FormularioDos;