import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { userRole } from "../constants";

function RouteGuard({ children }) {
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
    if (!isLoading) {
      if (!isLoggedIn) {
        // Allow access to auth routes (login, register, forget password)
        if (!location.pathname.startsWith("/auth")) {
          navigate("/auth/login", { replace: true });
        }
      } else {
        // If logged in and on an auth page, redirect based on role
        if (location.pathname.startsWith("/auth")) {
          navigate(roleRoutes[user.role] || "/auth/login", { replace: true });
        }
      }
    }
  }, [isLoggedIn, isLoading, user, location.pathname, navigate]);

  if (isLoading) {
    return null; // Show nothing while loading
  }

  return children;
}

export default RouteGuard;
