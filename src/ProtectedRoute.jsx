import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LinearProgress from "@mui/material/LinearProgress";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div><LinearProgress className="h-2 w-full mt-2" color="primary"/></div>; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
