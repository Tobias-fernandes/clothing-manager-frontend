import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

function useRequireRole(role: "manager" | "employee") {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    if (role === "manager" && user.role !== "manager") {
      router.push("/dashboard");
    }
  }, [user, role, router]);

  return { user, isManager: user?.role === "manager" };
}

export { useRequireRole };
