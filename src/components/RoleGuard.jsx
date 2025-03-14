import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router";

function RoleGuard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  


  if (isLoading) {
    return <></>;
  }
if(isLoggedIn && location.pathname.startsWith("/super-admin") && user.role === 1){
  return children;
}
  else if (isLoggedIn && location.pathname.startsWith("/admin") && user.role === 2) {
    return children;
  }
  else if (isLoggedIn && location.pathname.startsWith("/super-admin") && user.role === 2) {
    navigate('/admin/', { replace: true });
    return null;
  }
    else if (isLoggedIn && location.pathname.startsWith("/admin") && user.role === 1) {
        navigate('/super-admin/', { replace: true });
        return null;
    }
  return children; 
}

export default RoleGuard;