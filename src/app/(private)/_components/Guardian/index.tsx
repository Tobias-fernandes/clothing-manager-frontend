"use client";

import { ReactNode, useEffect, useState } from "react";
import { Unauthorized } from "@/components/ui/unauthorized";
import { useAuthStore } from "@/store/auth.store";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";

const GuardianComponent = ({ children }: { children: ReactNode }) => {
  const [hydrated, setHydrated] = useState<boolean>(false);
  const { user, isManager } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/sign-in");
    }
  }, [hydrated, user, router]);

  if (!hydrated) return <Skeleton className="w-full h-full" />;

  if (!user) return null;

  if (
    !isManager() &&
    ROUTES.find((route) => route.href === pathname)?.managerOnly
  )
    return <Unauthorized />;

  return <>{children}</>;
};

export default GuardianComponent;
