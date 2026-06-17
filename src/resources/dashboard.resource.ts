import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { DashboardData } from "@/@types/dashboard";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  summary: () => [...dashboardKeys.all, "summary"] as const,
};

export function useDashboard() {
  return useQuery({
    queryKey: dashboardKeys.summary(),
    queryFn: async () => {
      const res = await api.get<DashboardData>("/dashboard");
      return res.data;
    },
    refetchInterval: 1000 * 60,
  });
}
