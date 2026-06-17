import z from "zod";

const newSaleSchema = z
  .object({
    paymentMethod: z.enum([
      "pix",
      "debit_card",
      "credit_card_cash",
      "credit_card_installment",
      "cash",
    ]),
    installments: z.number().min(2).nullable(),
  })
  .refine(
    (data) =>
      data.paymentMethod !== "credit_card_installment" ||
      (data.installments !== null && data.installments >= 2),
    {
      message: "Informe o número de parcelas (mínimo 2)",
      path: ["installments"],
    },
  );

export { newSaleSchema };
