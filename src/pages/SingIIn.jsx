
import FormularioDos from "../components/FormularioDos";
import SingIn from "../components/SingIn";
import "./SingIIn.css"

function SingIIn() {
  return (
    <div className="signiin-page">
      <h3 className="titulo">Crea una cuenta</h3>
      <FormularioDos />
      <SingIn className = "espalda" />
      
    </div>
  );
}
export default SingIIn;
