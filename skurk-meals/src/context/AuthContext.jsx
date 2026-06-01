import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  function login(username, password) {
    if (username === "user" && password === "password") {
      const loggedInUser = {
        username: "user",
      };

      const fakeToken = "fake-jwt-token";

      setUser(loggedInUser);
      setToken(fakeToken);

      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("token", fakeToken);

      return { success: true };
    }

    return {
      success: false,
      message: "Fel användarnamn eller lösenord",
    };
  }

  function register(username, email, password) {
    const newUser = {
      username,
      email,
    };

    const fakeToken = "fake-jwt-token";

    setUser(newUser);
    setToken(fakeToken);

    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", fakeToken);

    return { success: true };
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