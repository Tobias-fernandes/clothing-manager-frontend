"use client";

import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";

export function AuthHydration() {
  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  return null;
}
