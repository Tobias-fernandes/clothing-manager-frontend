"use client";

import { useAuthStore } from "@/store/auth.store";
import { useEffect, useState } from "react";

function useAuthHydrated() {
  const [hydrated, setHydrated] = useState(
    () => useAuthStore.persist?.hasHydrated() ?? false,
  );

  useEffect(() => {
    if (!useAuthStore.persist) return;
    const unsubscribe = useAuthStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(useAuthStore.persist.hasHydrated());
    return unsubscribe;
  }, []);

  return hydrated;
}

export { useAuthHydrated };
