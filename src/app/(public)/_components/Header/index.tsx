"use client";

import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import { ShirtIcon } from "lucide-react";
import Link from "next/link";
import { navLinks } from "./constants";
import MenuSheet from "./menuSheet";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <ShirtIcon className="size-5" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            Clothing <span className="text-primary">Manager</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <DarkModeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/sign-in">Entrar</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Criar conta</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <MenuSheet />
        </div>
      </div>
    </header>
  );
};

export default Header;
