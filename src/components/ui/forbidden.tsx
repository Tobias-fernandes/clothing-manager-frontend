"use client";

import { LockKeyhole } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

export function Forbidden() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-destructive/10">
        <LockKeyhole className="size-9 text-destructive" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Acesso negado
        </h1>
        <p className="max-w-xs text-sm text-muted-foreground">
          Você precisa estar autenticado para acessar esta página. Faça login
          para continuar.
        </p>
      </div>

      <Button asChild size="sm">
        <Link href="/sign-in">Fazer login</Link>
      </Button>
    </div>
  );
}
