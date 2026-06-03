import { createContext, useContext, useEffect, useState } from "react";
import {
  login as loginRequest,
  register as registerRequest,
  getCurrentUser,
} from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    async function loadCurrentUser() {
      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        setAuthLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();

        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      } catch (error) {
        logout();
      } finally {
        setAuthLoading(false);
      }
    }

    loadCurrentUser();
  }, []);

  async function login(username, password) {
    try {
      const data = await loginRequest({ username, password });

      setUser(data.user);
      setToken(data.token);

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Fel användarnamn eller lösenord",
      };
    }
  }

  async function register(username, email, password, name = "") {
    try {
      await registerRequest({
        username,
        name,
        email,
        password,
      });

      const loginData = await loginRequest({ username, password });

      setUser(loginData.user);
      setToken(loginData.token);

      localStorage.setItem("user", JSON.stringify(loginData.user));
      localStorage.setItem("token", loginData.token);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Kunde inte registrera konto",
      };
    }
  }

  function logout() {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  const isAuthenticated = Boolean(user && token);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        authLoading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}