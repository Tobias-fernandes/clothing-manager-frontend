enum EPayments {
  PIX = "pix",
  DEBIT_CARD = "debit_card",
  CREDIT_CARD_CASH = "credit_card_cash",
  CREDIT_CARD_INSTALLMENT = "credit_card_installment",
  CASH = "cash",
}

enum EStatus {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

export { EPayments, EStatus };
