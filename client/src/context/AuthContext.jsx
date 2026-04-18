import { createContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const decodeAndSetUser = useCallback((token) => {
    try {
      const decoded = jwtDecode(token);

      // Check if token is expired
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("access_token");
        setUser(null);
        return false;
      }

      setUser({
        id: decoded.id,
        username: decoded.username || "User",
        fullname: decoded.fullname || "",
        email: decoded.email || "",
        profileImage: decoded.profile_img || `https://i.pravatar.cc/150?u=${decoded.email || decoded.username || 'user'}`,
      });
      return true;
    } catch (error) {
      console.error("Token decode error:", error);
      localStorage.removeItem("access_token");
      setUser(null);
      return false;
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      decodeAndSetUser(token);
    }
    setLoading(false);
  }, [decodeAndSetUser]);

  const login = (token) => {
    localStorage.setItem("access_token", token);
    decodeAndSetUser(token);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
