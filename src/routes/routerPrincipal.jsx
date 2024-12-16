import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import SingIIn from "../pages/SingIIn";
import LogAndSignIn from "../pages/LogAndSignIn";
import SegurosPage from "../pages/SegurosPage";
import VehiculosPage from "../pages/VehiculosPage";
/*import LoginPage from "../pages/LoginPage";*/
/*import SignUpPage from "../pages/SignUpPage";*/


const RouterPrincipal = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signin",
    element: <SingIIn />,
  },
  {
    path: "/loginSignin",
    element: <LogAndSignIn />,
  },
  {
    path: "/crudVehiculo",
    element: <VehiculosPage />,
  },
  {
    path: "/crudUsuario",
    element: <SegurosPage />,
  }
  /*{
    path: "/inicio",
    element: <LoginPage />,
  },*/
  /*{
    path: "/registro",
    element: <SignUpPage />,
  }*/



]);

export default RouterPrincipal;
