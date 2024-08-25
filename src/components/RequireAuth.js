import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({allowedRoles}) => {
  // "auth", "setAuth"... are properties of useAuth
  const {auth} = useAuth();
  const location = useLocation();

  // if "auth Context" exists
  // replace /login with the current user's location in their location history
  return (
    auth?.roles?.find(role => allowedRoles?.includes(role))
      ? <Outlet />
      : auth?.user 
        ? <Navigate to="/unauthorized" state={{from:location}} replace />
        : <Navigate to="/login" state={{from:location}} replace/> 
  );
}

export default RequireAuth;