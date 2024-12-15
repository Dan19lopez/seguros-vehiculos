import { Link, useNavigate } from "react-router-dom";
import "../pages/Login.css"


function Loggin() {

  let redireccion = useNavigate();
  const handleClick = () => {
    redireccion("/signin")
  }

  return (
    <div >

      <button className="btn btn2" onClick={handleClick} >¿No tienes una cuenta con nosotros? Regístrate aquí</button>

    </div>
  );
}
export default Loggin;
