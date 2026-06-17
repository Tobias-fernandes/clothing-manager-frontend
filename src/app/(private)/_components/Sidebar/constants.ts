import {
  Banknote,
  BarChart3,
  LayoutDashboard,
  Package,
  ShieldUser,
  ShoppingBag,
  Users,
} from "lucide-react";
import { INavRoutes } from "./types";

const NAV_SKELETON_COUNT = 5;

const NAV_ITEMS: INavRoutes[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    managerOnly: false,
  },
  {
    label: "Estoque",
    href: "/stock",
    icon: Package,
    managerOnly: false,
  },
  {
    label: "Produtos",
    href: "/products",
    icon: ShoppingBag,
    managerOnly: false,
  },
  {
    label: "Vendas",
    href: "/sales",
    icon: Banknote,
    managerOnly: false,
  },
  {
    label: "Financeiro",
    href: "/finance",
    icon: BarChart3,
    managerOnly: true,
  },
  {
    label: "Usuários",
    href: "/users",
    icon: Users,
    managerOnly: true,
  },
  {
    label: "Perfil",
    href: "/profile",
    icon: ShieldUser,
    managerOnly: false,
  },
];

export { NAV_ITEMS, NAV_SKELETON_COUNT };
