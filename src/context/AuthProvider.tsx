
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext";
import * as authService from "../services/authService";
import { API_BASE_URL } from "../services/apiConfig";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLogin() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Invalid token");

        const data = await response.json();
        setUser(data.user);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  async function login(email: string, password: string) {
    const data = await authService.login(email, password);

    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
  }

  async function register(name: string, email: string, password: string) {
    await authService.register(name, email, password);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
}

