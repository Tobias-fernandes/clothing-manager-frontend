import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";

export type MovementType = "entry" | "exit" | "adjustment" | "loss" | "sale";

export interface StockMovement {
  id: string;
  product: { id: string; name: string; code: string };
  productId: string;
  responsible: { id: string; name: string };
  responsibleId: string;
  type: MovementType;
  quantity: number;
  observation: string | null;
  createdAt: string;
}

export interface CreateMovementPayload {
  productId: string;
  type: MovementType;
  quantity: number;
  observation?: string;
}

export const stockKeys = {
  all: ["stock"] as const,
  movements: (productId?: string) =>
    [...stockKeys.all, "movements", productId] as const,
  lowStock: (min?: number) => [...stockKeys.all, "low-stock", min] as const,
};

export function useStockMovements(productId?: string) {
  return useQuery({
    queryKey: stockKeys.movements(productId),
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (productId) params.productId = productId;
      const res = await api.get<StockMovement[]>("/stock/movements", {
        params,
      });
      return res.data;
    },
  });
}

export function useCreateMovement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateMovementPayload) => {
      const res = await api.post<StockMovement>("/stock/movements", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stockKeys.all });
    },
  });
}
