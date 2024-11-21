import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // Store the role (user or admin)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
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
    } catch (error) {
      console.error("Error retrieving token from cookies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (token, role) => {
    try {
      if (role === "user") {
        Cookies.set("userToken", token, { expires: 15, sameSite: "strict" });
      } else if (role === "admin") {
        Cookies.set("adminToken", token, { expires: 15, sameSite: "strict" });
      }
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
      alert("Logged out successfully");
    } catch (error) {
      console.error("Error removing token from cookies:", error);
    }
  };

  return <AuthContext.Provider value={{ isAuthenticated, role, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
