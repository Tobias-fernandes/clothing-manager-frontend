import { EUserRoles } from "@/@enums";

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: EUserRoles;
}

interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  isManager: () => boolean;
}

export type { SignInData, SignUpData, AuthUser, AuthState };
