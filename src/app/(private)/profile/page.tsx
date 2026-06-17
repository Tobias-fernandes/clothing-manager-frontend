"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { User, Mail, ShieldCheck, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useProfile, useUpdateProfile } from "@/resources/profile.resource";
import { useAuthStore } from "@/store/auth.store";
import { formatDate } from "@/lib/helpers";

const profileSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  password: z
    .string()
    .refine((v) => v === "" || v.length >= 6, {
      message: "Senha mínima de 6 caracteres",
    })
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ROLE_LABELS: Record<string, string> = {
  manager: "Gerente",
  employee: "Funcionário",
};

const ProfilePage = () => {
  const { user, setUser } = useAuthStore();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", password: "" },
  });

  useEffect(() => {
    if (profile) {
      reset({ name: profile.name, password: "" });
    }
  }, [profile, reset]);

  const currentName = watch("name");
  const currentPassword = watch("password") ?? "";

  const nameChanged = profile ? currentName !== profile.name : false;
  const passwordChanged = currentPassword.length > 0;
  const hasChanges = nameChanged || passwordChanged;

  const onSubmit = async (values: ProfileFormValues) => {
    if (!hasChanges) return;

    const payload: { name?: string; password?: string } = {};
    if (nameChanged) payload.name = values.name;
    if (passwordChanged) payload.password = values.password;

    try {
      const updated = await updateProfile.mutateAsync(payload);
      if (user) {
        setUser({ ...user, name: updated.name });
      }
      reset({ name: updated.name, password: "" });
      toast.success("Perfil atualizado com sucesso!");
    } catch (err: unknown) {
      const msg =
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data
          ? String(err.response.data.message)
          : "Erro ao atualizar perfil.";
      toast.error(msg);
    }
  };

  const initials = profile
    ? profile.name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <h1 className="text-2xl font-bold text-foreground">Perfil</h1>

      {/* Seção de informações */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Informações da conta</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {isLoading ? (
            <div className="flex items-center gap-4">
              <Skeleton className="size-16 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-52" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          ) : (
            profile && (
              <>
                <div className="flex items-center gap-4">
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    {initials}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-semibold capitalize text-foreground">
                      {profile.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {profile.email}
                    </p>
                    <Badge variant="secondary" className="w-fit">
                      {ROLE_LABELS[profile.role] ?? profile.role}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="size-4 shrink-0" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ShieldCheck className="size-4 shrink-0" />
                    <span>{ROLE_LABELS[profile.role] ?? profile.role}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground sm:col-span-2">
                    <CalendarDays className="size-4 shrink-0" />
                    <span>Membro desde {formatDate(profile.createdAt)}</span>
                  </div>
                </div>
              </>
            )
          )}
        </CardContent>
      </Card>

      {/* Formulário de edição */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Editar dados</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nome</Label>
              {isLoading ? (
                <Skeleton className="h-9 w-full" />
              ) : (
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  {...register("name")}
                />
              )}
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Nova senha</Label>
              {isLoading ? (
                <Skeleton className="h-9 w-full" />
              ) : (
                <Input
                  id="password"
                  type="password"
                  placeholder="Deixe em branco para não alterar"
                  {...register("password")}
                />
              )}
              {errors.password && (
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!hasChanges || updateProfile.isPending || isLoading}
              className="self-start"
            >
              {updateProfile.isPending ? "Salvando..." : "Salvar alterações"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
