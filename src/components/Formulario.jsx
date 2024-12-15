import "../pages/Login.css"
import StartStopButton from "./StarEngine";


function Formulario() {
    return (
      <div className="formulario">
        <p className="parrafo">¿Aún no tienes cuenta? Regístrate hoy y accede a los mejores seguros para tu vehiculo.</p>
        <form action="" className="form">
          <input type="text" placeholder="Usuario" className="inputA" />
          <input type="password" placeholder="Contraseña" className="inputA" />
          <StartStopButton/>
        </form>
      </div>
    );
  }
  export default Formulario;
  