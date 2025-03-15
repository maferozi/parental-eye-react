import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

function RoleGuard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);

  const roleRoutes = {
    1: "/super-admin",
    2: "/admin",
    3: "/gardian",
    4: "/child",
    5: "/driver",
  };

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      const allowedRoute = roleRoutes[user.role];

      if (!location.pathname.startsWith(allowedRoute)) {
        navigate(allowedRoute, { replace: true });
      }
    }
  }, [isLoggedIn, isLoading, user, location.pathname, navigate]);

  if (isLoading) {
    return null; // Show nothing while loading
  }

  if (!isLoggedIn) {
    navigate("/auth/login", { replace: true }); // Redirect to login if not authenticated
    return null;
  }

  return children;
}

export default RoleGuard;
