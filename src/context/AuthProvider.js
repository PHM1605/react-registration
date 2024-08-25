import { createContext, useState } from 'react';

const AuthContext = createContext({});

// "children" is the Component wrapped inside AuthProvider e.g. <App/>
// "auth" is authentication Context
export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});
  return <AuthContext.Provider value={{auth, setAuth}}>
    {children}
  </AuthContext.Provider>
}

export default AuthContext;
