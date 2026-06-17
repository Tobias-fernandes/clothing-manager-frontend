import {
  FileBarChart,
  FileText,
  LayoutDashboard,
  Package,
  ShirtIcon,
  ShoppingCart,
} from "lucide-react";

const features = [
  {
    icon: ShirtIcon,
    title: "Gestão de produtos",
    description:
      "Cadastre peças com nome, código, tamanho, cor, preço de custo e venda.",
  },
  {
    icon: Package,
    title: "Controle de estoque",
    description:
      "Entradas, saídas e ajustes com histórico completo e alertas de reposição.",
  },
  {
    icon: ShoppingCart,
    title: "Registro de vendas",
    description:
      "Pix, dinheiro, débito, crédito à vista e parcelado em segundos.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard em tempo real",
    description:
      "Veja o total vendido, saldo e estoque baixo logo ao abrir o sistema.",
  },
  {
    icon: FileBarChart,
    title: "Financeiro completo",
    description:
      "Entradas automáticas por venda e registro manual de despesas.",
  },
  {
    icon: FileText,
    title: "Relatórios por período",
    description:
      "Vendas, estoque e financeiro filtrados por dia, semana ou mês.",
  },
];

export { features };
