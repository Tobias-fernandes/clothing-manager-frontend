import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";

export interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  size: string;
  color: string;
  costPrice: number;
  salePrice: number;
  quantity: number;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductPayload {
  name: string;
  code: string;
  category: string;
  size: string;
  color: string;
  costPrice: number;
  salePrice: number;
  quantity: number;
  description?: string;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;

export const productKeys = {
  all: ["products"] as const,
  list: (search?: string) => [...productKeys.all, "list", search] as const,
  detail: (id: string) => [...productKeys.all, "detail", id] as const,
  lowStock: (min?: number) => [...productKeys.all, "low-stock", min] as const,
};

export function useProducts(search?: string) {
  return useQuery({
    queryKey: productKeys.list(search),
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (search) params.search = search;
      const res = await api.get<Product[]>("/products", { params });
      return res.data;
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      const res = await api.get<Product>(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useLowStockProducts(minQuantity?: number) {
  return useQuery({
    queryKey: productKeys.lowStock(minQuantity),
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (minQuantity) params.minQuantity = String(minQuantity);
      const res = await api.get<Product[]>("/stock/low-stock", { params });
      return res.data;
    },
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateProductPayload) => {
      const res = await api.post<Product>("/products", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: UpdateProductPayload & { id: string }) => {
      const res = await api.patch<Product>(`/products/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

export function useDeactivateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.patch<Product>(`/products/${id}/deactivate`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}
