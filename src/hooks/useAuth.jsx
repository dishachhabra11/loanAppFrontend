import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // Keep track of loading state

  useEffect(() => {
    // Check cookies for tokens on initial render
    const initializeAuth = () => {
      const userToken = Cookies.get("userToken");
      const adminToken = Cookies.get("adminToken");

      if (userToken) {
        setIsAuthenticated(true);
        setRole("user");
      } else if (adminToken) {
        setIsAuthenticated(true);
        setRole("admin");
      } else {
        setIsAuthenticated(false);
        setRole(null);
      }
      setLoading(false); // Set loading to false after initialization
    };

    initializeAuth();
  }, []);

  const login = (token, role) => {
    try {
      
      setIsAuthenticated(true);
      setRole(role);
    } catch (error) {
      console.error("Error setting token in cookies:", error);
    }
  };

  const logout = () => {
    try {
      Cookies.remove("userToken");
      Cookies.remove("adminToken");
      setIsAuthenticated(false);
      setRole(null);
    } catch (error) {
      console.error("Error removing token from cookies:", error);
    }
  };

  return <AuthContext.Provider value={{ isAuthenticated, role, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
