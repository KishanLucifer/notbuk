import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types"; // ✅ Import PropTypes

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser({
          username: decodedToken.username || "User...!",
          profileImage: decodedToken.profile_img || "/default-profile.png",
        });
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("access_token", token);
    const decodedToken = jwtDecode(token);
    setUser({
      username: decodedToken.username || "User...!",
      profileImage: decodedToken.profile_img || "/default-profile.png",
    });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// ✅ Add PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
