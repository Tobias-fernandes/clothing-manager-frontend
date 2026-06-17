import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "manager" | "employee";
  storeId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfilePayload {
  name?: string;
  password?: string;
}

export const profileKeys = {
  all: ["profile"] as const,
  me: () => [...profileKeys.all, "me"] as const,
};

export function useProfile() {
  return useQuery({
    queryKey: profileKeys.me(),
    queryFn: async () => {
      const res = await api.get<UserProfile>("/auth/me");
      return res.data;
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const res = await api.patch<UserProfile>("/auth/me", payload);
      return res.data;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(profileKeys.me(), updated);
    },
  });
}
