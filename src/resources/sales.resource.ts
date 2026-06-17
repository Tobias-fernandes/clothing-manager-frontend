import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { productKeys } from "@/resources/products.resource";
import type {
  Sale,
  DailySummary,
  NewSaleFormValues,
} from "@/app/(private)/sales/types";

// TODO: mudar esse interface para local adequado.
interface CreateSalePayload {
  paymentMethod: NewSaleFormValues["paymentMethod"];
  installments: number | null;
  items: { productId: string; quantity: number }[];
}

export const salesKeys = {
  all: ["sales"] as const,
  list: (filters?: { startDate?: string; endDate?: string }) =>
    [...salesKeys.all, "list", filters] as const,
  detail: (id: string) => [...salesKeys.all, "detail", id] as const,
  summary: () => [...salesKeys.all, "summary"] as const,
};

export function useSales(filters?: { startDate?: string; endDate?: string }) {
  return useQuery({
    queryKey: salesKeys.list(filters),
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (filters?.startDate) params.startDate = filters.startDate;
      if (filters?.endDate) params.endDate = filters.endDate;
      const res = await api.get<Sale[]>("/sales", { params });
      return res.data;
    },
  });
}

export function useSale(id: string) {
  return useQuery({
    queryKey: salesKeys.detail(id),
    queryFn: async () => {
      const res = await api.get<Sale>(`/sales/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useDailySummary() {
  return useQuery({
    queryKey: salesKeys.summary(),
    queryFn: async () => {
      const res = await api.get<DailySummary>("/sales/daily-summary");
      return res.data;
    },
  });
}

export function useCreateSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateSalePayload) => {
      const res = await api.post<Sale>("/sales", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: salesKeys.all });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}
