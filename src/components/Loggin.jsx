import { Link, useNavigate } from "react-router-dom";
import "../pages/Login.css"


function Loggin() {

  let redireccion = useNavigate();
  const handleClick = () => {
    redireccion("/signin")
  }

  return (
  

   <button className="btnLogin btn2Login" onClick={handleClick} >¿No tienes una cuenta con nosotros? Regístrate aquí</button>

  );
}
export default Loggin;
