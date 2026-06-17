import { EUserRoles } from "@/@enums";

const getInitials = (name: string | undefined): string => {
  if (!name) return "";
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const getRoleLabel = (role: string): string => {
  switch (role) {
    case EUserRoles.MANAGER:
      return "Gerente";
    case EUserRoles.EMPLOYEE:
      return "Funcionário";
    default:
      return role;
  }
};

export { getInitials, getRoleLabel };
