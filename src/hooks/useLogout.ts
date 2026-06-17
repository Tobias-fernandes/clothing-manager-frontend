import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";

function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearUser = useAuthStore((state) => state.clearUser);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    clearUser();
    queryClient.clear();
    router.push("/sign-in");
  }

  return logout;
}

export { useLogout };
