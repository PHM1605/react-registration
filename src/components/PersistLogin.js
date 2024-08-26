import { Outlet } from "react-router-dom";
import {useState, useEffect} from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const {auth, persist} = useAuth();
  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        // set a new accessToken in Context
        await refresh();
      } catch(err) {
        console.error(err);
      }
      finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    return () => isMounted = false;
  }, [auth])

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${auth?.accessToken}`)
  }, [isLoading])

  // if "persist" is true ("I trust this device") we force a re-render of this Component => useEffect() triggered again => call refresh() to get a new accessToken
  // otherwise return directly so no useEffect() triggered
  return (
    <>
      {!persist ?
        <Outlet/>
        : isLoading ?
          <p>Loading...</p>
          : <Outlet/>
      }
      
    </>
  )
}

export default PersistLogin;