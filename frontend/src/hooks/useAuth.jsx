import { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as authApi from "../services/dataService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("bb18_admin_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("bb18_admin_token");
    if (!token) {
      setLoading(false);
      return;
    }
    authApi
      .fetchMe()
      .then((res) => {
        setUser(res.user);
        localStorage.setItem("bb18_admin_user", JSON.stringify(res.user));
      })
      .catch(() => {
        localStorage.removeItem("bb18_admin_token");
        localStorage.removeItem("bb18_admin_user");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await authApi.login(email, password);
    localStorage.setItem("bb18_admin_token", res.token);
    localStorage.setItem("bb18_admin_user", JSON.stringify(res.user));
    setUser(res.user);
    return res.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("bb18_admin_token");
    localStorage.removeItem("bb18_admin_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
