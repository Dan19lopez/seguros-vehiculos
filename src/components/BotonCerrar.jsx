import { useNavigate } from "react-router-dom";
import "./BotonCerrar.css"

export default function BotonCerrar() {

    let redireccion = useNavigate();
    const handleClick = () => {
        redireccion("/")
    }

    return (
        <button type="button" className="closeButton" onClick={handleClick}>Regresar</button>
    );
}