import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const {setAuth} = useAuth();

  const refresh = async () => {
    const response = await axios.get('/refresh', { withCredentials: true });
    // set context based on previous state of context
    setAuth(prev => {
      console.log("PREV:", JSON.stringify(prev));
      console.log(response.data.accessToken);
      return {
        ...prev, 
        roles: response.data.roles,
        accessToken: response.data.accessToken
      };
    });
    return response.data.accessToken; // return new accessToken
  }

  return refresh;
}

export default useRefreshToken;