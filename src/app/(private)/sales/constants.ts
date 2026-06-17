const PAYMENT_LABELS: Record<string, string> = {
  pix: "Pix",
  cash: "Dinheiro",
  debit_card: "Débito",
  credit_card_cash: "Crédito à vista",
  credit_card_installment: "Crédito parcelado",
};

const PAYMENT_BADGE_CLASS: Record<string, string> = {
  pix: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  cash: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  debit_card:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  credit_card_cash:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  credit_card_installment:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
};

export { PAYMENT_LABELS, PAYMENT_BADGE_CLASS };
