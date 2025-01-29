import api from "@api/api.ts";

export const register = (email: string, password: string) => {
  return api.post("/auth/register", { email, password });
};
export const login = (email: string, password: string) => {
  return api.post("/auth/login", { email, password });
};
export const getProfile = () => {
  return api.get("/auth/me");
};
export const sendPhishingEmail = (email: string) => {
  return api.post("/phishing/send", { email });
};
export const getPhishingAttempts = () => {
  return api.get("/phishing/attempts");
};
