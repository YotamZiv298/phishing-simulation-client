import { getProfile, login as loginAPI } from "@api/api.service.ts";
import {
  Context,
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthContent = {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext: Context<AuthContent> = createContext<AuthContent>(
  {} as AuthContent,
);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await getProfile();

      setUser(data.email);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await loginAPI(email, password);
      localStorage.setItem("token", data.access_token);
      await fetchUser();
    } catch (err) {
      console.error("Login failed", err);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  const context: AuthContent = useMemo<AuthContent>(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
