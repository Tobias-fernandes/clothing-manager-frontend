import { useDashboard } from "@/resources/dashboard.resource";
import { useAuthStore } from "@/store/auth.store";
import { ColorVariant } from "../types";

const useDashboardPage = () => {
  const { user } = useAuthStore();
  const { isManager: storeIsManager } = useAuthStore();

  const isManager = storeIsManager();

  const { data, isLoading, isError, error, refetch } = useDashboard();

  const lowStockColor: ColorVariant =
    (data?.stock.lowStockProducts ?? 0) > 0 ? "red" : "amber";
  const balanceColor: ColorVariant =
    (data?.finance.balance ?? 0) >= 0 ? "green" : "red";
  return {
    user,
    isManager,
    data,
    isLoading,
    isError,
    error,
    lowStockColor,
    balanceColor,
    refetch,
  };
};

export default useDashboardPage;
