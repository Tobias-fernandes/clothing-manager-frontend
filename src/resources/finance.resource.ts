import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";

export type EntryType = "income" | "expense";
export type EntryCategory =
  | "sale"
  | "supplier"
  | "maintenance"
  | "salary"
  | "other";

export interface FinanceEntry {
  id: string;
  type: EntryType;
  category: EntryCategory;
  description: string;
  amount: number;
  saleId: string | null;
  responsible: { id: string; name: string };
  responsibleId: string;
  createdAt: string;
}

export interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  startDate: string;
  endDate: string;
}

export interface CreateEntryPayload {
  type: EntryType;
  category: EntryCategory;
  description: string;
  amount: number;
  saleId?: string;
}

export const financeKeys = {
  all: ["finance"] as const,
  list: (filters?: {
    startDate?: string;
    endDate?: string;
    type?: EntryType;
  }) => [...financeKeys.all, "list", filters] as const,
  summary: (filters?: { startDate?: string; endDate?: string }) =>
    [...financeKeys.all, "summary", filters] as const,
};

export function useFinanceEntries(filters?: {
  startDate?: string;
  endDate?: string;
  type?: EntryType;
}) {
  return useQuery({
    queryKey: financeKeys.list(filters),
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (filters?.startDate) params.startDate = filters.startDate;
      if (filters?.endDate) params.endDate = `${filters.endDate}T23:59:59`;
      if (filters?.type) params.type = filters.type;
      const res = await api.get<FinanceEntry[]>("/finance", { params });
      return res.data;
    },
  });
}

export function useFinanceSummary(filters?: {
  startDate?: string;
  endDate?: string;
}) {
  return useQuery({
    queryKey: financeKeys.summary(filters),
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (filters?.startDate) params.startDate = filters.startDate;
      if (filters?.endDate) params.endDate = `${filters.endDate}T23:59:59`;
      const res = await api.get<FinanceSummary>("/finance/summary", { params });
      return res.data;
    },
  });
}

export function useCreateFinanceEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateEntryPayload) => {
      const res = await api.post<FinanceEntry>("/finance", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: financeKeys.all });
    },
  });
}
