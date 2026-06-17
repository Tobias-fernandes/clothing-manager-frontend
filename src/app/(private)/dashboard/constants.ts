import { ColorVariant } from "./types";

const PAYMENT_LABELS: Record<string, string> = {
  pix: "Pix",
  cash: "Dinheiro",
  debit_card: "Débito",
  credit_card_cash: "Crédito à vista",
  credit_card_installment: "Crédito parcelado",
};

const COLOR_MAP: Record<ColorVariant, { icon: string; value: string }> = {
  green: {
    icon: "text-green-500",
    value: "text-green-600 dark:text-green-400",
  },
  purple: {
    icon: "text-purple-500",
    value: "text-purple-600 dark:text-purple-400",
  },
  blue: { icon: "text-blue-500", value: "text-blue-600 dark:text-blue-400" },
  amber: {
    icon: "text-amber-500",
    value: "text-amber-600 dark:text-amber-400",
  },
  red: { icon: "text-red-500", value: "text-red-600 dark:text-red-400" },
};

export { PAYMENT_LABELS, COLOR_MAP };
