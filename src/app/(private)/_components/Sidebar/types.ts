import { ForwardRefExoticComponent, RefAttributes } from "react";
import { NAV_ITEMS } from "./constants";
import { LucideProps } from "lucide-react";

interface INavItem {
  item: (typeof NAV_ITEMS)[number];
  collapsed: boolean;
  active: boolean;
}

interface INavRoutes {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  managerOnly: boolean;
}

export type { INavItem, INavRoutes };
