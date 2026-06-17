"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuthHydrated } from "@/hooks/useAuthHydrated";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import { ChevronLeft, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS, NAV_SKELETON_COUNT } from "./constants";
import NavItem from "./navItem";
import { getInitials, getRoleLabel } from "./utils";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";

const SidebarComponent: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const pathname = usePathname();
  const hydrated = useAuthHydrated();
  const { user, isManager } = useAuthStore();
  const manager = isManager();
  const logout = useLogout();

  const visibleItems = NAV_ITEMS.filter((item) => !item.managerOnly || manager);

  const initials = getInitials(user?.name);

  const handleLogout = () => {
    logout();
  };

  return (
    <aside
      className={cn(
        "hidden h-screen flex-col border-r border-border bg-card transition-[width] duration-300 sm:flex",
        collapsed ? "w-15" : "w-55",
      )}
    >
      <div
        className={cn(
          "flex h-14 items-center border-b border-border px-3",
          collapsed ? "justify-center" : "justify-between",
        )}
      >
        {!collapsed && (
          <span className="select-none truncate text-sm font-semibold tracking-tight text-foreground">
            Clothing Manager
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          <ChevronLeft
            className={cn(
              "size-4 transition-transform duration-300",
              collapsed && "rotate-180",
            )}
          />
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-2">
        <ul className="flex flex-col gap-0.5">
          {!hydrated
            ? Array.from({ length: NAV_SKELETON_COUNT }).map((_, i) => (
                <li key={i} className="px-3 py-2.5">
                  {collapsed ? (
                    <Skeleton className="size-4.5" />
                  ) : (
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-4.5 shrink-0" />
                      <Skeleton className="h-3.5 w-24" />
                    </div>
                  )}
                </li>
              ))
            : visibleItems.map((item) => (
                <li key={item.href}>
                  <NavItem
                    item={item}
                    collapsed={collapsed}
                    active={pathname.startsWith(item.href)}
                  />
                </li>
              ))}
        </ul>
      </nav>

      <div className="border-t border-border p-2">
        {!hydrated
          ? !collapsed && (
              <div className="mb-2 flex items-center gap-2.5 rounded-lg px-3 py-2">
                <Skeleton className="size-7 shrink-0 rounded-full" />
                <div className="flex min-w-0 flex-col gap-1.5">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-2.5 w-14" />
                </div>
              </div>
            )
          : !collapsed &&
            user && (
              <div className="mb-2 flex items-center gap-2.5 rounded-lg px-3 py-2">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-foreground capitalize">
                    {user.name}
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {getRoleLabel(user.role)}
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
          {!collapsed && <span>Sair</span>}
        </Button>
      </div>
    </aside>
  );
};

export default SidebarComponent;
