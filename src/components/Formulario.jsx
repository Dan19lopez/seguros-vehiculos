import "../pages/Login.css"
import StartStopButton from "./StarEngine";


function Formulario() {
    return (
      <div className="formulario">
        <form action="" className="form">
          <input type="text" placeholder="Usuario" className="input" />
          <input type="password" placeholder="Contraseña" className="input" />
          <StartStopButton/>
        </form>
      </div>
    );
  }
  export default Formulario;
  