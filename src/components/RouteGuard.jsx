import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router";
import { userRole } from "../constants";

function RouteGuard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  

  if (isLoading) {
    return <></>;
  }
if(!isLoggedIn && location.pathname.startsWith("/auth/")){
  return children;
}
  else if (!isLoggedIn) {
    
    navigate('/auth/login', { replace: true });
    return null;
  }

  if (isLoggedIn && location.pathname.startsWith("/auth/") && user.role === 2) {
   
    navigate('/admin/', { replace: true });
    return null; 
  }

  if (isLoggedIn && location.pathname.startsWith("/auth/") && user.role === 1) {
   
    navigate('/super-admin/', { replace: true });
    return null; 
  }


  return children; 
}

export default RouteGuard;