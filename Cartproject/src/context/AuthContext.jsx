import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// create a global state that tracks the active user and whatever comp uses this state gets re-rendered when any of the functions run.
function AuthProvider({ children }) {
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("activeUser");
    if (storedUser) {
      setActiveUser((storedUser));
    }
  }, []);

  function loginUser(user) {
    localStorage.setItem("activeUser", user);
    setActiveUser(user);
  }

  const logout = () => {
    localStorage.removeItem("activeUser");
    localStorage.removeItem("token");
    setActiveUser(null);
  };

  return <AuthContext.Provider value={{ activeUser, loginUser, logout }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
