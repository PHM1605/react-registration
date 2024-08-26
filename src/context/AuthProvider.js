import { createContext, useState } from 'react';

const AuthContext = createContext({});

// "children" is the Component wrapped inside AuthProvider e.g. <App/>
// "auth" is authentication Context
export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});
  // "do you trust this device or not" - to save refreshToken and accessToken
  // const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false)

  return <AuthContext.Provider value={{auth, setAuth}}>
    {children}
  </AuthContext.Provider>
}

export default AuthContext;
