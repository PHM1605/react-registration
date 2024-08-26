import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const RequireAuth = ({allowedRoles}) => {
  // "auth", "setAuth"... are properties of useAuth
  const {auth} = useAuth();
  const location = useLocation();
  const decoded = auth?.accessToken 
    ? jwtDecode(auth.accessToken) 
    : undefined;
  console.log('decoded:', decoded)
  const roles = decoded?.UserInfo?.roles || []

  // if "auth Context" exists
  // replace /login with the current user's location in their location history
  return (
    roles.find(role => allowedRoles?.includes(role))
      ? <Outlet />
      : auth?.user 
        ? <Navigate to="/unauthorized" state={{from:location}} replace />
        : <Navigate to="/login" state={{from:location}} replace/> 
  );
}

export default RequireAuth;