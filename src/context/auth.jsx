// contexts/AuthContext.jsx
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para el usuario

  const login = (userData) => setUser(userData); // Función para iniciar sesión
  const logout = () => setUser(null); // Función para cerrar sesión

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
