import z from "zod";
import { newSaleSchema } from "@/lib/validations/new-sale.schema";
import { EPayments, EStatus } from "./enum";

interface IProduct {
  id: string;
  name: string;
  code: string;
}

interface IItems {
  id: string;
  saleId: string;
  product: IProduct;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface IEmployee {
  id: string;
  name: string;
}

interface Sale {
  id: string;
  employee: IEmployee;
  employeeId: string;
  paymentMethod: EPayments;
  installments: number | null;
  total: number;
  items: IItems[];
  createdAt: string;
}

interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  size: string;
  color: string;
  salePrice: number;
  quantity: number;
  isActive: boolean;
}

interface DailySummary {
  date: string;
  total: number;
  byPaymentMethod: Record<EPayments, number>;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface ActiveFilter {
  start: string;
  end: string;
}

type NewSaleFormValues = z.infer<typeof newSaleSchema>;

type SalesState =
  | { status: EStatus.LOADING }
  | { status: EStatus.ERROR; message: string }
  | { status: EStatus.SUCCESS; data: Sale[] };

type SummaryState =
  | { status: EStatus.LOADING }
  | { status: EStatus.ERROR }
  | { status: EStatus.SUCCESS; data: DailySummary };

export type {
  Sale,
  Product,
  DailySummary,
  CartItem,
  ActiveFilter,
  NewSaleFormValues,
  SalesState,
  SummaryState,
};
