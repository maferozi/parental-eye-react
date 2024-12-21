import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

function RouteGuard({ children }) {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  

  if (isLoading) {
    return <></>;
  }

  if (!isLoggedIn) {
    navigate('/auth/login');
  }


  return children; 
}

export default RouteGuard;