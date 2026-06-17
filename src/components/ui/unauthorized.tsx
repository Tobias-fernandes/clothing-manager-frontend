"use client";

import { ShieldOff } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

export function Unauthorized() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-accent">
        <ShieldOff className="size-9 text-accent-foreground" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Acesso restrito
        </h1>
        <p className="max-w-xs text-sm text-muted-foreground">
          Você não tem permissão para acessar esta página. Entre em contato com
          um gerente caso precise de acesso.
        </p>
      </div>

      <Button asChild variant="outline" size="sm">
        <Link href="/dashboard">Voltar ao início</Link>
      </Button>
    </div>
  );
}
