import { useNavigate } from "react-router-dom";
import "../pages/Login.css"


function SingIn() {
let redireccion= useNavigate();
const handleClick =()=>{
  redireccion("/login")
}


  return (
    <div className="espaldaDos">
      <button className="btn btn2" onClick={handleClick} >Iniciar Sesión</button>
    </div>
  );
}
export default SingIn;
  
