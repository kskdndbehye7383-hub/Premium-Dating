import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../pages/Login";

export default function ProtectedRoute() {
  const isAuth = isAuthenticated();
  
  if (!isAuth) {
    return <Navigate to="/register" replace />;
  }
  
  return <Outlet />;
}
