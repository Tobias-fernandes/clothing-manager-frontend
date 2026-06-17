import { SignInData, SignUpData } from "@/@types/auth";
import { api } from "./api";

async function signIn(data: SignInData) {
  const response = await api.post("/auth/signin", data);
  return response.data;
}

async function signUp(data: SignUpData) {
  const response = await api.post("/auth/register", {
    ...data,
    role: "manager",
  });
  return response.data;
}

export { signIn, signUp };
