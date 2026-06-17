"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthHydrated } from "@/hooks/useAuthHydrated";
import { useAuthStore } from "@/store/auth.store";
import { LogOut, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS, NAV_SKELETON_COUNT } from "./constants";
import NavItem from "./navItem";
import { useLogout } from "@/hooks/useLogout";
import { getInitials } from "./utils";

const MobileNavHeader: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const hydrated = useAuthHydrated();
  const { user, isManager } = useAuthStore();
  const manager = isManager();
  const logout = useLogout();

  const visibleItems = NAV_ITEMS.filter((item) => !item.managerOnly || manager);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
  };

  const initials = getInitials(user?.name);

  return (
    <header className="flex h-14 shrink-0 items-center border-b border-border bg-card px-4 sm:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
        className="text-muted-foreground"
      >
        <Menu className="size-5" />
      </Button>
      <span className="ml-3 text-sm font-semibold tracking-tight text-foreground">
        Clothing Manager
      </span>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="flex w-72 flex-col gap-0 p-0"
        >
          <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
          <SheetDescription className="sr-only">
            Navegação principal
          </SheetDescription>
          <div className="flex h-14 items-center border-b border-border px-4">
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Clothing Manager
            </span>
          </div>

          <nav className="flex-1 overflow-y-auto overflow-x-hidden p-2">
            <ul className="flex flex-col gap-0.5">
              {!hydrated &&
                Array.from({ length: NAV_SKELETON_COUNT }).map((_, i) => (
                  <li key={i} className="px-3 py-2.5">
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-4.5 shrink-0" />
                      <Skeleton className="h-3.5 w-24" />
                    </div>
                  </li>
                ))}
              {hydrated &&
                visibleItems.map((item) => (
                  <li key={item.href}>
                    <NavItem
                      item={item}
                      collapsed={false}
                      active={pathname.startsWith(item.href)}
                    />
                  </li>
                ))}
            </ul>
          </nav>

          <div className="border-t border-border p-2">
            {!hydrated && (
              <div className="mb-2 flex items-center gap-2.5 rounded-lg px-3 py-2">
                <Skeleton className="size-7 shrink-0 rounded-full" />
                <div className="flex min-w-0 flex-col gap-1.5">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-2.5 w-14" />
                </div>
              </div>
            )}
            {hydrated && user && (
              <div className="mb-2 flex items-center gap-2.5 rounded-lg px-3 py-2">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-foreground">
                    {user.name}
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {user.role}
                  </p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="h-auto w-full justify-start gap-3 px-3 py-2.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="size-4.5 shrink-0" />
              <span>Sair</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavHeader;
