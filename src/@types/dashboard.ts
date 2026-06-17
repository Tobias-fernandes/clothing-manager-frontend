interface IEmployee {
  id: string;
  name: string;
}

interface ILastSales {
  id: string;
  employee: IEmployee;
  paymentMethod: string;
  total: number;
  createdAt: string;
}

interface ISales {
  totalToday: number;
  countToday: number;
  byPaymentMethod: Record<string, number>;
  lastSales: ILastSales[];
}

interface IFinance {
  totalIncomeToday: number;
  totalExpenseToday: number;
  balance: number;
}

interface IStock {
  totalProducts: number;
  lowStockProducts: number;
}

interface DashboardData {
  today: string;
  sales: ISales;
  stock: IStock;
  finance: IFinance;
}

export type { DashboardData };
